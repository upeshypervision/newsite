import React, { useEffect, useMemo, useState } from 'react';
import { CONTENT_EVENT, getManagedFamily, hydrateManagedContent, ManagedFamilyMember } from '../data/contentStore';

const MemberCard = ({ member, active, onSelect }: { member: ManagedFamilyMember; active: boolean; onSelect: () => void }) => (
  <button onMouseEnter={onSelect} onFocus={onSelect} onClick={onSelect} className={`family-card group aspect-square text-left ${active ? 'active' : ''}`}>
    {member.image ? <img src={member.image} alt={member.name} className="relative w-full h-full object-cover photo-mono" loading="lazy" /> : <div className="relative w-full h-full flex items-center justify-center font-display text-4xl text-[#22d3ee]">{member.initials}</div>}
    <div className="absolute z-10 inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity"><span className="block text-[8px] font-mono uppercase tracking-wider text-[#22d3ee]">{member.role}</span><strong className="block mt-1 text-xs text-white font-medium">{member.name}</strong></div>
  </button>
);

export const Team: React.FC = () => {
  const [members, setMembers] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [selected, setSelected] = useState<ManagedFamilyMember | null>(null);
  useEffect(() => { const update = () => setMembers(getManagedFamily()); void hydrateManagedContent(); window.addEventListener(CONTENT_EVENT, update); return () => window.removeEventListener(CONTENT_EVENT, update); }, []);
  const groups = useMemo(() => [
    { label: 'Faculty in-charge', members: members.filter((member) => member.category === 'faculty'), className: 'faculty' },
    { label: 'Executive board', members: members.filter((member) => member.category === 'executive'), className: 'leadership' },
    { label: 'Technical & creative leads', members: members.filter((member) => member.category === 'technical' || member.category === 'design'), className: 'departments' },
    { label: 'Operations, events & outreach', members: members.filter((member) => member.category === 'operations' || member.category === 'outreach'), className: 'members' },
  ], [members]);
  const active = selected ?? groups[0]?.members[0];
  return <section id="team" className="site-section py-28"><div className="section-wrap">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b rule"><div><p className="section-kicker">05 — Hypervision family</p><h2 className="section-title">The people<br /><em className="text-[#22d3ee]">behind it.</em></h2></div><p className="section-intro md:text-right">Faculty in-charges first. Then the people who carry the work forward. Hover a portrait to bring their story forward.</p></div>
    <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-7 family-stage">
        <div className="family-hierarchy">{groups.map((group) => <div key={group.label} className="family-row-wrap"><div className="mb-3 text-[10px] font-mono uppercase tracking-[.14em] text-[#777a84]">{group.label}</div><div className={`family-row ${group.className}`}>{group.members.map((member) => <MemberCard key={member.name} member={member} active={active?.name === member.name} onSelect={() => setSelected(member)} />)}</div></div>)}</div>
      </div>
      {active && <aside className="family-detail lg:col-span-5 lg:sticky lg:top-28 flex flex-col sm:flex-row lg:flex-col xl:flex-row overflow-hidden"><div className="relative sm:w-[42%] lg:w-full xl:w-[42%] shrink-0 min-h-[260px] sm:min-h-0 lg:min-h-[260px] xl:min-h-[470px]">{active.image ? <img src={active.image} alt={active.name} className="family-detail-image absolute inset-0 w-full h-full" /> : <div className="absolute inset-0 flex items-center justify-center bg-[#202735] font-display text-7xl text-[#22d3ee]">{active.initials}</div>}</div><div className="family-detail-copy"><p className="section-kicker">Selected profile</p><p className="mt-5 text-[10px] font-mono uppercase tracking-widest text-[#22d3ee]">{active.role}</p><h3 className="mt-2 font-display text-5xl leading-none text-white">{active.name}</h3><p className="mt-3 text-xs font-mono uppercase tracking-wider text-[#858891]">{active.department}</p><blockquote className="mt-12 text-2xl leading-tight text-[#d5d6da]">“{active.quote}”</blockquote></div></aside>}
    </div>
  </div></section>;
};
