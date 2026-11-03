import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  ArrowUpRight,
  Sparkles,
  Edit3,
  Check,
  X,
  RotateCcw,
  Users,
  Tag,
  Link as LinkIcon
} from 'lucide-react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

interface JoinSectionProps {
  onOpenJoin: () => void;
}

export interface UpcomingChapterEvent {
  title: string;
  subtitle: string;
  badge: string;
  dateStr: string;
  timeStr: string;
  targetDate: string; // ISO date format for countdown calculation: YYYY-MM-DDTHH:mm:ss
  location: string;
  prizePool: string;
  eligibility: string;
  description: string;
  registrationUrl: string;
  tracks: string[];
}

const DEFAULT_EVENT: UpcomingChapterEvent = {
  title: "Code Hustle 2026: 24-Hour Flagship Hackathon",
  subtitle: "Annual National Software & Autonomous Systems Marathon",
  badge: "REGISTRATIONS NOW OPEN",
  dateStr: "November 14–15, 2026",
  timeStr: "10:00 AM IST (24 Hours Continuous)",
  targetDate: "2026-11-14T10:00:00",
  location: "MAC Auditorium & Computing Complex, UPES Bidholi Campus",
  prizePool: "₹1,50,000 Cash Pool + Cloud Credits",
  eligibility: "Open to all UPES SoCS & Engineering Students",
  description: "Join UPES HyperVision's flagship 24-hour sprint. Teams architect production prototypes across Autonomous Edge AI, Distributed Web Systems, and Cybersecurity with live jury arbitration and leaderboard ranking.",
  registrationUrl: "https://code-hustle-11.vercel.app/",
  tracks: ["Edge AI & Vision", "Distributed Cloud", "Cybersecurity & CTF", "Autonomous Robotics"]
};

export const JoinSection: React.FC<JoinSectionProps> = ({ onOpenJoin }) => {
  // Load saved event from localStorage or use default
  const [eventData, setEventData] = useState<UpcomingChapterEvent>(() => {
    try {
      const saved = localStorage.getItem('hypervision_upcoming_event');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback on error
    }
    return DEFAULT_EVENT;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UpcomingChapterEvent>(eventData);
  const [trackInput, setTrackInput] = useState('');

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(eventData.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [eventData.targetDate]);

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEventData(formData);
    try {
      localStorage.setItem('hypervision_upcoming_event', JSON.stringify(formData));
    } catch {
      // Ignore localStorage errors
    }
    setIsEditing(false);
  };

  const handleResetDefault = () => {
    setFormData(DEFAULT_EVENT);
    setEventData(DEFAULT_EVENT);
    try {
      localStorage.removeItem('hypervision_upcoming_event');
    } catch {
      // Ignore
    }
    setIsEditing(false);
  };

  const handleAddTrack = () => {
    if (trackInput.trim() && !formData.tracks.includes(trackInput.trim())) {
      setFormData({
        ...formData,
        tracks: [...formData.tracks, trackInput.trim()]
      });
      setTrackInput('');
    }
  };

  const handleRemoveTrack = (trackToRemove: string) => {
    setFormData({
      ...formData,
      tracks: formData.tracks.filter(t => t !== trackToRemove)
    });
  };

  return (
    <section id="join" className="py-24 relative overflow-hidden border-b border-white/[0.08]">
      {/* Subtle tech background */}
      <div
        className="absolute inset-0 tech-grid-pattern opacity-20 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/[0.08] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Selected Glass Card Box */}
        <div className="glass-card-static p-6 sm:p-12 rounded-2xl relative shadow-2xl border border-white/10 hover:border-cyan-400/30 transition-all text-left">
          
          {/* Header Row: Badge */}
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{eventData.badge || "UPCOMING CHAPTER EVENT"}</span>
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="mt-6 space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {eventData.title}
            </h2>
            {eventData.subtitle && (
              <p className="text-sm sm:text-base font-mono text-cyan-400/90 tracking-wide">
                {eventData.subtitle}
              </p>
            )}
          </div>

          {/* Event Metadata Strip */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 rounded-xl bg-black/40 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Date</span>
                <span className="text-xs font-semibold text-white truncate block">{eventData.dateStr}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-400/20 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Time</span>
                <span className="text-xs font-semibold text-white truncate block">{eventData.timeStr}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-400/20 shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Venue</span>
                <span className="text-xs font-semibold text-white truncate block">{eventData.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-400/20 shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Prize & Perks</span>
                <span className="text-xs font-semibold text-white truncate block">{eventData.prizePool}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
            <p>{eventData.description}</p>
          </div>

          {/* Tracks / Tags */}
          {eventData.tracks && eventData.tracks.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono uppercase text-neutral-400 mr-2 flex items-center gap-1">
                <Tag className="w-3 h-3 text-cyan-400" />
                <span>Tracks:</span>
              </span>
              {eventData.tracks.map((track, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-cyan-300 bg-white/5 border border-white/10"
                >
                  {track}
                </span>
              ))}
            </div>
          )}

          {/* Live Countdown Clock */}
          <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-cyan-950/20 via-neutral-900/60 to-indigo-950/20 border border-cyan-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300">
              <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Event Countdown:</span>
            </div>

            {timeLeft.isOver ? (
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded">
                Event Concluded / Live Now
              </span>
            ) : (
              <div className="flex items-center gap-3 text-center font-mono">
                <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 min-w-[54px]">
                  <span className="font-display text-lg font-bold text-white block leading-none">{timeLeft.days}</span>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Days</span>
                </div>
                <span className="text-neutral-500 font-bold">:</span>
                <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 min-w-[54px]">
                  <span className="font-display text-lg font-bold text-white block leading-none">{timeLeft.hours}</span>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Hours</span>
                </div>
                <span className="text-neutral-500 font-bold">:</span>
                <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 min-w-[54px]">
                  <span className="font-display text-lg font-bold text-white block leading-none">{timeLeft.minutes}</span>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Mins</span>
                </div>
                <span className="text-neutral-500 font-bold">:</span>
                <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 min-w-[54px]">
                  <span className="font-display text-lg font-bold text-cyan-400 block leading-none">{timeLeft.seconds}</span>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Secs</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {eventData.registrationUrl ? (
                <a
                  href={eventData.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 active:bg-neutral-300 transition-colors rounded-lg shadow-lg shadow-white/10 text-center"
                >
                  <span>Register for Event</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-950" />
                </a>
              ) : (
                <button
                  onClick={onOpenJoin}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 active:bg-neutral-300 transition-colors rounded-lg shadow-lg shadow-white/10 text-center"
                >
                  <span>Register for Event</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-950" />
                </button>
              )}

              <a
                href={`mailto:${HYPERVISION_INFO.email}?subject=Inquiry regarding ${encodeURIComponent(eventData.title)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-mono uppercase tracking-wider text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-lg text-center"
              >
                <span>Contact Organizer</span>
              </a>
            </div>

            <span className="text-xs font-mono text-neutral-400 text-center sm:text-right">
              {eventData.eligibility}
            </span>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* CHAPTER LEAD EVENT EDITOR MODAL                          */}
      {/* ======================================================== */}
      {isEditing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsEditing(false)}
        >
          <div
            className="bg-[#070e20] border border-cyan-400/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_25px_80px_rgba(34,211,238,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-cyan-400" />
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Edit Upcoming Chapter Event
                </h3>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSaveEvent} className="mt-6 space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400 text-sm font-sans"
                  placeholder="e.g. HyperHacks 2026: Quantum & AI Sprints"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                  Subtitle / Category Tagline
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400 text-sm font-sans"
                  placeholder="e.g. 24-Hour Annual Flagship Hackathon"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                    Badge Status Label
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. REGISTRATIONS OPEN"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                    Target Date for Countdown (YYYY-MM-DDTHH:mm:ss)
                  </label>
                  <input
                    type="text"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="2026-11-14T10:00:00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                    Display Date
                  </label>
                  <input
                    type="text"
                    value={formData.dateStr}
                    onChange={(e) => setFormData({ ...formData, dateStr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. November 14–15, 2026"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                    Display Time
                  </label>
                  <input
                    type="text"
                    value={formData.timeStr}
                    onChange={(e) => setFormData({ ...formData, timeStr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. 10:00 AM IST onwards"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                    Campus Location / Venue
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. MAC Auditorium, UPES Bidholi"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                    Prize Pool & Perks
                  </label>
                  <input
                    type="text"
                    value={formData.prizePool}
                    onChange={(e) => setFormData({ ...formData, prizePool: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. ₹1,50,000 Cash Pool"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                  Registration URL / Link
                </label>
                <input
                  type="url"
                  value={formData.registrationUrl}
                  onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400 text-sm font-sans"
                  placeholder="https://your-registration-form-or-site.com"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                  Eligibility & Criteria
                </label>
                <input
                  type="text"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. Open to all UPES Students"
                />
              </div>

              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                  Event Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400 text-xs font-sans leading-relaxed"
                  placeholder="Describe the upcoming hackathon, workshop, or competition..."
                />
              </div>

              {/* Event Tracks Tag Management */}
              <div>
                <label className="block text-neutral-300 uppercase tracking-wider mb-1">
                  Competition Tracks / Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTrack();
                      }
                    }}
                    placeholder="Add a track (e.g. GenAI, Web3, IoT) and press enter"
                    className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddTrack}
                    className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold uppercase"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.tracks.map((track) => (
                    <span
                      key={track}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-300"
                    >
                      <span>{track}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTrack(track)}
                        className="text-neutral-400 hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-lg text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-neutral-950 font-bold uppercase bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Upcoming Event</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
