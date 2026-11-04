import React, { useState, useEffect, useRef } from 'react';
import { EventItem } from '../data/hypervisionData';
import {
  deleteManagedEvent,
  deleteManagedFamilyMember,
  getAdminSession,
  getManagedEvents,
  getManagedFamily,
  hydrateManagedContent,
  loginWithSupabase,
  logoutAdmin,
  ManagedEvent,
  ManagedFamilyMember,
  resetManagedContent,
  saveManagedEvents,
  saveManagedFamily,
  uploadToSupabaseStorage,
  AdminSession,
} from '../data/contentStore';

const emptyEvent = (): ManagedEvent => ({
  id: `event-${Date.now()}`,
  title: '',
  subtitle: '',
  category: 'hackathon',
  date: 'November 14, 2026',
  month: 'NOV',
  day: '14',
  year: '2026',
  location: 'MAC Auditorium, UPES Bidholi',
  teamsOrAttendees: '60+ Finalist Teams',
  description: '',
  image: '/events/code_hustle.webp',
  link: '',
  isUpcoming: true,
  highlights: ['24-Hour Nonstop Coding', 'Hardware & Software Tracks', 'Cash Prizes & Mentorship'],
});

const emptyMember = (): ManagedFamilyMember => ({
  name: '',
  role: 'Technical Head',
  category: 'technical',
  department: 'Software & Distributed Systems',
  image: '',
  initials: '',
  quote: 'Zero slide decks. If you can’t demo it live, it doesn’t exist.',
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
  'Associate Social Media Manager',
  'Events Head',
  'Associate Events Head',
  'Operations Head',
  'Associate Operations Head',
  'PR Head',
  'Associate PR Head',
];

export const AdminPanel: React.FC = () => {
  // Auth state
  const [session, setSession] = useState<AdminSession | null>(getAdminSession);
  const [authEmail, setAuthEmail] = useState('jagrit@zuup.dev');
  const [authPassword, setAuthPassword] = useState('110034@jag');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Content state
  const [tab, setTab] = useState<'events' | 'family'>('events');
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  const [family, setFamily] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [editingEvent, setEditingEvent] = useState<ReturnType<typeof eventToForm> | null>(null);
  const [editingMember, setEditingMember] = useState<ManagedFamilyMember | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const memberFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void hydrateManagedContent().then(() => {
      setEvents(getManagedEvents());
      setFamily(getManagedFamily());
    });
  }, []);

  // Supabase Auth Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    const result = await loginWithSupabase(authEmail, authPassword);
    setAuthLoading(false);

    if (result.success && result.session) {
      setSession(result.session);
      // Re-hydrate content directly from Supabase
      void hydrateManagedContent().then(() => {
        setEvents(getManagedEvents());
        setFamily(getManagedFamily());
      });
    } else {
      setAuthError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setSession(null);
  };

  // Upload event banner
  const handleEventBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingEvent) return;

    setIsUploading(true);
    setUploadStatus('Uploading banner to Supabase Storage...');

    const res = await uploadToSupabaseStorage('events', file);
    setIsUploading(false);

    if (res.url) {
      setEditingEvent({ ...editingEvent, image: res.url });
      setUploadStatus('Banner uploaded successfully!');
      setTimeout(() => setUploadStatus(null), 3500);
    } else {
      setUploadStatus(res.error || 'Upload failed');
    }
  };

  // Upload member photo
  const handleMemberPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingMember) return;

    setIsUploading(true);
    setUploadStatus('Uploading portrait to Supabase Storage...');

    const res = await uploadToSupabaseStorage('team', file);
    setIsUploading(false);

    if (res.url) {
      setEditingMember({ ...editingMember, image: res.url });
      setUploadStatus('Portrait uploaded successfully!');
      setTimeout(() => setUploadStatus(null), 3500);
    } else {
      setUploadStatus(res.error || 'Upload failed');
    }
  };

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
    setUploadStatus(null);
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
    setUploadStatus(null);
  };

  // 1. SUPABASE AUTH GATE SCREEN (When user is not logged in)
  if (!session) {
    return (
      <main className="min-h-screen bg-[#02050c] text-[#f8fafc] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background tech grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1ab7f208_1px,transparent_1px),linear-gradient(to_bottom,#1ab7f208_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-md w-full bg-[#071322] border-2 border-white/10 hover:border-[#1ab7f2]/50 rounded-3xl p-7 sm:p-10 shadow-2xl relative z-10 transition-colors">
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <span className="w-3 h-3 bg-[#1ab7f2] rounded-full animate-pulse shadow-[0_0_12px_#1ab7f2]" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] font-bold">
                UPES Hypervision &bull; Access Gate
              </p>
              <h1 className="font-display text-2xl font-bold text-white mt-0.5">
                Supabase CMS Studio
              </h1>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-[#040812] border border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-[#8fa2b6]">Database Backend</span>
            <span className="text-[#10b981] flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
              Connected (Live)
            </span>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#9ab0c4] mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@hypervision.in"
                className="admin-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#9ab0c4] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••••••"
                className="admin-input"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-xs text-red-200 font-mono leading-relaxed">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full mt-2 py-3 px-4 bg-[#1ab7f2] hover:bg-[#38c4f7] text-[#02050c] font-display font-bold text-sm tracking-wide rounded-full transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(26,183,242,0.4)]"
            >
              {authLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#02050c] border-t-transparent rounded-full animate-spin" />
                  Verifying Supabase Credentials...
                </>
              ) : (
                'Sign In to Admin Studio →'
              )}
            </button>

            {/* Quick-fill helper */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#597187]">
              <span>Authorized Admin: Jagrit</span>
              <button
                type="button"
                onClick={() => {
                  setAuthEmail('jagrit@zuup.dev');
                  setAuthPassword('110034@jag');
                }}
                className="text-[#1ab7f2] hover:underline"
              >
                Auto-fill credentials
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-xs font-mono text-[#8fa2b6] hover:text-white transition-colors"
            >
              &larr; Back to Public Website
            </a>
          </div>
        </div>
      </main>
    );
  }

  // 2. AUTHENTICATED ADMIN DASHBOARD
  return (
    <main className="admin-shell min-h-screen bg-[#040810] text-[#f8fafc]">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#060e18] sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="w-3 h-3 bg-[#10b981] rounded-full shadow-[0_0_10px_#10b981]" />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2]">
                UPES Hypervision &bull; Live CMS Studio
              </p>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
                Event &amp; Roster Management Engine
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[11px] font-mono text-[#8fa2b6]">Authenticated Admin</span>
              <span className="text-xs font-mono text-[#1ab7f2] font-bold">{session.user.email}</span>
            </div>

            <button
              onClick={handleLogout}
              className="admin-button border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs !py-1.5"
            >
              Sign Out
            </button>

            <a
              href="/"
              className="editorial-button primary !min-h-[38px] text-xs shrink-0"
            >
              &larr; View Live Site
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
          <button
            className={`admin-button text-sm !px-5 ${tab === 'events' ? 'active' : ''}`}
            onClick={() => setTab('events')}
          >
            Events &amp; Hackathons ({events.length})
          </button>
          <button
            className={`admin-button text-sm !px-5 ${tab === 'family' ? 'active' : ''}`}
            onClick={() => setTab('family')}
          >
            Hypervision Family &amp; Board ({family.length})
          </button>

          <button
            className="admin-button ml-auto border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white text-xs"
            onClick={() => {
              if (window.confirm('Reset local cache to factory defaults? Database rows will be preserved.')) {
                resetManagedContent();
                setEvents(getManagedEvents());
                setFamily(getManagedFamily());
              }
            }}
          >
            Reset Local Cache
          </button>
        </div>

        {/* TAB 1: EVENTS MANAGEMENT */}
        {tab === 'events' ? (
          <section className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[.15em] text-[#1ab7f2]">
                  01 // Dynamic Event Database
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Events, Hackathons &amp; Bootcamps
                </h2>
                <p className="text-xs text-[#8fa2b6] mt-1 font-mono">
                  Changes save directly to Supabase table <code className="text-[#1ab7f2]">public.events</code> with instant public sync.
                </p>
              </div>
              <button
                className="editorial-button primary shrink-0"
                onClick={() => {
                  setEditingEvent(eventToForm(emptyEvent()));
                  setUploadStatus(null);
                }}
              >
                + Add New Event
              </button>
            </div>

            <div className="grid gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#081322] border border-white/10 hover:border-[#1ab7f2]/40 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-5 justify-between transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-black border border-white/10 relative">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono px-1.5 py-0.5 rounded text-white uppercase">
                        {event.month} {event.year}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                            event.isUpcoming
                              ? 'border-[#1ab7f2] text-[#1ab7f2] bg-[#1ab7f2]/10 font-bold'
                              : 'border-white/10 text-[#788e9f]'
                          }`}
                        >
                          {event.isUpcoming ? '● Live / Flagship' : 'Concluded'}
                        </span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border border-white/10 text-[#9ab0c4] bg-[#040812]">
                          {event.category}
                        </span>
                        <span className="text-xs font-mono text-[#597187]">
                          {event.date}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-white mt-1.5">
                        {event.title}
                      </h3>

                      <p className="text-xs text-[#8fa2b6] line-clamp-1 max-w-xl mt-0.5">
                        {event.subtitle || event.description}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#597187] mt-1.5">
                        <span>Loc: {event.location || 'UPES Bidholi'}</span>
                        <span>&bull;</span>
                        <span>Stats: {event.teamsOrAttendees || 'Open'}</span>
                        {event.link && (
                          <>
                            <span>&bull;</span>
                            <span className="text-[#1ab7f2] truncate max-w-[200px]">
                              Apply Link Active
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      className="admin-button !py-2 !px-4 text-xs"
                      onClick={() => {
                        setEditingEvent(eventToForm(event));
                        setUploadStatus(null);
                      }}
                    >
                      Edit Event
                    </button>
                    <button
                      className="admin-button border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white !py-2 !px-4 text-xs"
                      onClick={() => {
                        if (window.confirm(`Delete "${event.title}" from Supabase database?`)) {
                          const updated = events.filter((item) => item.id !== event.id);
                          setEvents(updated);
                          deleteManagedEvent(event.id);
                        }
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
          /* TAB 2: FAMILY / BOARD MANAGEMENT */
          <section className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[.15em] text-[#1ab7f2]">
                  02 // Dynamic Roster Database
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Society Hierarchy &amp; Family
                </h2>
                <p className="text-xs text-[#8fa2b6] mt-1 font-mono">
                  Changes save directly to Supabase table <code className="text-[#1ab7f2]">public.family_members</code>.
                </p>
              </div>
              <button
                className="editorial-button primary shrink-0"
                onClick={() => {
                  setEditingMember(emptyMember());
                  setUploadStatus(null);
                }}
              >
                + Add Member Profile
              </button>
            </div>

            <div className="grid gap-3">
              {family.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#081322] border border-white/10 hover:border-[#1ab7f2]/40 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt=""
                        className="w-14 h-14 rounded-full object-cover bg-black border border-white/10"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-[#050c16] border border-white/10 text-[#1ab7f2] flex items-center justify-center font-display text-lg font-bold">
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
                      {member.quote && (
                        <p className="text-xs text-[#788e9f] italic line-clamp-1 mt-0.5">
                          &ldquo;{member.quote}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      className="admin-button !py-1.5 !px-3 text-xs"
                      onClick={() => {
                        setEditingMember(member);
                        setUploadStatus(null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-button border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white !py-1.5 !px-3 text-xs"
                      onClick={() => {
                        if (window.confirm(`Delete "${member.name}" from Supabase database?`)) {
                          const updated = family.filter((item) => item.name !== member.name);
                          setFamily(updated);
                          deleteManagedFamilyMember(member.name);
                        }
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

      {/* ========================================================================= */}
      {/* 3. EDIT / CREATE EVENT MODAL WITH STORAGE BANNER UPLOAD */}
      {/* ========================================================================= */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-[#02060c]/90 backdrop-blur-md p-4 overflow-y-auto flex items-center justify-center">
          <div className="max-w-4xl w-full my-8 bg-[#081322] border-2 border-[#1ab7f2]/50 rounded-3xl p-6 sm:p-10 relative shadow-2xl">
            <div className="flex justify-between items-start pb-5 border-b border-white/10">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2]">
                  Supabase Live Editor
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {editingEvent.title ? `Edit Event: ${editingEvent.title}` : 'Create New Event'}
                </h2>
              </div>
              <button
                className="admin-button"
                onClick={() => setEditingEvent(null)}
              >
                Close &times;
              </button>
            </div>

            {/* BANNER UPLOAD & PREVIEW SECTION */}
            <div className="mt-6 p-5 bg-[#040812] border border-white/10 rounded-2xl">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#1ab7f2] font-bold mb-3">
                Event Banner &amp; Poster (Supabase Storage: &apos;events&apos; bucket)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Banner Thumbnail */}
                <div className="w-full sm:w-64 h-36 rounded-xl overflow-hidden bg-black border border-white/20 shrink-0 relative group">
                  <img
                    src={editingEvent.image || '/events/code_hustle.webp'}
                    alt="Event Banner Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-mono text-white transition-opacity">
                    Current Banner
                  </div>
                </div>

                {/* Upload Controls */}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleEventBannerUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="editorial-button primary !min-h-[40px] text-xs !px-5 cursor-pointer disabled:opacity-50"
                    >
                      {isUploading ? 'Uploading to Supabase...' : '📁 Upload New Banner Image'}
                    </button>
                    <span className="text-[11px] font-mono text-[#597187]">
                      PNG, JPG, WEBP &bull; Max 10MB
                    </span>
                  </div>

                  {uploadStatus && (
                    <div className="text-xs font-mono text-[#1ab7f2] bg-[#1ab7f2]/10 border border-[#1ab7f2]/30 p-2.5 rounded-lg flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#1ab7f2] animate-ping" />
                      {uploadStatus}
                    </div>
                  )}

                  <div>
                    <label className="text-[11px] font-mono text-[#8fa2b6] block mb-1">
                      Direct Banner URL (or paste external image link):
                    </label>
                    <input
                      type="text"
                      className="admin-input !py-2 text-xs"
                      value={editingEvent.image}
                      onChange={(e) => setEditingEvent({ ...editingEvent, image: e.target.value })}
                      placeholder="https://... or /events/my-banner.webp"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* EVENT DETAILS GRID */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Event Name / Title *"
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

              <Field
                label="Display Date (Formatted)"
                value={editingEvent.date}
                onChange={(date) => setEditingEvent({ ...editingEvent, date })}
                placeholder="November 14, 2026"
              />

              {/* Date Components */}
              <div className="grid grid-cols-3 gap-2">
                <Field
                  label="Month (e.g. NOV)"
                  value={editingEvent.month}
                  onChange={(month) => setEditingEvent({ ...editingEvent, month })}
                  placeholder="NOV"
                />
                <Field
                  label="Day (e.g. 14)"
                  value={editingEvent.day}
                  onChange={(day) => setEditingEvent({ ...editingEvent, day })}
                  placeholder="14"
                />
                <Field
                  label="Year (e.g. 2026)"
                  value={editingEvent.year}
                  onChange={(year) => setEditingEvent({ ...editingEvent, year })}
                  placeholder="2026"
                />
              </div>

              <Field
                label="Location / Venue"
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

              <Field
                label="Registration / Platform Apply Link"
                value={editingEvent.link ?? ''}
                onChange={(link) => setEditingEvent({ ...editingEvent, link })}
                placeholder="https://codehustle.hypervision.in"
              />

              <label className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-white pt-5">
                <input
                  type="checkbox"
                  checked={Boolean(editingEvent.isUpcoming)}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, isUpcoming: e.target.checked })
                  }
                  className="w-5 h-5 accent-[#1ab7f2] rounded"
                />
                <span className="font-bold text-[#1ab7f2]">
                  Live / Flagship Event (Featured on Hero &amp; Live Track)
                </span>
              </label>
            </div>

            {/* DESCRIPTIONS & HIGHLIGHTS */}
            <div className="mt-6 space-y-4">
              <Field
                label="Event Description / Synopsis *"
                value={editingEvent.description}
                onChange={(description) => setEditingEvent({ ...editingEvent, description })}
                textarea
                placeholder="The premier 24-hour hackathon hosted by UPES Hypervision. Teams build intensive full-stack, AI, and cybersecurity prototypes..."
              />

              <Field
                label="Key Highlights (One bullet point per line)"
                value={editingEvent.highlightsText}
                onChange={(highlightsText) =>
                  setEditingEvent({ ...editingEvent, highlightsText })
                }
                textarea
                placeholder="24-Hour Continuous Sprints\nLive Leaderboard & Arbiters\nCash Prizes & Sponsored Cloud Credits"
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-8 pt-5 border-t border-white/10 flex justify-end gap-3">
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
                Save Event to Supabase Database
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. EDIT / CREATE FAMILY MEMBER MODAL WITH PHOTO UPLOAD */}
      {/* ========================================================================= */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-[#02060c]/90 backdrop-blur-md p-4 overflow-y-auto flex items-center justify-center">
          <div className="max-w-2xl w-full my-8 bg-[#081322] border-2 border-[#1ab7f2]/50 rounded-3xl p-6 sm:p-10 relative shadow-2xl">
            <div className="flex justify-between items-start pb-5 border-b border-white/10">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2]">
                  Supabase Roster Editor
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1">
                  {editingMember.name ? `Edit Member: ${editingMember.name}` : 'Add Family Member'}
                </h2>
              </div>
              <button
                className="admin-button"
                onClick={() => setEditingMember(null)}
              >
                Close &times;
              </button>
            </div>

            {/* PHOTO UPLOAD SECTION */}
            <div className="mt-6 p-4 bg-[#040812] border border-white/10 rounded-2xl flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-black border border-white/20 shrink-0">
                {editingMember.image ? (
                  <img
                    src={editingMember.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#1ab7f2] font-display font-bold text-xl">
                    {editingMember.initials || 'HV'}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  ref={memberFileInputRef}
                  onChange={handleMemberPhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => memberFileInputRef.current?.click()}
                  className="editorial-button text-xs !min-h-[36px] cursor-pointer"
                >
                  {isUploading ? 'Uploading...' : '📁 Upload Portrait Photo'}
                </button>
                <span className="block text-[11px] font-mono text-[#597187] mt-1">
                  Saved to Supabase Storage &apos;team&apos; bucket
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Full Name *"
                value={editingMember.name}
                onChange={(name) => setEditingMember({ ...editingMember, name })}
                placeholder="Purva"
              />

              <label className="block">
                <span className="admin-label">Position / Role *</span>
                <input
                  list="roles-list"
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="admin-input"
                  placeholder="President, Technical Head..."
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
                  <option value="design">Design &amp; Visual Systems</option>
                  <option value="operations">Operations &amp; Hackathons</option>
                  <option value="outreach">PR &amp; Institutional Outreach</option>
                </select>
              </label>

              <Field
                label="Department / Focus Area"
                value={editingMember.department ?? ''}
                onChange={(department) => setEditingMember({ ...editingMember, department })}
                placeholder="Autonomous Avionics &amp; Robotics"
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
                placeholder="P"
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
                placeholder="Zero slide decks. If you can’t demo it live, it doesn’t exist."
              />
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex justify-end gap-3">
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
                Save Profile to Supabase
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
