import React, { useEffect, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';

interface EventsProps {
  onOpenJoin: () => void;
}

const CurrentEventCard = ({ event }: { event: ManagedEvent }) => (
  <article className="event-card event-card-current group flex flex-col justify-between">
    <div>
      <div className="relative aspect-[1.4] overflow-hidden bg-[#040812]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover photo-mono"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c33] via-transparent to-transparent opacity-90" />
        <div className="absolute top-4 left-4 bg-[#050c16]/90 border border-[#1ab7f2]/50 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-white">
          {event.month} {event.day ? `${event.day}, ` : ''}{event.year}
        </div>
        <div className="absolute top-4 right-4 bg-[#1ab7f2] text-[#020813] font-bold px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest">
          Registrations Open
        </div>
        <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-widest text-[#9edcf8]">
          {event.category} // {event.location}
        </span>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
          {event.title}
        </h3>
        <p className="mt-2 text-xs font-mono uppercase tracking-wider text-[#1ab7f2]">
          {event.subtitle}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-[#8fa2b6]">
          {event.description}
        </p>

        {event.highlights && event.highlights.length > 0 && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#597187] block mb-2">
              Key Highlights
            </span>
            <div className="flex flex-wrap gap-2">
              {event.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="text-[10px] font-mono uppercase tracking-wider text-[#c0d4e6] bg-[#071322] border border-white/10 px-2 py-1"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="p-6 sm:p-7 pt-0">
      {event.link ? (
        <a
          href={event.link}
          target="_blank"
          rel="noreferrer"
          className="editorial-button primary w-full text-center"
        >
          Apply & Details
        </a>
      ) : (
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#597187] block text-center py-2 border border-white/10">
          Details Announced Soon
        </span>
      )}
    </div>
  </article>
);

const PastEventCard = ({ event }: { event: ManagedEvent }) => (
  <article className="event-card event-card-past group">
    <div className="relative aspect-[1.6] overflow-hidden bg-[#040810]">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover photo-mono"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07101c] via-transparent to-transparent opacity-90" />
      <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#8fa2b6] bg-[#050c16]/90 px-2 py-0.5 border border-white/10">
        {event.month} {event.year}
      </span>
      <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#597187]">
        Concluded
      </span>
      <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
        {event.teamsOrAttendees || event.location}
      </span>
    </div>

    <div className="p-5 sm:p-6">
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
        {event.category}
      </span>
      <h4 className="mt-2 font-display text-xl sm:text-2xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
        {event.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6] line-clamp-2">
        {event.description}
      </p>

      {event.highlights && event.highlights.length > 0 && (
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
          {event.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="text-[9px] font-mono uppercase tracking-wider text-[#788e9f]"
            >
              • {h}
            </span>
          ))}
        </div>
      )}
    </div>
  </article>
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

  return (
    <section id="events" className="site-section py-24 sm:py-32 bg-[#050c16]">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b rule">
          <div>
            <p className="section-kicker">03 // Flagships & Sprints</p>
            <h2 className="section-title">
              The technical<br />
              <span className="text-[#1ab7f2]">calendar.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="section-intro">
              24-hour hackathons, national qualifiers, autonomous drone bootcamps, and alumni engineering rooms.
            </p>
            <button onClick={onOpenJoin} className="editorial-button">
              Join Next Event
            </button>
          </div>
        </div>

        {/* Section 1: CURRENT / UPCOMING EVENTS */}
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2.5 h-2.5 bg-[#1ab7f2] animate-pulse" />
            <h3 className="font-mono text-xs uppercase tracking-[.16em] text-[#1ab7f2] font-semibold">
              Current & Upcoming Events
            </h3>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <CurrentEventCard event={event} key={event.id} />
              ))}
            </div>
          ) : (
            <div className="p-8 border border-white/10 bg-[#081322] text-[#8fa2b6] font-mono text-xs uppercase tracking-wider">
              No live registration tracks at this moment. Stay tuned for upcoming hackathons.
            </div>
          )}
        </div>

        {/* Section 2: PAST EVENTS */}
        <div className="mt-20 pt-14 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[.16em] text-[#788e9f] font-semibold">
                Past Events & Hackathon History
              </h3>
              <p className="mt-1 text-sm text-[#8fa2b6]">
                Previous cohorts, 330-team arbitration matrices, and national symposia.
              </p>
            </div>
            <a
              href="/events"
              className="text-xs font-mono uppercase tracking-widest text-[#1ab7f2] hover:text-white transition-colors"
            >
              Browse complete archive
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.slice(0, 3).map((event) => (
              <PastEventCard event={event} key={event.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
