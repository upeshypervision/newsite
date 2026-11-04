import { EVENTS, TEAM_MEMBERS, EventItem, TeamMember } from './hypervisionData';

/**
 * UPES Hypervision Content Store
 * Supabase-backed dynamic content repository with live REST API sync,
 * authenticated session management, and Supabase Storage bucket uploads.
 */
const EVENTS_KEY = 'hypervision_admin_events';
const FAMILY_KEY = 'hypervision_admin_family';
const SIGNUPS_KEY = 'hypervision_admin_signups';
const SESSION_KEY = 'hypervision_admin_session';
const CONTENT_EVENT = 'hypervision:content-updated';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const SUPABASE_SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY as string | undefined;

export type ManagedEvent = EventItem & { highlights: string[] };
export type ManagedFamilyMember = TeamMember & { quote: string };

export interface ManagedSignup {
  id: string;
  email: string;
  name?: string;
  track?: string;
  source: string;
  created_at: string;
}

export interface AdminSession {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
  };
  expiresAt: number;
}

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

const seedSignups: ManagedSignup[] = [
  {
    id: 'seed-signup-1',
    email: 'purva.sachan@stu.upes.ac.in',
    name: 'Purva Sachan',
    track: 'Engineering & Distributed Systems',
    source: 'cohort_application',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'seed-signup-2',
    email: 'atharv.avionics@stu.upes.ac.in',
    name: 'Atharv Pandey',
    track: 'Autonomous Drones & Embedded Firmware',
    source: 'footer_newsletter',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

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

export const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export function getAdminSession(): AdminSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (session.expiresAt && Date.now() > session.expiresAt) {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function loginWithSupabase(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { success: false, error: 'Supabase credentials not configured in environment.' };
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error_description || data.msg || data.message || 'Supabase authentication rejected this login.',
      };
    }

    const session: AdminSession = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      user: {
        id: data.user?.id || '',
        email: data.user?.email || email,
      },
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
    };

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
    }

    return { success: true, session };
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message || 'Network error reaching Supabase Auth service.',
    };
  }
}

export function logoutAdmin() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
  }
}

const supabaseHeaders = () => {
  const session = getAdminSession();
  const bearer = session?.accessToken || SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY || '';
  return {
    apikey: SUPABASE_ANON_KEY ?? '',
    Authorization: `Bearer ${bearer}`,
    'Content-Type': 'application/json',
    Prefer: 'resolution=merge-duplicates',
  };
};

export async function uploadToSupabaseStorage(
  bucket: 'events' | 'team',
  file: File
): Promise<{ url: string; error?: string }> {
  if (!SUPABASE_URL) {
    return { url: '', error: 'Supabase URL not configured' };
  }

  const session = getAdminSession();
  const ext = file.name.split('.').pop() || 'png';
  const cleanBase = file.name
    .replace(/\.[^/.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .slice(0, 30);
  const fileName = `${Date.now()}_${cleanBase}.${ext}`;

  // Try session token first, fallback to service key if configured
  const tokensToTry = [
    session?.accessToken,
    SUPABASE_SERVICE_KEY,
    SUPABASE_ANON_KEY,
  ].filter(Boolean) as string[];

  let lastError = '';
  for (const token of tokensToTry) {
    try {
      const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${fileName}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY || '',
          Authorization: `Bearer ${token}`,
          'Content-Type': file.type || 'image/jpeg',
          'x-upsert': 'true',
        },
        body: file,
      });

      if (response.ok) {
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${fileName}`;
        return { url: publicUrl };
      } else {
        const errJson = await response.json().catch(() => ({}));
        lastError = errJson.message || errJson.error || response.statusText;
      }
    } catch (err) {
      lastError = (err as Error).message || 'Network error during upload';
    }
  }

  return {
    url: '',
    error: `Supabase Storage error: ${lastError || 'Upload failed. Ensure bucket policies exist.'}`,
  };
}

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
    initials:
      member.initials ||
      member.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    linkedin: member.linkedin || null,
    github: member.github || null,
    quote: member.quote || '',
    order_index: index,
  };
}

async function upsert(table: string, rows: unknown[]) {
  if (!supabaseReady) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?on_conflict=id`, {
      method: 'POST',
      headers: supabaseHeaders(),
      body: JSON.stringify(rows),
    });
    if (!res.ok) {
      const err = await res.text();
      console.warn(`Supabase upsert failed for ${table}:`, err);
    }
  } catch (err) {
    console.warn(`Supabase upsert failed for ${table}:`, err);
  }
}

async function deleteFromSupabase(table: string, id: string) {
  if (!supabaseReady) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: supabaseHeaders(),
    });
    if (!res.ok) {
      const err = await res.text();
      console.warn(`Supabase delete failed for ${table}:`, err);
    }
  } catch (err) {
    console.warn(`Supabase delete failed for ${table}:`, err);
  }
}

export async function hydrateManagedContent() {
  if (!supabaseReady) return;
  try {
    const headers = supabaseHeaders();
    const [eventsResponse, familyResponse, signupsResponse] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/events?select=*&order=order_index.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/family_members?select=*&order=order_index.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/signups?select=*&order=created_at.desc`, { headers }).catch(() => null),
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

    if (signupsResponse && signupsResponse.ok) {
      const rows = await signupsResponse.json();
      if (Array.isArray(rows) && rows.length > 0) {
        write(SIGNUPS_KEY, rows);
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

// -----------------------------------------------------------------------------
// SIGNUPS & COMMUNITY REGISTRATIONS MANAGEMENT
// -----------------------------------------------------------------------------
export function getManagedSignups(): ManagedSignup[] {
  return read<ManagedSignup[]>(SIGNUPS_KEY, seedSignups);
}

export async function saveSignup(signup: {
  email: string;
  name?: string;
  track?: string;
  source?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!signup.email || !signup.email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  const cleanEmail = signup.email.trim().toLowerCase();
  const newEntry: ManagedSignup = {
    id: `signup-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email: cleanEmail,
    name: signup.name?.trim() || '',
    track: signup.track?.trim() || '',
    source: signup.source || 'footer_newsletter',
    created_at: new Date().toISOString(),
  };

  const current = getManagedSignups();
  const updated = [newEntry, ...current.filter((s) => s.email !== cleanEmail)];
  write(SIGNUPS_KEY, updated);

  if (supabaseReady) {
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/signups`, {
        method: 'POST',
        headers: supabaseHeaders(),
        body: JSON.stringify([newEntry]),
      });
    } catch (err) {
      console.warn('Supabase signups sync failed, saved in local cache:', err);
    }
  }

  return { success: true };
}

export function deleteManagedSignup(id: string) {
  const current = getManagedSignups();
  const updated = current.filter((s) => s.id !== id);
  write(SIGNUPS_KEY, updated);
  void deleteFromSupabase('signups', id);
}

export function exportSignupsToCSV() {
  const signups = getManagedSignups();
  if (signups.length === 0) {
    alert('No signups recorded to export.');
    return;
  }

  const headers = ['ID', 'Email', 'Full Name', 'Technical Track', 'Source', 'Date Submitted'];
  const rows = signups.map((s) => [
    `"${s.id}"`,
    `"${s.email.replace(/"/g, '""')}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.track || '').replace(/"/g, '""')}"`,
    `"${(s.source || '').replace(/"/g, '""')}"`,
    `"${new Date(s.created_at).toLocaleString()}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `hypervision_signups_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function resetManagedContent() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(EVENTS_KEY);
    window.localStorage.removeItem(FAMILY_KEY);
    window.localStorage.removeItem(SIGNUPS_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
  }
}

export { CONTENT_EVENT };
