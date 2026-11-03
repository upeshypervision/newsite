import React, { useEffect, useState } from 'react';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';

interface EventsProps { onOpenJoin: () => void; }

const EventCard = ({ event, featured = false }: { event: ManagedEvent; featured?: boolean }) => (
  <article className={`group border-t border-white/20 ${featured ? 'lg:col-span-7' : ''}`}>
    <div className={`relative overflow-hidden bg-[#181a1e] ${featured ? 'aspect-[1.75/1]' : 'aspect-[1.35/1]'}`}>
      <img src={event.image} alt={event.title} className="w-full h-full object-cover photo-mono group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent" />
      <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white">{event.month} / {event.year}</span>
      <span className="absolute bottom-4 left-5 text-[11px] font-mono uppercase tracking-widest text-[#b7ccf5]">{event.category}</span>
    </div>
    <div className="py-5">
      <h3 className={`${featured ? 'text-4xl' : 'text-2xl'} font-display leading-none text-white`}>{event.title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#9b9da5] max-w-xl">{event.description}</p>
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-[#777a84]">{event.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}</div>
      {event.isUpcoming && event.link && <a href={event.link} target="_blank" rel="noreferrer" className="inline-block mt-6 editorial-button primary">Apply for this event</a>}
    </div>
  </article>
);

export const EventsAndTimeline: React.FC<EventsProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  useEffect(() => { const update = () => setEvents(getManagedEvents()); void hydrateManagedContent(); window.addEventListener(CONTENT_EVENT, update); return () => window.removeEventListener(CONTENT_EVENT, update); }, []);
  const current = events.filter((event) => event.isUpcoming);
  const past = events.filter((event) => !event.isUpcoming);
  return <section id="events" className="site-section py-28"><div className="section-wrap">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b rule"><div><p className="section-kicker">03 — On the calendar</p><h2 className="section-title">Events<br /><em className="text-[#9bbcff]">in motion.</em></h2></div><button onClick={onOpenJoin} className="editorial-button">Join the next one</button></div>
    <div className="pt-16"><div className="flex items-baseline justify-between mb-7"><h3 className="font-display text-4xl text-white">Current events</h3><span className="section-kicker">{current.length.toString().padStart(2, '0')} live</span></div>{current.length ? <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">{current.map((event, index) => <EventCard event={event} featured={index === 0} key={event.id} />)}</div> : <p className="border-t rule pt-5 text-[#92949c]">The next programme is being planned. Check back soon.</p>}</div>
    <div className="pt-24"><div className="flex items-baseline justify-between mb-7"><h3 className="font-display text-4xl text-white">Past events</h3><span className="section-kicker">Archive / {past.length.toString().padStart(2, '0')}</span></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">{past.map((event) => <EventCard event={event} key={event.id} />)}</div></div>
  </div></section>;
};
