import React, { useEffect, useMemo, useState } from 'react';
import { CONTENT_EVENT, getManagedFamily, hydrateManagedContent, ManagedFamilyMember } from '../data/contentStore';

export const Team: React.FC = () => {
  const [members, setMembers] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [activeMember, setActiveMember] = useState<ManagedFamilyMember | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const update = () => setMembers(getManagedFamily());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  const filteredMembers = useMemo(() => {
    if (filter === 'all') return members;
    return members.filter((m) => m.category === filter);
  }, [members, filter]);

  // Default showcase is activeMember, or the first executive member
  const currentShowcase = activeMember || filteredMembers[0] || members[0];

  const categories = [
    { key: 'all', label: 'All Family' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'executive', label: 'Executive' },
    { key: 'technical', label: 'Technical' },
    { key: 'design', label: 'Design' },
    { key: 'operations', label: 'Operations & PR' },
  ];

  return (
    <section id="team" className="site-section py-20 sm:py-28 bg-[#040812] text-white">
      <div className="section-wrap">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b rule">
          <div>
            <p className="section-kicker">04 // The Roster</p>
            <h2 className="section-title">
              The Hypervision<br />
              <span className="text-[#1ab7f2]">family.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="section-intro">
              Faculty advisors, software architects, avionics researchers, and operations leads. Hover any card to inspect their perspective.
            </p>
            <a
              href="/board"
              className="text-xs font-mono uppercase tracking-widest text-[#1ab7f2] hover:text-white transition-colors"
            >
              View Official Executive Hierarchy &rarr;
            </a>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setFilter(c.key);
                const nextMembers = c.key === 'all' ? members : members.filter((m) => m.category === c.key);
                if (nextMembers.length > 0) setActiveMember(nextMembers[0]);
              }}
              className={`text-[10px] font-mono uppercase tracking-[.14em] px-3 py-1.5 border transition-all cursor-pointer ${
                filter === c.key
                  ? 'border-[#1ab7f2] bg-[#1ab7f2]/10 text-white font-semibold'
                  : 'border-white/10 text-[#788e9f] hover:text-white hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* SPOTLIGHT STAGE BAR (No empty black void, seamlessly updates on hover) */}
        {currentShowcase && (
          <div className="mt-8 p-5 sm:p-6 bg-[#071322] border border-[#1ab7f2]/40 shadow-xl transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
              {/* Photo on left */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 overflow-hidden bg-[#02050a] border border-[#1ab7f2]/40 relative shadow-md">
                {currentShowcase.image ? (
                  <img
                    src={currentShowcase.image}
                    alt={currentShowcase.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-display text-4xl font-bold text-[#1ab7f2]">
                    {currentShowcase.initials}
                  </div>
                )}
                <span className="absolute bottom-1 left-1 bg-[#050c16]/90 text-[8px] font-mono uppercase tracking-widest text-[#1ab7f2] px-1 py-0.5 border border-white/10">
                  {currentShowcase.category}
                </span>
              </div>

              {/* Name, role, and quote */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
                      {currentShowcase.department || 'School of Computer Science, UPES'}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {currentShowcase.name}
                    </h3>
                    <p className="text-xs font-mono uppercase tracking-wider text-[#1ab7f2] font-semibold mt-0.5">
                      {currentShowcase.role}
                    </p>
                  </div>

                  {/* Social Profile links */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 sm:mt-0">
                    {currentShowcase.linkedin && (
                      <a
                        href={currentShowcase.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono uppercase tracking-wider text-white bg-[#0a1b2e] border border-white/10 hover:border-[#1ab7f2] px-2.5 py-1 transition-colors"
                      >
                        LinkedIn &rarr;
                      </a>
                    )}
                    {currentShowcase.github && (
                      <a
                        href={currentShowcase.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono uppercase tracking-wider text-[#8fa2b6] bg-[#050c16] border border-white/10 hover:border-white/30 px-2.5 py-1 transition-colors"
                      >
                        GitHub &rarr;
                      </a>
                    )}
                  </div>
                </div>

                {/* Perspective Quote */}
                <blockquote className="mt-3.5 text-xs sm:text-sm italic leading-relaxed text-[#c2d0dc] border-l-2 border-[#1ab7f2] pl-3 text-left">
                  &ldquo;{currentShowcase.quote || 'Innovate. Collaborate. Elevate.'}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* RESTING STATE: DENSE PHOTO COLLAGE GRID (All cards visible, unblocked) */}
        <div className="mt-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredMembers.map((member) => {
              const isSelected = currentShowcase?.name === member.name;
              return (
                <div
                  key={member.name}
                  onMouseEnter={() => setActiveMember(member)}
                  onClick={() => setActiveMember(member)}
                  className={`group relative aspect-[3/4] overflow-hidden bg-[#071322] border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-[#1ab7f2] shadow-[0_0_20px_rgba(26,183,242,0.4)] scale-[1.03] z-20'
                      : 'border-white/10 hover:border-[#1ab7f2]/60 hover:scale-[1.01]'
                  }`}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isSelected
                          ? 'grayscale-0 scale-105'
                          : 'grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 opacity-85 group-hover:opacity-100'
                      }`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#071322] font-display text-4xl font-bold text-[#1ab7f2]">
                      {member.initials}
                    </div>
                  )}

                  {/* Gradient shadow for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040912] via-transparent to-transparent opacity-90" />

                  {/* Category tag */}
                  <div className="absolute top-2 left-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#788e9f] bg-[#040912]/80 px-1.5 py-0.5 border border-white/10">
                      {member.category.slice(0, 4)}
                    </span>
                  </div>

                  {/* Name and role watermark */}
                  <div className="absolute inset-x-2.5 bottom-2.5 z-10">
                    <span className="block text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2] truncate">
                      {member.role}
                    </span>
                    <strong className="block text-xs font-semibold text-white tracking-tight truncate group-hover:text-white">
                      {member.name}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section footer banner */}
        <div className="mt-8 p-4 border border-white/10 bg-[#060e18] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>Hover any portrait to inspect their profile &bull; 24 Active Core Members</span>
          <a
            href="/board"
            className="text-[#1ab7f2] hover:text-white transition-colors"
          >
            Explore Complete Society Tree &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};