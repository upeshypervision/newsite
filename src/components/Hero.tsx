import React, { useEffect, useState } from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';

interface HeroProps { onOpenJoin: () => void; }

export const Hero: React.FC<HeroProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);
  useEffect(() => { const update = () => setEvents(getManagedEvents()); void hydrateManagedContent(); window.addEventListener(CONTENT_EVENT, update); return () => window.removeEventListener(CONTENT_EVENT, update); }, []);
  const event = events.find((item) => item.isUpcoming) ?? events[0];
  return <section className="site-section hero-shell relative overflow-hidden pt-28 pb-8 sm:pt-36">
    <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
    <div className="section-wrap relative z-10">
      <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[.14em] text-[#9aabba]"><span>UPES / School of Computer Science</span><span className="hidden sm:block">Student-led since 2011</span></div>
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <p className="section-kicker">The technical club at UPES</p>
          <h1 className="hero-display mt-8 max-w-4xl text-white">Make<br /><span className="hero-word-blue">something</span><br />real<span className="text-[#ff7043]">.</span></h1>
          <p className="mt-10 max-w-xl text-lg leading-8 text-[#c2d0dc]">Hypervision is where students turn curiosity into working software, serious events, ambitious systems and a community that keeps making.</p>
          <div className="mt-8 flex flex-wrap gap-3"><a href="#events" className="editorial-button primary">See what&apos;s on</a><button onClick={onOpenJoin} className="editorial-button">Join the club</button></div>
        </div>
        <div className="lg:col-span-5">
          {event && <article className="hero-event noise overflow-hidden p-5 sm:p-6">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[.13em] text-[#b8eaff]"><span>Next up</span><span>{event.month} {event.day}</span></div>
            <div className="relative mt-5 aspect-[1.25] overflow-hidden"><img src={event.image} alt={event.title} className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-transparent to-transparent" /><p className="absolute bottom-4 left-4 right-4 text-[10px] font-mono uppercase tracking-widest text-[#b8eaff]">{event.category} / {event.location}</p></div>
            <h2 className="mt-6 max-w-md font-display text-3xl leading-tight text-white">{event.title}</h2><p className="mt-3 text-sm leading-6 text-[#b9cad8]">{event.subtitle}</p>
            {event.link && <a href={event.link} target="_blank" rel="noreferrer" className="editorial-button primary mt-6">Open event page</a>}
          </article>}
        </div>
      </div>
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 border-t border-white/15"><div className="py-5 border-r border-white/15"><span className="stat-number text-white">100+</span><span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#9aabba]">Active members</span></div><div className="py-5 pl-5 border-r border-white/15"><span className="stat-number text-white">50+</span><span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#9aabba]">Projects</span></div><div className="py-5 pl-5 border-r border-white/15"><span className="stat-number text-white">30+</span><span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#9aabba]">Events</span></div><div className="py-5 pl-5"><span className="stat-number text-[#ff7043]">15</span><span className="block mt-2 text-[10px] font-mono uppercase tracking-wider text-[#9aabba]">Years of making</span></div></div>
      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-mono uppercase tracking-[.12em] text-[#718598]"><span>{HYPERVISION_INFO.motto}</span><span>Dehradun, India</span></div>
    </div>
  </section>;
};
