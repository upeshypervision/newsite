import React, { useEffect, useRef, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';
import { TiltCard } from './TiltCard';

interface EventsProps {
  onOpenJoin: () => void;
}

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  const [selectedEvent, setSelectedEvent] = useState<ManagedEvent | null>(null);
  const [filter, setFilter] = useState<'all' | 'live' | 'hackathons' | 'bootcamps'>('all');
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered dataset based on active pill
  const filteredEvents = events.filter((e) => {
    if (filter === 'live') return Boolean(e.isUpcoming);
    if (filter === 'hackathons') return e.category === 'hackathon';
    if (filter === 'bootcamps') {
      return e.category === 'bootcamp' || e.category === 'workshop' || e.category === 'symposium';
    }
    return true;
  });

  // Calculate counts for badges
  const liveCount = events.filter((e) => e.isUpcoming).length;
  const hackathonCount = events.filter((e) => e.category === 'hackathon').length;
  const bootcampCount = events.filter(
    (e) => e.category === 'bootcamp' || e.category === 'workshop' || e.category === 'symposium'
  ).length;

  // IMPORTANT: Only loop/auto-scroll when viewing "all" and there are 4+ distinct items.
  // When filtered down or when few items exist, NEVER duplicate identical cards!
  const shouldLoop = filter === 'all' && filteredEvents.length >= 4;

  const displayEvents = shouldLoop
    ? [...filteredEvents, ...filteredEvents]
    : filteredEvents;

  // Reset horizontal scroll offset to 0 whenever filter tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [filter]);

  // Smooth continuous auto-scroll using requestAnimationFrame ONLY when loopable
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !shouldLoop || displayEvents.length === 0) return;

    let animId: number;
    let lastTime: number | null = null;
    const pixelsPerSecond = 32; // gentle, readable glide speed
    let scrollPos = container.scrollLeft;

    const step = (now: number) => {
      if (!isPaused && container) {
        if (lastTime !== null) {
          const delta = (now - lastTime) / 1000;
          scrollPos += pixelsPerSecond * delta;

          // Seamless loop when scrolled past the first full set
          const halfWidth = container.scrollWidth / 2;
          if (halfWidth > 0 && scrollPos >= halfWidth) {
            scrollPos -= halfWidth;
          }
          container.scrollLeft = scrollPos;
        }
        lastTime = now;
      } else {
        lastTime = null;
        if (container) {
          scrollPos = container.scrollLeft;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, shouldLoop, displayEvents.length]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      setIsPaused(true);
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 2500);
    }
  };

  return (
    <section id="events" className="site-section py-20 sm:py-28 bg-[#030611] text-white overflow-hidden">
      <div className="section-wrap">
        {/* Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b rule mb-8">
          <div>
            <p className="section-kicker">02 // Programs &amp; Flagships</p>
            <h2 className="section-title">
              Imagine a room where<br />
              <span className="text-[#1ab7f2]">you built this:</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4">
            <p className="text-xs sm:text-sm text-[#8fa2b6] max-w-sm">
              Live hackathons, autonomous drone telemetry, and student-engineered software systems.
            </p>

            {/* Scroll navigation arrows - only show when content is scrollable */}
            {(shouldLoop || filteredEvents.length > 2) && (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleManualScroll('left')}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#1ab7f2] bg-[#071322] flex items-center justify-center text-white hover:text-[#1ab7f2] transition-colors cursor-pointer"
                  title="Scroll Left"
                >
                  &larr;
                </button>
                <button
                  type="button"
                  onClick={() => handleManualScroll('right')}
                  className="w-10 h-10 rounded-full border border-white/20 hover:border-[#1ab7f2] bg-[#071322] flex items-center justify-center text-white hover:text-[#1ab7f2] transition-colors cursor-pointer"
                  title="Scroll Right"
                >
                  &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
              filter === 'all'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            All Programs ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('live')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              filter === 'live'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            <span className="w-1.5 h-1.5 bg-[#1ab7f2] rounded-full animate-ping" />
            Live &amp; Upcoming ({liveCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('hackathons')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
              filter === 'hackathons'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            Hackathons &amp; Sprints ({hackathonCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('bootcamps')}
            className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
              filter === 'bootcamps'
                ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                : 'border-white/10 text-[#788e9f] hover:text-white'
            }`}
          >
            Bootcamps &amp; Mentorship ({bootcampCount})
          </button>
        </div>

        {/* Empty State if filter returns no items */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center border border-white/10 rounded-3xl bg-[#050c18] p-8 max-w-xl mx-auto my-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1ab7f2] inline-block mb-3 animate-pulse" />
            <h3 className="font-display text-xl font-bold text-white">No Programs In This Track</h3>
            <p className="mt-2 text-xs font-mono text-[#8fa2b6]">
              New sprints and hackathon dates are announced by the technical society board.
            </p>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className="mt-5 editorial-button primary text-xs !min-h-[38px] cursor-pointer"
            >
              View All Logged Programs &rarr;
            </button>
          </div>
        ) : (
          /* HORIZONTAL POSTER TRACK */
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => {
              if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
              pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 2000);
            }}
            className={`flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none select-none ${
              !shouldLoop && filteredEvents.length <= 2 ? 'sm:justify-center' : ''
            } -mx-4 px-4 sm:mx-0 sm:px-0`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayEvents.map((event, index) => {
              const isLive = Boolean(event.isUpcoming);
              const cardWidthClass =
                filteredEvents.length === 1
                  ? 'w-full max-w-[360px] sm:max-w-[420px]'
                  : 'w-[290px] sm:w-[320px]';

              return (
                <div
                  key={`${event.id}-${index}`}
                  className={`${cardWidthClass} shrink-0`}
                >
                  <TiltCard maxTilt={8} className="h-full">
                    <article
                      onClick={() => setSelectedEvent(event)}
                      className={`group relative h-[470px] sm:h-[490px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 text-left ${
                        isLive
                          ? 'border-2 border-[#1ab7f2] shadow-[0_0_35px_rgba(26,183,242,0.32)] bg-[#040d1a]'
                          : 'border border-white/10 hover:border-[#1ab7f2] bg-[#071322] hover:shadow-[0_20px_45px_rgba(26,183,242,0.2)]'
                      }`}
                    >
                      {/* Full-bleed authentic poster flyer background */}
                      <img
                        src={event.image}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Gradient overlay calibrated for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#02050c] via-[#02050c]/65 to-[#02050c]/20" />

                      {/* Top status & category tags */}
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <span className="bg-[#050c18]/90 text-[#1ab7f2] border border-[#1ab7f2]/40 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                          {event.category}
                        </span>
                        {isLive ? (
                          <span className="bg-[#1ab7f2] text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                            <span className="w-1.5 h-1.5 bg-[#020813] rounded-full animate-ping" />
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
                        {isLive ? (
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-semibold mb-1 truncate">
                            {event.location || 'MAC Auditorium'} &bull; {event.teamsOrAttendees || '60+ Finalist Teams'}
                          </p>
                        ) : (
                          <p className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f] font-semibold mb-1 truncate">
                            {event.subtitle || event.location}
                          </p>
                        )}

                        <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#1ab7f2] transition-colors leading-snug">
                          {event.title}
                        </h3>

                        <p className="mt-2 text-xs text-[#9ab0c4] line-clamp-2 leading-relaxed">
                          {event.description}
                        </p>

                        <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between gap-2">
                          {isLive ? (
                            <button
                              type="button"
                              className="rounded-full bg-[#1ab7f2] hover:bg-white text-[#020813] font-bold text-xs px-4 py-1.5 transition-all shadow-md cursor-pointer"
                            >
                              Register Now &rarr;
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-white group-hover:text-[#1ab7f2] transition-colors">
                              Explore Details <span className="text-sm">&nearr;</span>
                            </span>
                          )}

                          <span className="text-[10px] font-mono text-[#8fa2b6] shrink-0">
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
        )}

        {/* Footer Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>
            {filteredEvents.length} {filteredEvents.length === 1 ? 'Program' : 'Programs'} In Track &bull; {events.length} Total Logged
          </span>
          <div className="flex items-center gap-4">
            {shouldLoop && (
              <span className="hidden sm:inline-block text-[#597187]">
                Hover to pause &bull; Auto-scrolling
              </span>
            )}
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
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/10 rounded-full cursor-pointer"
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

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
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

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                {selectedEvent.link ? (
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button primary text-xs !min-h-[40px] px-6"
                  >
                    Open Official Portal &rarr;
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedEvent(null);
                      onOpenJoin();
                    }}
                    className="editorial-button primary text-xs !min-h-[40px] px-6"
                  >
                    Apply to Society &rarr;
                  </button>
                )}

                <span className="text-[10px] font-mono text-[#597187]">
                  UPES Hypervision Internal Track
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
