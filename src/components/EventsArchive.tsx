import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';

const ArchiveCard = ({ event }: { event: ManagedEvent }) => (
  <article className="event-card event-card-past group bg-[#081322] border border-white/10 p-0 flex flex-col justify-between">
    <div>
      <div className="relative aspect-[1.7] overflow-hidden bg-[#040810]">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover photo-mono group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-85" />
        <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] bg-[#050c16]/90 px-2 py-0.5 border border-[#1ab7f2]/30">
          {event.month} {event.year}
        </span>
        <span className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
          Concluded
        </span>
        <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#8fa2b6]">
          {event.location}
        </span>
      </div>

      <div className="p-6">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
          {event.category}
        </span>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
          {event.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6]">
          {event.description}
        </p>

        {event.highlights && event.highlights.length > 0 && (
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
            {event.highlights.map((highlight) => (
              <span
                key={highlight}
                className="text-[9px] font-mono uppercase tracking-wider text-[#788e9f] bg-[#050c16] px-2 py-0.5 border border-white/10"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>

    <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-[11px] font-mono uppercase text-[#597187]">
      <span>{event.teamsOrAttendees || 'Campus Event'}</span>
      {event.link && (
        <a
          href={event.link}
          target="_blank"
          rel="noreferrer"
          className="text-[#1ab7f2] hover:text-white transition-colors"
        >
          Archive Link &rarr;
        </a>
      )}
    </div>
  </article>
);

export const EventsArchive: React.FC = () => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);

  useEffect(() => {
    const update = () => setEvents(getManagedEvents());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  return (
    <div className="min-h-screen bg-[#050c16] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <section className="section-wrap">
          <p className="section-kicker">Historical Record &bull; 2011 &ndash; Present</p>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold tracking-tight text-white">
            The event<br />
            <span className="text-[#1ab7f2]">archives.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#8fa2b6]">
            Every flagship hackathon, 330-team national qualifier, drone robotics flight camp, and alumni session organized by Hypervision since inception.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <ArchiveCard event={event} key={event.id} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
