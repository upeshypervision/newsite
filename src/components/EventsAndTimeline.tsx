import React, { useEffect, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';

interface EventsProps { onOpenJoin: () => void; }

const EventCard = ({ event }: { event: ManagedEvent }) => {
  const current = Boolean(event.isUpcoming);
  return <article className={`group overflow-hidden ${current ? 'event-card-current text-white' : 'event-card-past'} `}>
    <div className="relative aspect-[1.35] overflow-hidden bg-[#181a1e]">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      <div className={`absolute inset-0 ${current ? 'bg-gradient-to-t from-[#101114] via-transparent to-transparent' : 'bg-gradient-to-t from-[#dedbd2] via-transparent to-transparent'}`} />
      <span className={`absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest ${current ? 'text-white' : 'text-[#353638]'}`}>{event.month} / {event.year}</span>
      {current && <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[#22d3ee]">Ongoing</span>}
    </div>
    <div className="p-5 sm:p-6">
      <p className={`text-[10px] font-mono uppercase tracking-widest ${current ? 'text-[#22d3ee]' : 'event-muted'}`}>{event.category}</p>
      <h3 className="event-title mt-3 font-display text-3xl leading-none">{event.title}</h3>
      <p className="event-muted mt-3 text-sm leading-6">{event.description}</p>
      <div className="event-muted mt-5 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono uppercase tracking-wider">{event.highlights.slice(0, 3).map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
      {current && event.link && <a href={event.link} target="_blank" rel="noreferrer" className="editorial-button primary mt-6">Apply now</a>}
    </div>
  </article>;
};

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  useEffect(() => { const update = () => setEvents(getManagedEvents()); void hydrateManagedContent(); window.addEventListener(CONTENT_EVENT, update); return () => window.removeEventListener(CONTENT_EVENT, update); }, []);
  const current = events.filter((event) => event.isUpcoming);
  const past = events.filter((event) => !event.isUpcoming);
  const displayed = [...current, ...past].slice(0, 3);
  return <section id="events" className="site-section py-24"><div className="section-wrap">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-7 pb-8 border-b rule"><div><p className="section-kicker">03 — Past activity</p><h2 className="section-title !text-6xl sm:!text-8xl">What&apos;s<br /><em className="text-[#22d3ee]">happening.</em></h2></div><button onClick={onOpenJoin} className="editorial-button">Join Hypervision</button></div>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">{displayed.map((event) => <EventCard event={event} key={event.id} />)}</div>
    <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t rule pt-5"><p className="text-sm text-[#92949c]">From current builds to the events that shaped the club.</p><a href="/events" className="text-[#22d3ee] text-[11px] font-mono uppercase tracking-widest hover:text-white">See our past events <span className="text-lg align-[-2px]">→</span></a></div>
  </div></section>;
};
