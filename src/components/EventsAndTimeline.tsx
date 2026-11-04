import React, { useEffect, useRef, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';
import { PROJECTS, Project } from '../data/hypervisionData';
import { TiltCard } from './TiltCard';

interface EventsProps {
  onOpenJoin: () => void;
}

type ShowcaseItem =
  | { kind: 'event'; data: ManagedEvent }
  | { kind: 'system'; data: Project };

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  const [selectedEvent, setSelectedEvent] = useState<ManagedEvent | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'systems' | 'flagships'>('all');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setEvents(getManagedEvents());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Combine Events and Working Systems into unified showcase
  const eventItems: ShowcaseItem[] = events.map((e) => ({ kind: 'event', data: e }));
  const systemItems: ShowcaseItem[] = PROJECTS.map((p) => ({ kind: 'system', data: p }));

  const allItems = [...eventItems, ...systemItems];

  const filteredItems = allItems.filter((item) => {
    if (filter === 'live') return item.kind === 'event' && item.data.isUpcoming;
    if (filter === 'systems') return item.kind === 'system';
    if (filter === 'flagships') return item.kind === 'event';
    return true;
  });

  return (
    <section id="events" className="site-section py-20 sm:py-28 bg-[#030611] text-white overflow-hidden">
      <div className="section-wrap">
        {/* Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b rule mb-8">
          <div>
            <p className="section-kicker">03 // Programs &amp; Production Systems</p>
            <h2 className="section-title">
              Imagine a room where<br />
              <span className="text-[#1ab7f2]">you built this:</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4">
            <p className="text-xs sm:text-sm text-[#8fa2b6] max-w-sm">
              Live hackathons, autonomous drone telemetry, and student-engineered software systems.
            </p>

            {/* Scroll navigation arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleScroll('left')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#1ab7f2] bg-[#071322] flex items-center justify-center text-white hover:text-[#1ab7f2] transition-colors"
                title="Scroll Left"
              >
                &larr;
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#1ab7f2] bg-[#071322] flex items-center justify-center text-white hover:text-[#1ab7f2] transition-colors"
                title="Scroll Right"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-4">
          <button
            onClick={() => setFilter('all')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
              filter === 'all'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            All Tracks ({allItems.length})
          </button>
          <button
            onClick={() => setFilter('live')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filter === 'live'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-[#1ab7f2] rounded-full animate-ping" />
            Live Flagship
          </button>
          <button
            onClick={() => setFilter('systems')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
              filter === 'systems'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            Working Systems ({systemItems.length})
          </button>
          <button
            onClick={() => setFilter('flagships')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
              filter === 'flagships'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            Flagships &amp; Sprints ({eventItems.length})
          </button>
        </div>

        {/* HORIZONTAL SCROLLING TRACK (Live Events BIGGER + Working Systems Included) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-3 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredItems.map((item) => {
            if (item.kind === 'event') {
              const event = item.data;
              const isLive = event.isUpcoming;

              return (
                <div
                  key={event.id}
                  className={`shrink-0 snap-start transition-all duration-300 ${
                    isLive
                      ? 'w-[320px] sm:w-[440px] md:w-[480px]' // LIVE EVENTS SHOWN BIGGER
                      : 'w-[280px] sm:w-[320px]'
                  }`}
                >
                  <TiltCard maxTilt={8} className="h-full">
                    <article
                      onClick={() => setSelectedEvent(event)}
                      className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 text-left h-full ${
                        isLive
                          ? 'aspect-[10/13] sm:aspect-[16/12] border-2 border-[#1ab7f2] shadow-[0_0_40px_rgba(26,183,242,0.35)] bg-gradient-to-t from-[#02050c] to-[#081528]'
                          : 'aspect-[9/13] border border-white/10 hover:border-[#1ab7f2] bg-[#071322]'
                      }`}
                    >
                      {/* Full-bleed poster image in natural color */}
                      <img
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Gradient overlay for bottom readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02050c] via-[#02050c]/65 to-transparent" />

                      {/* Top status & category tag */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <span className="bg-[#050c18]/90 text-[#1ab7f2] border border-[#1ab7f2]/40 font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded-full font-bold">
                          {event.category}
                        </span>
                        {isLive ? (
                          <span className="bg-[#1ab7f2] text-[#020813] font-bold text-[10px] font-mono uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                            <span className="w-2 h-2 bg-[#020813] rounded-full animate-ping" />
                            Live Flagship
                          </span>
                        ) : (
                          <span className="bg-white text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                            Ended
                          </span>
                        )}
                      </div>

                      {/* Bottom Content Area */}
                      <div className="relative z-10">
                        {isLive && (
                          <div className="mb-2">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-semibold">
                              MAC Auditorium &bull; 60+ Finalist Teams
                            </span>
                          </div>
                        )}

                        <h3
                          className={`font-display font-black text-white group-hover:text-[#1ab7f2] transition-colors leading-tight ${
                            isLive ? 'text-2xl sm:text-4xl' : 'text-xl sm:text-2xl'
                          }`}
                        >
                          {event.title}
                        </h3>

                        <p className="mt-1.5 text-xs sm:text-sm text-[#9ab0c4] line-clamp-2 leading-relaxed">
                          {event.subtitle || event.description}
                        </p>

                        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1.5 font-mono font-bold transition-colors ${
                              isLive
                                ? 'editorial-button primary text-xs !min-h-[34px] !px-4'
                                : 'text-xs text-white group-hover:text-[#1ab7f2]'
                            }`}
                          >
                            {isLive ? 'Register Now \u2192' : 'Dive In \u2197'}
                          </span>

                          <span className="text-[10px] font-mono text-[#8fa2b6]">
                            {event.month} {event.year}
                          </span>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                </div>
              );
            }

            // KIND: SYSTEM (Working systems, zero theory)
            const project = item.data;
            return (
              <div
                key={project.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start"
              >
                <TiltCard maxTilt={8} className="h-full">
                  <article
                    onClick={() => setSelectedProject(project)}
                    className="group relative aspect-[9/13] rounded-3xl overflow-hidden border border-white/10 hover:border-[#1ab7f2] cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 text-left bg-[#071322]"
                  >
                    {/* Background system graphic */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02050c] via-[#02050c]/65 to-transparent" />

                    {/* Top status */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="bg-[#050c18]/90 text-[#1ab7f2] border border-[#1ab7f2]/40 font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold">
                        SYS // {project.number} &bull; {project.category.split(' ')[0]}
                      </span>
                      <span className="bg-white text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                        Live System
                      </span>
                    </div>

                    {/* Bottom Content Area */}
                    <div className="relative z-10">
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white group-hover:text-[#1ab7f2] transition-colors leading-tight">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#9ab0c4] line-clamp-2 leading-relaxed">
                        {project.subtitle || project.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#1ab7f2] transition-colors">
                          Inspect Specs <span className="text-sm">&nearr;</span>
                        </span>

                        <span className="text-[10px] font-mono text-[#8fa2b6] truncate max-w-[110px]">
                          {project.metrics?.split('·')[0] || 'Production'}
                        </span>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>{allItems.length} Live Flagships, Sprints &amp; Production Systems Tracked</span>
          <div className="flex items-center gap-4">
            <a
              href="/#projects"
              className="text-[#8fa2b6] hover:text-white transition-colors"
            >
              Working Systems &rarr;
            </a>
            <a
              href="/events"
              className="editorial-button text-xs font-mono uppercase tracking-widest text-[#1ab7f2] rounded-full !px-5"
            >
              Full Archive Records &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* EVENT SPECS MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-[#02060e]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#071322] border border-[#1ab7f2]/50 p-6 sm:p-8 rounded-3xl relative shadow-2xl my-auto text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/10 rounded-full"
            >
              [Close &times;]
            </button>

            <div className="relative aspect-[16/9] overflow-hidden bg-[#040810] border border-white/10 rounded-2xl mt-4 sm:mt-2">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 bg-[#050c16]/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white">
                {selectedEvent.month} {selectedEvent.day ? `${selectedEvent.day}, ` : ''}{selectedEvent.year}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-bold">
                  {selectedEvent.category}
                </span>
                <span className="text-white/20">&bull;</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
                  {selectedEvent.location}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {selectedEvent.title}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#1ab7f2]">
                {selectedEvent.subtitle}
              </p>

              <p className="mt-4 text-sm text-[#9ab0c4] leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#597187] block mb-1">
                    Turnout &amp; Scale
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-white">
                    {selectedEvent.teamsOrAttendees || 'Open Track'}
                  </span>
                </div>

                {selectedEvent.highlights && selectedEvent.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedEvent.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[9px] font-mono uppercase tracking-wider text-[#c0d4e6] bg-[#050c16] border border-white/10 px-2.5 py-0.5 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                {selectedEvent.link ? (
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button primary text-xs flex-1 text-center rounded-full"
                  >
                    Launch Live Portal &rarr;
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      onOpenJoin();
                    }}
                    className="editorial-button primary text-xs flex-1 text-center rounded-full"
                  >
                    Register for Next Sprint &rarr;
                  </button>
                )}
                <a
                  href="/events"
                  className="editorial-button text-xs text-center rounded-full"
                >
                  View Full Archive Log
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT SPECS MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-[#02060e]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#071322] border border-[#1ab7f2]/50 p-6 sm:p-8 rounded-3xl relative shadow-2xl my-auto text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/10 rounded-full"
            >
              [Close &times;]
            </button>

            <div className="relative aspect-[16/9] overflow-hidden bg-[#040810] border border-white/10 rounded-2xl mt-4 sm:mt-2">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 bg-[#050c16]/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white">
                SYS // {selectedProject.number} &bull; {selectedProject.category}
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {selectedProject.title}
              </h3>
              <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#1ab7f2]">
                {selectedProject.subtitle}
              </p>

              <p className="mt-4 text-sm text-[#9ab0c4] leading-relaxed">
                {selectedProject.fullOverview || selectedProject.description}
              </p>

              {selectedProject.metrics && (
                <div className="mt-4 p-3 bg-[#050c18] border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[#788e9f] uppercase tracking-wider">Production Metrics</span>
                  <span className="text-[#1ab7f2] font-semibold">{selectedProject.metrics}</span>
                </div>
              )}

              <div className="mt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f] block mb-2">
                  Architecture &amp; Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono uppercase tracking-wider text-[#c0d4e6] bg-[#050c16] border border-white/10 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button primary text-xs flex-1 text-center rounded-full"
                  >
                    Open Live Deployment &rarr;
                  </a>
                )}
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button text-xs flex-1 text-center rounded-full"
                  >
                    GitHub Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};