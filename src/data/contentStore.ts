import { EVENTS, TEAM_MEMBERS, EventItem, TeamMember } from './hypervisionData';

/**
 * Content is kept behind this small repository boundary so the public site can
 * switch to Supabase without changing any of the sections. The local adapter
 * makes the admin panel useful before project credentials are configured.
 */
const EVENTS_KEY = 'hypervision_admin_events';
const FAMILY_KEY = 'hypervision_admin_family';
const CONTENT_EVENT = 'hypervision:content-updated';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export type ManagedEvent = EventItem & { highlights: string[] };
export type ManagedFamilyMember = TeamMember & { quote: string };

const seedEvents = EVENTS.map((event) => ({
  ...event,
  highlights: event.highlights ?? [event.subtitle, event.teamsOrAttendees, event.location],
}));

const seedFamily = TEAM_MEMBERS.map((member, index) => ({
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
    return stored ? JSON.parse(stored) as T : fallback;
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

const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function eventRow(event: ManagedEvent) {
  return {
    id: event.id,
    title: event.title,
    subtitle: event.subtitle,
    category: event.category,
    date: event.date,
    month: event.month,
    day: event.day,
    year: event.year,
    location: event.location,
    teams_or_attendees: event.teamsOrAttendees,
    description: event.description,
    is_upcoming: Boolean(event.isUpcoming),
    link: event.link ?? '',
    image: event.image,
    gallery_images: event.galleryImages ?? [],
    highlights: event.highlights,
  };
}

function familyRow(member: ManagedFamilyMember) {
  return {
    id: member.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    ...member,
    linkedin: member.linkedin ?? null,
    github: member.github ?? null,
  };
}

async function upsert(table: string, rows: unknown[]) {
  if (!supabaseReady) return;
  await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=id`, {
    method: 'POST',
    headers: supabaseHeaders(),
    body: JSON.stringify(rows),
  });
}

export async function hydrateManagedContent() {
  if (!supabaseReady) return;
  try {
    const headers = supabaseHeaders();
    const [eventsResponse, familyResponse] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/events?select=*`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/family_members?select=*`, { headers }),
    ]);
    if (eventsResponse.ok) {
      const rows = await eventsResponse.json();
      if (rows.length) write(EVENTS_KEY, rows.map((row: Record<string, unknown>) => ({
        ...row,
        teamsOrAttendees: row.teams_or_attendees,
        isUpcoming: row.is_upcoming,
        galleryImages: row.gallery_images,
      })));
    }
    if (familyResponse.ok) {
      const rows = await familyResponse.json();
      if (rows.length) write(FAMILY_KEY, rows);
    }
  } catch {
    // Local content remains available when Supabase is not configured or offline.
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
  void upsert('events', events.map(eventRow));
}

export function saveManagedFamily(members: ManagedFamilyMember[]) {
  write(FAMILY_KEY, members);
  void upsert('family_members', members.map(familyRow));
}

export function resetManagedContent() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(EVENTS_KEY);
    window.localStorage.removeItem(FAMILY_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
  }
}

export { CONTENT_EVENT };
