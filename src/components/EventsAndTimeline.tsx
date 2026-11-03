import React, { useState } from 'react';
import { EVENTS, MILESTONES, EventItem } from '../data/hypervisionData';
import { ArrowUpRight, Calendar, MapPin, Users, CheckCircle2, ExternalLink, X, Image as ImageIcon } from 'lucide-react';
import { HypervisionLogo } from './HypervisionLogo';

interface EventsProps {
  onOpenJoin: () => void;
}

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'milestones'>('events');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  const upcomingEvent = EVENTS.find((e) => e.isUpcoming) || EVENTS[0];
  const pastEvents = EVENTS.filter((e) => !e.isUpcoming);

  const filteredPastEvents = filterCategory === 'all'
    ? pastEvents
    : pastEvents.filter((e) => e.category === filterCategory);

  return (
    <section id="events" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              04 / Gatherings & History
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Events & Timeline
            </h2>
          </div>

          {/* Interactive Mode Segmented Tabs with Glass Pill */}
          <div className="flex items-center gap-1.5 p-1 glass-pill rounded-sm">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-white/15 text-white shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Flagship Events
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all rounded-sm cursor-pointer ${
                activeTab === 'milestones'
                  ? 'bg-white/15 text-white shadow-sm border border-white/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Milestones (2011–Present)
            </button>
          </div>
        </div>

        {activeTab === 'events' ? (
          <div className="space-y-16 mt-12">
            {/* UPCOMING FEATURED EVENT HERO CARD (Frosted Glassmorphic Canvas) */}
            <div className="glass-card-static rounded-sm p-8 sm:p-12 relative overflow-hidden group">
              <div
                className="absolute inset-0 tech-grid-pattern opacity-15 pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Large Editorial Date Display */}
                <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8">
                  <div className="font-mono text-xs uppercase tracking-widest text-cyan-400 mb-1">
                    Upcoming Flagship
                  </div>
                  <div className="font-display text-6xl sm:text-7xl font-extrabold tracking-tight text-white uppercase leading-none">
                    {upcomingEvent.month}
                  </div>
                  <div className="font-display text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 leading-none">
                    {upcomingEvent.day}
                  </div>
                  <div className="font-mono text-sm text-neutral-400 mt-2">
                    {upcomingEvent.year} · 24 Hours Nonstop
                  </div>
                </div>

                {/* Event Center Info */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                    AI · CYBERSECURITY · DISTRIBUTED SYSTEMS
                  </div>

                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
                    {upcomingEvent.title}
                  </h3>

                  <p className="text-neutral-300 text-base font-light leading-relaxed">
                    {upcomingEvent.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-300 pt-2">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      {upcomingEvent.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-cyan-400" />
                      {upcomingEvent.teamsOrAttendees}
                    </span>
                  </div>
                </div>

                {/* Event Register Action */}
                <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-4 lg:pl-6">
                  {upcomingEvent.link && (
                    <a
                      href={upcomingEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 transition-colors rounded-sm shadow-xl"
                    >
                      <span>REGISTER NOW</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setRegisteredEvent(upcomingEvent.id);
                      setTimeout(() => setRegisteredEvent(null), 4000);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider text-neutral-200 glass-pill hover:bg-white/10 rounded-sm cursor-pointer transition-colors"
                  >
                    <span>{registeredEvent === upcomingEvent.id ? 'Notifications Enabled!' : 'Get Live Updates'}</span>
                  </button>
                  {registeredEvent === upcomingEvent.id && (
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed to Code Hustle updates
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* PREVIOUS EVENTS ARCHIVE */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-4">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  Event Archive & Competitions
                </h3>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {['all', 'hackathon', 'bootcamp', 'symposium', 'workshop'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors rounded-sm cursor-pointer ${
                        filterCategory === cat
                          ? 'bg-white/15 text-white border border-white/20'
                          : 'text-neutral-400 hover:text-white glass-pill'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive Grid with Glass Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEventModal(event)}
                    className="glass-card rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="relative aspect-video overflow-hidden bg-neutral-950">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-3 left-3 text-xs font-mono uppercase text-white glass-pill px-2.5 py-0.5">
                        {event.month} {event.year}
                      </div>

                      {event.galleryImages && event.galleryImages.length > 0 && (
                        <div className="absolute top-3 right-3 text-[10px] font-mono text-cyan-300 glass-pill px-2 py-0.5 flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-cyan-400" />
                          <span>Photos</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                          {event.subtitle}
                        </span>
                        <h4 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                          {event.title}
                        </h4>
                        <p className="mt-2 text-xs text-neutral-300/80 font-light leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-neutral-400">
                        <span>{event.teamsOrAttendees}</span>
                        <span className="text-neutral-300 uppercase">{event.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* OFFICIAL MILESTONES (2011 - PRESENT) TIMELINE */
          <div className="mt-12 max-w-4xl mx-auto space-y-8">
            <p className="text-neutral-300 text-sm font-light max-w-2xl leading-relaxed">
              Tracing fifteen years of student-led technical innovation at the School of Computer Science (SoCS), UPES Dehradun—from an inaugural hackathon cohort to national sovereign engineering programs under MeitY.
            </p>

            <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-10 space-y-8 py-4">
              {MILESTONES.map((m) => (
                <div key={m.year} className="relative group">
                  {/* Timeline node */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-cyan-400 group-hover:bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.5)] transition-all" />

                  <div className="glass-card p-6 rounded-sm">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                        {m.year}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 glass-pill px-2.5 py-0.5">
                        {m.tag}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                      {m.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-300/90 font-light leading-relaxed max-w-2xl">
                      {m.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Event Details Lightbox / Inspector Modal in Frosted Glass */}
      {selectedEventModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-150"
          onClick={() => setSelectedEventModal(null)}
        >
          <div
            className="glass-modal max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-sm relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute top-4 right-4 z-20 p-2 text-neutral-300 hover:text-white glass-pill rounded-sm cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Poster / Primary Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
              <img
                src={selectedEventModal.image}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider glass-pill px-2.5 py-1">
                  {selectedEventModal.month} {selectedEventModal.year} · {selectedEventModal.category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mt-2">
                  {selectedEventModal.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  Event Overview & Impact
                </h4>
                <p className="text-neutral-200 leading-relaxed font-light text-base">
                  {selectedEventModal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 glass-card rounded-sm text-xs font-mono">
                <div>
                  <span className="text-neutral-400 block uppercase mb-0.5">Location</span>
                  <span className="text-white font-medium">{selectedEventModal.location}</span>
                </div>
                <div>
                  <span className="text-neutral-400 block uppercase mb-0.5">Participation</span>
                  <span className="text-white font-medium">{selectedEventModal.teamsOrAttendees}</span>
                </div>
              </div>

              {/* Gallery thumbnails if available */}
              {selectedEventModal.galleryImages && selectedEventModal.galleryImages.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                    Event Gallery Photographs
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedEventModal.galleryImages.map((img, idx) => (
                      <div key={idx} className="aspect-video bg-neutral-950 rounded-sm overflow-hidden border border-white/10 shadow-sm">
                        <img src={img} alt="Event capture" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
