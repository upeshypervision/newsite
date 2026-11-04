import { EVENTS, TEAM_MEMBERS, EventItem, TeamMember } from './hypervisionData';

/**
 * Content store with transparent Supabase hydration and offline localStorage caching.
 * All public surfaces (Board, Family, Events, Archive) subscribe to CONTENT_EVENT.
 */
const EVENTS_KEY = 'hypervision_admin_events';
const FAMILY_KEY = 'hypervision_admin_family';
const CONTENT_EVENT = 'hypervision:content-updated';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export type ManagedEvent = EventItem & { highlights: string[] };
export type ManagedFamilyMember = TeamMember & { quote: string };

const seedEvents: ManagedEvent[] = EVENTS.map((event) => ({
  ...event,
  highlights: event.highlights ?? [event.subtitle, event.teamsOrAttendees, event.location],
}));

const seedFamily: ManagedFamilyMember[] = TEAM_MEMBERS.map((member, index) => ({
  ...member,
  quote: member.quote ?? [
    'Make the work impossible to ignore.',
    'The best ideas become real when people build together.',
    'Stay curious. Ship often. Keep the bar high.',
  ][index % 3],
}));

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
}

const supabaseHeaders = () => ({
  apikey: SUPABASE_ANON_KEY ?? '',
  Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ''}`,
  'Content-Type': 'application/json',
  Prefer: 'resolution=merge-duplicates',
});

export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function eventRow(event: ManagedEvent, index: number) {
  return {
    id: event.id,
    title: event.title,
    subtitle: event.subtitle || '',
    category: event.category,
    date: event.date,
    month: event.month,
    day: event.day || '',
    year: event.year,
    location: event.location || '',
    teams_or_attendees: event.teamsOrAttendees || '',
    description: event.description || '',
    is_upcoming: Boolean(event.isUpcoming),
    link: event.link || '',
    image: event.image,
    gallery_images: event.galleryImages || [],
    highlights: event.highlights || [],
    order_index: index,
  };
}

function familyRow(member: ManagedFamilyMember, index: number) {
  return {
    id: member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: member.name,
    role: member.role,
    category: member.category,
    department: member.department || '',
    image: member.image || '',
    initials: member.initials || member.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(),
    linkedin: member.linkedin || null,
    github: member.github || null,
    quote: member.quote || '',
    order_index: index,
  };
}

async function upsert(table: string, rows: unknown[]) {
  if (!supabaseReady) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=id`, {
      method: 'POST',
      headers: supabaseHeaders(),
      body: JSON.stringify(rows),
    });
  } catch (err) {
    console.warn(`Supabase upsert failed for ${table}:`, err);
  }
}

async function deleteFromSupabase(table: string, id: string) {
  if (!supabaseReady) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: supabaseHeaders(),
    });
  } catch (err) {
    console.warn(`Supabase delete failed for ${table}:`, err);
  }
}

export async function hydrateManagedContent() {
  if (!supabaseReady) return;
  try {
    const headers = supabaseHeaders();
    const [eventsResponse, familyResponse] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/events?select=*&order=order_index.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/family_members?select=*&order=order_index.asc`, { headers }),
    ]);

    if (eventsResponse.ok) {
      const rows = await eventsResponse.json();
      if (Array.isArray(rows) && rows.length > 0) {
        write(
          EVENTS_KEY,
          rows.map((row: Record<string, unknown>) => ({
            id: row.id as string,
            title: row.title as string,
            subtitle: (row.subtitle as string) || '',
            category: (row.category as 'hackathon' | 'bootcamp' | 'symposium' | 'workshop' | 'outreach') || 'hackathon',
            date: row.date as string,
            month: row.month as string,
            day: (row.day as string) || '',
            year: row.year as string,
            location: (row.location as string) || '',
            teamsOrAttendees: (row.teams_or_attendees as string) || '',
            description: (row.description as string) || '',
            isUpcoming: Boolean(row.is_upcoming),
            link: (row.link as string) || undefined,
            image: (row.image as string) || '/events/code_hustle.webp',
            galleryImages: (row.gallery_images as string[]) || [],
            highlights: (row.highlights as string[]) || [],
          }))
        );
      }
    }

    if (familyResponse.ok) {
      const rows = await familyResponse.json();
      if (Array.isArray(rows) && rows.length > 0) {
        write(
          FAMILY_KEY,
          rows.map((row: Record<string, unknown>) => ({
            name: row.name as string,
            role: row.role as string,
            category: (row.category as 'faculty' | 'executive' | 'technical' | 'design' | 'operations' | 'outreach') || 'technical',
            department: (row.department as string) || undefined,
            image: (row.image as string) || undefined,
            initials:
              (row.initials as string) ||
              (row.name as string)
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            linkedin: (row.linkedin as string) || undefined,
            github: (row.github as string) || undefined,
            quote: (row.quote as string) || 'Stay curious. Ship often.',
          }))
        );
      }
    }
  } catch (err) {
    console.warn('Supabase hydration skipped, using cached/seed content:', err);
  }
}

export function getManagedEvents(): ManagedEvent[] {
  return read<ManagedEvent[]>(EVENTS_KEY, seedEvents);
}

export function getManagedFamily(): ManagedFamilyMember[] {
  return read<ManagedFamilyMember[]>(FAMILY_KEY, seedFamily);
}

export function saveManagedEvents(events: ManagedEvent[]) {
  write(EVENTS_KEY, events);
  void upsert('events', events.map((e, idx) => eventRow(e, idx)));
}

export function deleteManagedEvent(id: string) {
  const current = getManagedEvents();
  const updated = current.filter((e) => e.id !== id);
  write(EVENTS_KEY, updated);
  void deleteFromSupabase('events', id);
}

export function saveManagedFamily(members: ManagedFamilyMember[]) {
  write(FAMILY_KEY, members);
  void upsert('family_members', members.map((m, idx) => familyRow(m, idx)));
}

export function deleteManagedFamilyMember(name: string) {
  const current = getManagedFamily();
  const updated = current.filter((m) => m.name !== name);
  write(FAMILY_KEY, updated);
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  void deleteFromSupabase('family_members', id);
}

export function resetManagedContent() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(EVENTS_KEY);
    window.localStorage.removeItem(FAMILY_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
  }
}

export { CONTENT_EVENT };
