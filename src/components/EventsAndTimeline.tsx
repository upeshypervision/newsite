import React, { useEffect, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';
import { TiltCard } from './TiltCard';

interface EventsProps {
  onOpenJoin: () => void;
}

const CurrentEventCard = ({ event }: { event: ManagedEvent }) => (
  <TiltCard maxTilt={8} className="h-full">
    <article className="event-card event-card-current group flex flex-col justify-between h-full bg-[#081322] border border-[#1ab7f2]/40 hover:border-[#1ab7f2] transition-colors">
      <div>
        <div className="relative aspect-[16/9] sm:aspect-[2.1/1] overflow-hidden bg-[#040812]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover photo-mono group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-[#081322]/40 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-[#050c16]/90 border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
            {event.month} {event.day ? `${event.day}, ` : ''}{event.year}
          </div>

          <div className="absolute top-3 right-3 bg-[#1ab7f2] text-[#020813] font-bold px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 bg-[#020813] rounded-full animate-ping" />
            Live Registrations
          </div>

          <span className="absolute bottom-2.5 left-3 text-[10px] font-mono uppercase tracking-widest text-[#9edcf8]">
            {event.category} // {event.location}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
            {event.subtitle}
          </p>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
            {event.title}
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#8fa2b6] line-clamp-2">
            {event.description}
          </p>

          {event.highlights && event.highlights.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#597187] block mb-2">
                Key Parameters
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.highlights.slice(0, 3).map((highlight) => (
                  <span
                    key={highlight}
                    className="text-[9px] font-mono uppercase tracking-wider text-[#c0d4e6] bg-[#050c16] border border-white/10 px-2 py-0.5"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6 pt-0">
        {event.link ? (
          <a
            href={event.link}
            target="_blank"
            rel="noreferrer"
            className="editorial-button primary w-full text-center block text-xs"
          >
            Apply &amp; Details &rarr;
          </a>
        ) : (
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#597187] block text-center py-2 border border-white/10">
            Details Announced Soon
          </span>
        )}
      </div>
    </article>
  </TiltCard>
);

const PastEventCard = ({ event }: { event: ManagedEvent }) => (
  <TiltCard maxTilt={8} className="h-full">
    <article className="event-card event-card-past group flex flex-col justify-between h-full bg-[#060e1a] border border-white/10 hover:border-white/30 transition-colors">
      <div>
        <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-[#040810]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060e1a] via-[#060e1a]/50 to-transparent" />
          
          <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#8fa2b6] bg-[#050c16]/90 px-2 py-0.5 border border-white/10">
            {event.month} {event.year}
          </span>
          
          <div className="absolute top-3 right-3 bg-[#0a1526]/90 border border-white/20 text-[#8fa2b6] px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#597187] rounded-none" />
            [EVENT ENDED]
          </div>

          <span className="absolute bottom-2.5 left-3 text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
            {event.teamsOrAttendees || event.location}
          </span>
        </div>

        <div className="p-5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2]">
            {event.category}
          </span>
          <h4 className="mt-1 font-display text-lg sm:text-xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
            {event.title}
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-[#788e9f] line-clamp-2">
            {event.description}
          </p>

          {event.highlights && event.highlights.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
              {event.highlights.slice(0, 2).map((h) => (
                <span
                  key={h}
                  className="text-[9px] font-mono uppercase tracking-wider text-[#597187]"
                >
                  &bull; {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0">
        <a
          href="/events"
          className="text-[10px] font-mono uppercase tracking-wider text-[#8fa2b6] group-hover:text-[#1ab7f2] transition-colors flex items-center justify-between border-t border-white/10 pt-3"
        >
          <span>Retrospective Archive</span>
          <span>View records &rarr;</span>
        </a>
      </div>
    </article>
  </TiltCard>
);

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);

  useEffect(() => {
    const update = () => setEvents(getManagedEvents());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  const upcomingEvents = events.filter((e) => e.isUpcoming);
  const pastEvents = events.filter((e) => !e.isUpcoming);
  // Show strictly the last 2 past events per user request
  const lastTwoPastEvents = pastEvents.slice(0, 2);

  return (
    <section id="events" className="site-section py-20 sm:py-28 bg-[#050c16]">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b rule">
          <div>
            <p className="section-kicker">03 // Flagships &amp; Sprints</p>
            <h2 className="section-title">
              The technical<br />
              <span className="text-[#1ab7f2]">calendar.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="section-intro">
              24-hour hackathons, national qualifiers, autonomous drone bootcamps, and alumni engineering rooms.
            </p>
            <button onClick={onOpenJoin} className="editorial-button text-xs">
              Join Next Event
            </button>
          </div>
        </div>

        {/* Section 1: CURRENT / UPCOMING EVENT */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#1ab7f2] animate-pulse" />
            <h3 className="font-mono text-xs uppercase tracking-[.16em] text-[#1ab7f2] font-semibold">
              Current Active Track
            </h3>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <CurrentEventCard event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <div className="p-6 border border-white/10 bg-[#081322] text-[#8fa2b6] font-mono text-xs uppercase tracking-wider">
              No live registration tracks at this moment. Stay tuned for upcoming hackathons.
            </div>
          )}
        </div>

        {/* Section 2: LAST 2 PAST EVENTS (Black & White, Compact, [EVENT ENDED]) */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-[#597187]" />
                <h3 className="font-mono text-xs uppercase tracking-[.16em] text-[#788e9f] font-semibold">
                  Recent Concluded Flagships
                </h3>
              </div>
              <p className="text-xs text-[#8fa2b6]">
                Last two concluded hackathons and national qualifier symposiums.
              </p>
            </div>
            <a
              href="/events"
              className="text-xs font-mono uppercase tracking-widest text-[#1ab7f2] hover:text-white transition-colors"
            >
              Browse complete archive ({pastEvents.length} events) &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lastTwoPastEvents.map((event) => (
              <PastEventCard event={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};