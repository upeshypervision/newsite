import React, { useEffect, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';
import { TiltCard } from './TiltCard';

interface EventsProps {
  onOpenJoin: () => void;
}

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  const [selectedEvent, setSelectedEvent] = useState<ManagedEvent | null>(null);

  useEffect(() => {
    const update = () => setEvents(getManagedEvents());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  // Keyboard escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Display top 4 flagships (current upcoming + top past flagships)
  const displayEvents = events.slice(0, 4);

  return (
    <section id="events" className="site-section py-20 sm:py-28 bg-[#030710] text-white">
      <div className="section-wrap">
        {/* Hack Club Programs Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] font-semibold mb-2">
            03 // Programs &amp; Flagships
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Imagine a room where<br />
            <span className="text-[#1ab7f2]">you built this:</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8fa2b6] leading-relaxed">
            Every event below is student-engineered, open to all UPES cohorts, and happening right now. Click any card to inspect full track details.
          </p>
        </div>

        {/* 2x2 COMPACT HACK CLUB STYLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {displayEvents.map((event) => {
            const isUpcoming = event.isUpcoming;
            return (
              <TiltCard key={event.id} maxTilt={6} className="h-full">
                <article
                  onClick={() => setSelectedEvent(event)}
                  className="group relative overflow-hidden bg-[#071322] border border-white/10 hover:border-[#1ab7f2] p-5 sm:p-6 flex flex-col justify-between h-full min-h-[200px] cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_15px_35px_rgba(26,183,242,0.15)]"
                >
                  {/* Subtle background image watermark */}
                  <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/80 to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2] font-semibold">
                        {event.category}
                      </span>
                      {isUpcoming ? (
                        <span className="bg-[#1ab7f2] text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-[#020813] rounded-full animate-ping" />
                          Live Track
                        </span>
                      ) : (
                        <span className="bg-[#050c16] text-[#788e9f] border border-white/10 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5">
                          [CONCLUDED]
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#1ab7f2] transition-colors leading-snug">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#8fa2b6] leading-relaxed line-clamp-2">
                      {event.subtitle || event.description}
                    </p>
                  </div>

                  {/* Compact Bottom Bar */}
                  <div className="relative z-10 mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                    <span className="editorial-button !min-h-[32px] !px-3 text-[11px] font-semibold primary">
                      {isUpcoming ? 'Start now \u2192' : 'View Track Specs \u2192'}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#9ab0c4]">
                      {event.month} {event.day ? `${event.day}, ` : ''}{event.year}
                    </span>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>

        {/* Hack Club Footer Prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#788e9f] mb-3">
            Looking for older cohorts, symposia, or bootcamps?
          </p>
          <a
            href="/events"
            className="editorial-button text-xs font-mono uppercase tracking-widest inline-block"
          >
            Explore all 15 years of archives &rarr;
          </a>
        </div>
      </div>

      {/* EVENT DETAILS MODAL (Opens when clicking any card) */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-[#02060e]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#071322] border border-[#1ab7f2]/50 p-6 sm:p-8 relative shadow-2xl my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-2 py-1 border border-white/10 hover:border-white/30"
            >
              [Close &times;]
            </button>

            {/* Banner image */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#040810] border border-white/10 mt-4 sm:mt-2">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 bg-[#050c16]/90 border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
                {selectedEvent.month} {selectedEvent.day ? `${selectedEvent.day}, ` : ''}{selectedEvent.year}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
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

              {/* Attendance and Highlights */}
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
                        className="text-[9px] font-mono uppercase tracking-wider text-[#c0d4e6] bg-[#050c16] border border-white/10 px-2 py-0.5"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-3">
                {selectedEvent.link ? (
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button primary text-xs flex-1 text-center"
                  >
                    Launch Live Portal &rarr;
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedEvent(null);
                      onOpenJoin();
                    }}
                    className="editorial-button primary text-xs flex-1 text-center"
                  >
                    Register for Next Sprint &rarr;
                  </button>
                )}
                <a
                  href="/events"
                  className="editorial-button text-xs text-center"
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