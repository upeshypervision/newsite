import React, { useEffect, useMemo, useState } from 'react';
import { CONTENT_EVENT, getManagedFamily, ManagedFamilyMember } from '../data/contentStore';

export const Team: React.FC = () => {
  const [members, setMembers] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [selected, setSelected] = useState<ManagedFamilyMember | null>(null);
  const [filter, setFilter] = useState('all');
  useEffect(() => { const update = () => setMembers(getManagedFamily()); window.addEventListener(CONTENT_EVENT, update); return () => window.removeEventListener(CONTENT_EVENT, update); }, []);
  const categories = useMemo(() => ['all', ...Array.from(new Set(members.map((member) => member.category)))], [members]);
  const visible = filter === 'all' ? members : members.filter((member) => member.category === filter);
  const active = selected ?? visible[0];
  return <section id="team" className="site-section py-28"><div className="section-wrap">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-10 border-b rule"><div className="lg:col-span-7"><p className="section-kicker">04 — Hypervision family</p><h2 className="section-title">The people<br /><em className="text-[#9bbcff]">behind it.</em></h2></div><p className="section-intro lg:col-span-4 lg:justify-self-end">A moving group of builders, organisers and believers. Hover a portrait to meet the person behind the role.</p></div>
    <div className="mt-12 flex gap-5 overflow-x-auto border-b rule pb-4">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`shrink-0 text-[10px] font-mono uppercase tracking-widest ${filter === category ? 'text-[#b7ccf5]' : 'text-[#777a84]'}`}>{category}</button>)}</div>
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">{visible.map((member) => <button key={member.name} onMouseEnter={() => setSelected(member)} onFocus={() => setSelected(member)} onClick={() => setSelected(member)} className={`family-card aspect-[.78] text-left ${active?.name === member.name ? 'active' : ''}`}><div className="absolute inset-0 bg-[#252a35]" />{member.image ? <img src={member.image} alt={member.name} className="relative w-full h-full object-cover photo-mono" loading="lazy" /> : <div className="relative w-full h-full flex items-center justify-center font-display text-5xl text-[#9bbcff]">{member.initials}</div>}<div className="absolute z-10 bottom-4 left-4 right-3"><span className="block text-[9px] font-mono uppercase tracking-wider text-[#b8c9ed]">{member.role}</span><strong className="block mt-1 text-sm sm:text-base text-white font-medium">{member.name}</strong></div></button>)}</div>
    {active && <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t rule pt-8"><div className="md:col-span-5"><p className="section-kicker">Selected profile</p><h3 className="mt-4 font-display text-6xl text-white">{active.name}</h3><p className="mt-2 text-xs font-mono uppercase tracking-widest text-[#9bbcff]">{active.role} / {active.department}</p></div><blockquote className="md:col-span-6 md:col-start-7 text-2xl sm:text-3xl leading-tight text-[#d5d6da]">“{active.quote}”</blockquote></div>}
  </div></section>;
};
