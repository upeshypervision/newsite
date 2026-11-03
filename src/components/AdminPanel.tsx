import React, { useState } from 'react';
import { EventItem } from '../data/hypervisionData';
import {
  getManagedEvents,
  getManagedFamily,
  hydrateManagedContent,
  ManagedEvent,
  ManagedFamilyMember,
  resetManagedContent,
  saveManagedEvents,
  saveManagedFamily,
} from '../data/contentStore';

const emptyEvent = (): ManagedEvent => ({
  id: `event-${Date.now()}`,
  title: '',
  subtitle: '',
  category: 'hackathon',
  date: 'November 2026',
  month: 'NOV',
  day: '15',
  year: '2026',
  location: 'MAC Auditorium, UPES Bidholi',
  teamsOrAttendees: '60+ Teams',
  description: '',
  image: '/events/code_hustle.webp',
  link: '',
  isUpcoming: true,
  highlights: ['24-Hour Sprint', 'Live Arbiters', 'Hardware Testbed'],
});

const emptyMember = (): ManagedFamilyMember => ({
  name: '',
  role: 'Technical Head',
  category: 'technical',
  department: 'Software & Systems Architecture',
  image: '',
  initials: '',
  quote: 'Ship the code that solves the hardest problem in the room.',
});

function Field({
  label,
  value,
  onChange,
  textarea = false,
  placeholder = '',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="admin-label">{label}</span>
      {textarea ? (
        <textarea
          rows={3}
          className="admin-input resize-y"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="admin-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

const eventToForm = (event: ManagedEvent) => ({
  ...event,
  highlightsText: (event.highlights || []).join('\n'),
});

const PRESET_ROLES = [
  'Faculty Advisor',
  'Faculty Coordinator',
  'President',
  'Vice-President',
  'General Secretary',
  'Treasurer',
  'Workflow Supervisor',
  'Strategic Branding Head',
  'Tech Visionary',
  'Technical Head',
  'Associate Technical Head',
  'Design Head',
  'Associate Design Head',
  'Editorial Head',
  'Associate Editorial Head',
  'Social Media Manager',
  'Events Head',
  'Associate Events Head',
  'Operations Head',
  'Associate Operations Head',
  'PR Head',
  'Associate PR Head',
];

export const AdminPanel: React.FC = () => {
  const [tab, setTab] = useState<'events' | 'family'>('events');
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  const [family, setFamily] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [editingEvent, setEditingEvent] = useState<ReturnType<typeof eventToForm> | null>(null);
  const [editingMember, setEditingMember] = useState<ManagedFamilyMember | null>(null);

  React.useEffect(() => {
    void hydrateManagedContent().then(() => {
      setEvents(getManagedEvents());
      setFamily(getManagedFamily());
    });
  }, []);

  const saveEvent = () => {
    if (!editingEvent?.title.trim()) return;
    const { highlightsText, ...event } = editingEvent;
    const next = {
      ...event,
      highlights: highlightsText
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    } as ManagedEvent;

    const updated = events.some((item) => item.id === next.id)
      ? events.map((item) => (item.id === next.id ? next : item))
      : [next, ...events];

    setEvents(updated);
    saveManagedEvents(updated);
    setEditingEvent(null);
  };

  const saveMember = () => {
    if (!editingMember?.name.trim()) return;
    const next = editingMember.initials
      ? editingMember
      : {
          ...editingMember,
          initials: editingMember.name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
        };

    const updated = family.some((item) => item.name === next.name)
      ? family.map((item) => (item.name === next.name ? next : item))
      : [next, ...family];

    setFamily(updated);
    saveManagedFamily(updated);
    setEditingMember(null);
  };

  return (
    <main className="admin-shell min-h-screen bg-[#040810] text-[#f8fafc]">
      <header className="border-b border-white/10 bg-[#060e18]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2]">
              UPES Hypervision &bull; CMS Studio
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Content &amp; Event Management Desk
            </h1>
          </div>
          <a href="/" className="editorial-button primary !min-h-[40px] text-xs">
            &larr; View Live Site
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
          <button
            className={`admin-button ${tab === 'events' ? 'active' : ''}`}
            onClick={() => setTab('events')}
          >
            Events &amp; Hackathons ({events.length})
          </button>
          <button
            className={`admin-button ${tab === 'family' ? 'active' : ''}`}
            onClick={() => setTab('family')}
          >
            Hypervision Family ({family.length})
          </button>
          <button
            className="admin-button ml-auto border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white"
            onClick={() => {
              if (window.confirm('Reset all content back to factory demo state?')) {
                resetManagedContent();
                setEvents(getManagedEvents());
                setFamily(getManagedFamily());
              }
            }}
          >
            Reset to Defaults
          </button>
        </div>

        {/* Tab 1: EVENTS */}
        {tab === 'events' ? (
          <section className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[.15em] text-[#1ab7f2]">
                  Calendar Management
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Current &amp; Past Events
                </h2>
              </div>
              <button
                className="editorial-button primary"
                onClick={() => setEditingEvent(eventToForm(emptyEvent()))}
              >
                + Add New Event
              </button>
            </div>

            <div className="grid gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#081322] border border-white/10 p-5 flex flex-col sm:flex-row sm:items-center gap-5 justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={event.image}
                      alt=""
                      className="w-24 h-16 object-cover bg-black border border-white/10 photo-mono"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 border ${
                            event.isUpcoming
                              ? 'border-[#1ab7f2] text-[#1ab7f2] bg-[#1ab7f2]/10'
                              : 'border-white/10 text-[#788e9f]'
                          }`}
                        >
                          {event.isUpcoming ? 'Live / Current' : 'Concluded'}
                        </span>
                        <span className="text-xs font-mono text-[#597187]">
                          {event.date}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white mt-1">
                        {event.title}
                      </h3>
                      <p className="text-xs text-[#8fa2b6] line-clamp-1">
                        {event.subtitle || event.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="admin-button"
                      onClick={() => setEditingEvent(eventToForm(event))}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-button border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        const updated = events.filter((item) => item.id !== event.id);
                        setEvents(updated);
                        saveManagedEvents(updated);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Tab 2: FAMILY */
          <section className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[.15em] text-[#1ab7f2]">
                  Roster Management
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Hypervision Society Family
                </h2>
              </div>
              <button
                className="editorial-button primary"
                onClick={() => setEditingMember(emptyMember())}
              >
                + Add Member Profile
              </button>
            </div>

            <div className="grid gap-3">
              {family.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#081322] border border-white/10 p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt=""
                        className="w-12 h-12 object-cover bg-black border border-white/10 photo-mono"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#050c16] border border-white/10 text-[#1ab7f2] flex items-center justify-center font-display text-lg font-bold">
                        {member.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#1ab7f2]">
                        {member.role} &bull; {member.department || member.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="admin-button"
                      onClick={() => setEditingMember(member)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-button border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white"
                      onClick={() => {
                        const updated = family.filter((item) => item.name !== member.name);
                        setFamily(updated);
                        saveManagedFamily(updated);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-[#02060c]/90 backdrop-blur-md p-4 overflow-y-auto flex items-center justify-center">
          <div className="max-w-3xl w-full my-8 bg-[#081322] border border-[#1ab7f2]/40 p-6 sm:p-10 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/10">
              <h2 className="font-display text-3xl font-bold text-white">
                {editingEvent.title ? 'Edit Event Record' : 'Create New Event'}
              </h2>
              <button
                className="admin-button"
                onClick={() => setEditingEvent(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Event Name"
                value={editingEvent.title}
                onChange={(title) => setEditingEvent({ ...editingEvent, title })}
                placeholder="Code Hustle 24-Hour Hackathon"
              />
              <Field
                label="Subtitle / Tagline"
                value={editingEvent.subtitle}
                onChange={(subtitle) => setEditingEvent({ ...editingEvent, subtitle })}
                placeholder="Annual Flagship Software Marathon"
              />
              <Field
                label="Date (Formatted)"
                value={editingEvent.date}
                onChange={(date) => setEditingEvent({ ...editingEvent, date })}
                placeholder="November 14, 2026"
              />
              <div className="grid grid-cols-3 gap-2">
                <Field
                  label="Month"
                  value={editingEvent.month}
                  onChange={(month) => setEditingEvent({ ...editingEvent, month })}
                  placeholder="NOV"
                />
                <Field
                  label="Day"
                  value={editingEvent.day}
                  onChange={(day) => setEditingEvent({ ...editingEvent, day })}
                  placeholder="14"
                />
                <Field
                  label="Year"
                  value={editingEvent.year}
                  onChange={(year) => setEditingEvent({ ...editingEvent, year })}
                  placeholder="2026"
                />
              </div>
              <Field
                label="Banner Image URL"
                value={editingEvent.image}
                onChange={(image) => setEditingEvent({ ...editingEvent, image })}
                placeholder="/events/code_hustle.webp"
              />
              <Field
                label="Registration / Platform Apply Link"
                value={editingEvent.link ?? ''}
                onChange={(link) => setEditingEvent({ ...editingEvent, link })}
                placeholder="https://..."
              />
              <Field
                label="Location"
                value={editingEvent.location}
                onChange={(location) => setEditingEvent({ ...editingEvent, location })}
                placeholder="MAC Auditorium, UPES Bidholi"
              />
              <Field
                label="Turnout / Key Stat"
                value={editingEvent.teamsOrAttendees}
                onChange={(teamsOrAttendees) =>
                  setEditingEvent({ ...editingEvent, teamsOrAttendees })
                }
                placeholder="60+ Finalist Teams"
              />

              <label className="block">
                <span className="admin-label">Category Track</span>
                <select
                  value={editingEvent.category}
                  onChange={(e) =>
                    setEditingEvent({
                      ...editingEvent,
                      category: e.target.value as EventItem['category'],
                    })
                  }
                  className="admin-input"
                >
                  <option value="hackathon">Hackathon</option>
                  <option value="bootcamp">Bootcamp</option>
                  <option value="symposium">Symposium / Fest</option>
                  <option value="workshop">Workshop</option>
                  <option value="outreach">Outreach</option>
                </select>
              </label>

              <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-white pt-6">
                <input
                  type="checkbox"
                  checked={Boolean(editingEvent.isUpcoming)}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, isUpcoming: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#1ab7f2]"
                />
                Live / Current Event (Upcoming Track)
              </label>
            </div>

            <div className="mt-5 space-y-4">
              <Field
                label="Description"
                value={editingEvent.description}
                onChange={(description) => setEditingEvent({ ...editingEvent, description })}
                textarea
                placeholder="Full event synopsis and overview..."
              />
              <Field
                label="Key Highlights (One per line)"
                value={editingEvent.highlightsText}
                onChange={(highlightsText) =>
                  setEditingEvent({ ...editingEvent, highlightsText })
                }
                textarea
                placeholder="60+ Teams\nLive Arbiters\n24-Hour Nonstop"
              />
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                className="admin-button"
                onClick={() => setEditingEvent(null)}
              >
                Cancel
              </button>
              <button
                className="editorial-button primary"
                onClick={saveEvent}
              >
                Save Event to CMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-[#02060c]/90 backdrop-blur-md p-4 overflow-y-auto flex items-center justify-center">
          <div className="max-w-2xl w-full my-8 bg-[#081322] border border-[#1ab7f2]/40 p-6 sm:p-10 relative">
            <div className="flex justify-between items-start pb-4 border-b border-white/10">
              <h2 className="font-display text-3xl font-bold text-white">
                {editingMember.name ? 'Edit Family Profile' : 'Add Family Member'}
              </h2>
              <button
                className="admin-button"
                onClick={() => setEditingMember(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Full Name"
                value={editingMember.name}
                onChange={(name) => setEditingMember({ ...editingMember, name })}
                placeholder="Purva"
              />

              <label className="block">
                <span className="admin-label">Position / Role</span>
                <input
                  list="roles-list"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="admin-input"
                  placeholder="Select or type role..."
                />
                <datalist id="roles-list">
                  {PRESET_ROLES.map((role) => (
                    <option key={role} value={role} />
                  ))}
                </datalist>
              </label>

              <label className="block">
                <span className="admin-label">Category Group</span>
                <select
                  value={editingMember.category}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      category: e.target.value as ManagedFamilyMember['category'],
                    })
                  }
                  className="admin-input"
                >
                  <option value="faculty">Faculty In-charge</option>
                  <option value="executive">Executive Board</option>
                  <option value="technical">Technical Directorate</option>
                  <option value="design">Design & Visual Systems</option>
                  <option value="operations">Operations & Hackathons</option>
                  <option value="outreach">PR & Institutional Outreach</option>
                </select>
              </label>

              <Field
                label="Department / Focus Area"
                value={editingMember.department ?? ''}
                onChange={(department) => setEditingMember({ ...editingMember, department })}
                placeholder="Visual Systems & UI/UX"
              />

              <Field
                label="Portrait Image URL"
                value={editingMember.image ?? ''}
                onChange={(image) => setEditingMember({ ...editingMember, image })}
                placeholder="/team/purva.webp"
              />

              <Field
                label="Initials (optional)"
                value={editingMember.initials ?? ''}
                onChange={(initials) => setEditingMember({ ...editingMember, initials })}
                placeholder="PU"
              />

              <Field
                label="LinkedIn Profile URL"
                value={editingMember.linkedin ?? ''}
                onChange={(linkedin) => setEditingMember({ ...editingMember, linkedin })}
                placeholder="https://linkedin.com/in/..."
              />

              <Field
                label="GitHub Profile URL (optional)"
                value={editingMember.github ?? ''}
                onChange={(github) => setEditingMember({ ...editingMember, github })}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="mt-5">
              <Field
                label="Personal Quote / Technical Creed"
                value={editingMember.quote}
                onChange={(quote) => setEditingMember({ ...editingMember, quote })}
                textarea
                placeholder="Make the work impossible to ignore."
              />
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                className="admin-button"
                onClick={() => setEditingMember(null)}
              >
                Cancel
              </button>
              <button
                className="editorial-button primary"
                onClick={saveMember}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
