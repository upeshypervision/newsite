import React, { useEffect, useRef, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';
import { TiltCard } from './TiltCard';

interface EventsProps {
  onOpenJoin: () => void;
}

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  const [selectedEvent, setSelectedEvent] = useState<ManagedEvent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setEvents(getManagedEvents());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="events" className="site-section py-20 sm:py-28 bg-[#030611] text-white overflow-hidden">
      <div className="section-wrap">
        {/* Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b rule mb-8">
          <div>
            <p className="section-kicker">03 // Programs &amp; Flagships</p>
            <h2 className="section-title">
              Imagine a room where<br />
              <span className="text-[#1ab7f2]">you built this:</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4">
            <p className="text-xs sm:text-sm text-[#8fa2b6] max-w-sm">
              Full-bleed flagship posters. Scroll horizontally to browse all hackathons, bootcamps, and symposia.
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

        {/* HORIZONTAL SCROLLING POSTER CARDS TRACK (Exact match to uploaded screenshot Image 1) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.map((event) => {
            const isUpcoming = event.isUpcoming;
            return (
              <div
                key={event.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start"
              >
                <TiltCard maxTilt={8} className="h-full">
                  <article
                    onClick={() => setSelectedEvent(event)}
                    className="group relative aspect-[9/13] rounded-3xl overflow-hidden border border-white/10 hover:border-[#1ab7f2] cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 text-left"
                  >
                    {/* Full-bleed poster image in natural color */}
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient overlay for bottom readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02050c] via-[#02050c]/60 to-transparent" />

                    {/* Top status & category tag */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <span className="bg-[#050c18]/90 text-[#1ab7f2] border border-[#1ab7f2]/40 font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold">
                        {event.category}
                      </span>
                      {isUpcoming ? (
                        <span className="bg-[#1ab7f2] text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                          <span className="w-1.5 h-1.5 bg-[#020813] rounded-full animate-ping" />
                          Live Track
                        </span>
                      ) : (
                        <span className="bg-white text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow">
                          Ended
                        </span>
                      )}
                    </div>

                    {/* Bottom Content Area (Exact layout from user screenshot) */}
                    <div className="relative z-10">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-[#1ab7f2] transition-colors leading-tight">
                        {event.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#9ab0c4] line-clamp-2 leading-relaxed">
                        {event.subtitle || event.description}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-white group-hover:text-[#1ab7f2] transition-colors">
                          Dive In <span className="text-sm">&nearr;</span>
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
          })}
        </div>

        {/* Footer Prompt */}
        <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>{events.length} Historical &amp; Active Flagships Available</span>
          <a
            href="/events"
            className="editorial-button text-xs font-mono uppercase tracking-widest text-[#1ab7f2] rounded-full !px-5"
          >
            Explore Full Event Archive &rarr;
          </a>
        </div>
      </div>

      {/* EVENT SPECS MODAL */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-[#02060e]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#071322] border border-[#1ab7f2]/50 p-6 sm:p-8 rounded-3xl relative shadow-2xl my-auto text-left"
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
    </section>
  );
};