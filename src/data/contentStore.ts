import { EVENTS, TEAM_MEMBERS, EventItem, TeamMember } from './hypervisionData';

/**
 * Content is kept behind this small repository boundary so the public site can
 * switch to Supabase without changing any of the sections. The local adapter
 * makes the admin panel useful before project credentials are configured.
 */
const EVENTS_KEY = 'hypervision_admin_events';
const FAMILY_KEY = 'hypervision_admin_family';
const CONTENT_EVENT = 'hypervision:content-updated';

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

export function getManagedEvents(): ManagedEvent[] {
  return read<ManagedEvent[]>(EVENTS_KEY, seedEvents);
}

export function getManagedFamily(): ManagedFamilyMember[] {
  return read<ManagedFamilyMember[]>(FAMILY_KEY, seedFamily);
}

export function saveManagedEvents(events: ManagedEvent[]) {
  write(EVENTS_KEY, events);
}

export function saveManagedFamily(members: ManagedFamilyMember[]) {
  write(FAMILY_KEY, members);
}

export function resetManagedContent() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(EVENTS_KEY);
    window.localStorage.removeItem(FAMILY_KEY);
    window.dispatchEvent(new CustomEvent(CONTENT_EVENT));
  }
}

export { CONTENT_EVENT };
