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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const displayEvents = events.slice(0, 4);

  return (
    <section id="events" className="site-section py-20 sm:py-28 bg-[#030611] text-white">
      <div className="section-wrap">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-[.2em] text-[#1ab7f2] font-semibold mb-2">
            03 // Programs &amp; Flagships
          </p>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Imagine a room where<br />
            <span className="text-[#1ab7f2]">you built this:</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#8fa2b6] leading-relaxed">
            Every event below is student-engineered, open to all UPES cohorts, and happening right now. Click any card to inspect full track details.
          </p>
        </div>

        {/* 2x2 HACK CLUB EXACT CARDS (Matched from reference screenshot Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {displayEvents.map((event) => {
            const isUpcoming = event.isUpcoming;
            return (
              <TiltCard key={event.id} maxTilt={6} className="h-full">
                <article
                  onClick={() => setSelectedEvent(event)}
                  className="group relative overflow-hidden bg-[#071322] border border-white/10 hover:border-[#1ab7f2] rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_20px_45px_rgba(26,183,242,0.18)]"
                >
                  {/* Visual Background Banner Overlay */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/85 to-transparent" />
                  </div>

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-bold">
                        {event.category}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#1ab7f2] transition-colors leading-tight">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#9ab0c4] leading-relaxed line-clamp-2">
                      {event.description}
                    </p>

                    <p className="mt-1 text-[11px] font-mono text-[#597187]">
                      {event.location} &bull; {event.teamsOrAttendees || 'Open Track'}
                    </p>
                  </div>

                  {/* Bottom Bar: Curvy Button on left, White Pill on right (Image 2 Match) */}
                  <div className="relative z-10 mt-6 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <button
                        type="button"
                        className="rounded-full bg-[#1ab7f2] hover:bg-white text-[#020813] font-bold text-xs px-5 py-2 transition-all shadow-md"
                      >
                        {isUpcoming ? 'Start now \u2192' : 'See the site \u2192'}
                      </button>
                      <span className="block text-[9px] font-mono text-[#597187] mt-1">
                        {isUpcoming ? 'Live discussions active' : 'Archived track specs'}
                      </span>
                    </div>

                    {/* Hack Club style Status Pill Badge */}
                    <div className="bg-white text-[#020813] font-bold text-[10px] font-mono uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
                      {isUpcoming ? 'Upcoming' : 'Ended'}
                    </div>
                  </div>
                </article>
              </TiltCard>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#788e9f] mb-3">
            Looking for older cohorts, symposia, or bootcamps?
          </p>
          <a
            href="/events"
            className="editorial-button text-xs font-mono uppercase tracking-widest inline-block rounded-full !px-6"
          >
            Explore all 15 years of archives &rarr;
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