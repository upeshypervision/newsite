import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTENT_EVENT, getManagedFamily, hydrateManagedContent, ManagedFamilyMember } from '../data/contentStore';

export const Team: React.FC = () => {
  const [members, setMembers] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [hovered, setHovered] = useState<ManagedFamilyMember | null>(null);
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
              Faculty advisors, software architects, avionics researchers, and operations leads. Hover any portrait to expand over the grid.
            </p>
            <a
              href="/board"
              className="text-xs font-mono uppercase tracking-widest text-[#1ab7f2] hover:text-white transition-colors"
            >
              View Official Executive Hierarchy &rarr;
            </a>
          </div>
        </div>

        {/* Filter bar with curvy pills */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setFilter(c.key);
                setHovered(null);
              }}
              className={`text-xs font-mono uppercase tracking-[.14em] px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                filter === c.key
                  ? 'border-[#1ab7f2] bg-[#1ab7f2] text-[#020813] font-bold shadow-md'
                  : 'border-white/10 text-[#788e9f] hover:text-white hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* INTERACTIVE FULL-GRID TAKEOVER CONTAINER */}
        <div
          className="mt-8 relative rounded-2xl overflow-hidden min-h-[380px]"
          onMouseLeave={() => setHovered(null)}
        >
          {/* THE GRID OF TINY PHOTOS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredMembers.map((member) => (
              <div
                key={member.name}
                onMouseEnter={() => setHovered(member)}
                onClick={() => setHovered(member)}
                className="group relative aspect-[3/4] overflow-hidden bg-[#071322] border border-white/10 hover:border-[#1ab7f2] rounded-xl transition-all duration-300 cursor-pointer shadow hover:shadow-[0_10px_25px_rgba(26,183,242,0.2)]"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#071322] font-display text-4xl font-bold text-[#1ab7f2]">
                    {member.initials}
                  </div>
                )}

                {/* Dark gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040912] via-transparent to-transparent opacity-90" />

                {/* Corner category tag */}
                <div className="absolute top-2 left-2">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-[#788e9f] bg-[#040912]/80 px-2 py-0.5 rounded-full border border-white/10">
                    {member.category.slice(0, 4)}
                  </span>
                </div>

                {/* Bottom name and role */}
                <div className="absolute inset-x-2.5 bottom-2.5 z-10">
                  <span className="block text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2] truncate">
                    {member.role}
                  </span>
                  <strong className="block text-xs font-semibold text-white tracking-tight truncate group-hover:text-white">
                    {member.name}
                  </strong>
                </div>
              </div>
            ))}
          </div>

          {/* ON HOVER: TAKES OVER THE ENTIRE GRID BY ANIMATION (Photo on left, details on right) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute inset-0 z-30 bg-[#050c18]/96 backdrop-blur-xl border border-[#1ab7f2]/50 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 shadow-2xl overflow-y-auto"
                onMouseEnter={() => setHovered(hovered)}
              >
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setHovered(null);
                  }}
                  className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/10 hover:border-white/30 rounded-full"
                >
                  [Close &times;]
                </button>

                {/* BIG PHOTO ON THE LEFT */}
                <div className="w-44 h-44 sm:w-64 sm:h-64 shrink-0 overflow-hidden bg-[#02050a] border border-[#1ab7f2]/40 rounded-2xl shadow-2xl relative">
                  {hovered.image ? (
                    <img
                      src={hovered.image}
                      alt={hovered.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-7xl font-bold text-[#1ab7f2]">
                      {hovered.initials}
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-[#050c16]/90 text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2] px-2.5 py-0.5 rounded-full border border-white/10">
                    {hovered.category}
                  </span>
                </div>

                {/* DETAILS ON THE RIGHT: Name, Position, Quotes, LinkedIn, GitHub */}
                <div className="flex-1 text-center md:text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#788e9f]">
                    {hovered.department || 'School of Computer Science, UPES'}
                  </span>

                  <h3 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mt-1">
                    {hovered.name}
                  </h3>

                  <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-[#1ab7f2] font-bold mt-1">
                    {hovered.role}
                  </p>

                  {/* Quote on right */}
                  <blockquote className="mt-4 text-sm sm:text-base italic leading-relaxed text-[#c2d0dc] border-l-2 border-[#1ab7f2] pl-4 text-left">
                    &ldquo;{hovered.quote || 'Innovate. Collaborate. Elevate.'}&rdquo;
                  </blockquote>

                  {/* Curvy Social Buttons */}
                  <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                    {hovered.linkedin && (
                      <a
                        href={hovered.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#1ab7f2] hover:bg-white text-[#020813] font-bold text-xs px-5 py-2 transition-all shadow-md"
                      >
                        LinkedIn Profile &rarr;
                      </a>
                    )}
                    {hovered.github && (
                      <a
                        href={hovered.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#081322] border border-white/20 hover:border-white text-white font-medium text-xs px-5 py-2 transition-all"
                      >
                        GitHub &rarr;
                      </a>
                    )}
                    <a
                      href="/board"
                      className="text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white transition-colors ml-2"
                    >
                      View Board Hierarchy &rarr;
                    </a>
                  </div>

                  <p className="mt-4 text-[10px] font-mono text-[#597187]">
                    Move mouse outside grid or click close to restore all 24 member cards
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section footer banner */}
        <div className="mt-8 p-4 border border-white/10 bg-[#060e18] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>Hover any tiny photo &bull; Blends over the grid with full profile &bull; 24 Active Core Members</span>
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