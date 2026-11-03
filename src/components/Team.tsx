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
    <section
      id="team"
      className="site-section py-20 sm:py-28 bg-[#050c16] relative overflow-hidden"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b rule">
          <div>
            <p className="section-kicker">04 // The Roster</p>
            <h2 className="section-title">
              The Hypervision<br />
              <span className="text-[#1ab7f2]">family.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="section-intro">
              Faculty advisors, software architects, avionics researchers, and operations leads. Hover any card to view their profile.
            </p>
            <a
              href="/board"
              className="text-xs font-mono uppercase tracking-widest text-[#1ab7f2] hover:text-white transition-colors"
            >
              View Official Executive Hierarchy &rarr;
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setFilter(c.key);
                setHovered(null);
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

        {/* RESTING STATE: DENSE COLLAGE / MOSAIC GRID */}
        <div className="mt-8 relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredMembers.map((member) => {
              const isCurrent = hovered?.name === member.name;
              return (
                <div
                  key={member.name}
                  onMouseEnter={() => setHovered(member)}
                  onClick={() => setHovered(member)}
                  className={`group relative aspect-[3/4] overflow-hidden bg-[#071322] border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'border-[#1ab7f2] shadow-[0_0_20px_rgba(26,183,242,0.35)] scale-[1.02] z-20'
                      : 'border-white/10 hover:border-[#1ab7f2]/60 hover:scale-[1.01]'
                  }`}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isCurrent
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

                  {/* Minimal metadata corner tags */}
                  <div className="absolute top-2 left-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#788e9f] bg-[#040912]/80 px-1.5 py-0.5 border border-white/10">
                      {member.category.slice(0, 4)}
                    </span>
                  </div>

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

          {/* HOVER STATE: SLICK DRAWER SWIPES IN FROM THE LEFT */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                  mass: 0.8,
                }}
                className="absolute inset-y-0 left-0 z-40 w-full sm:w-[540px] md:w-[600px] bg-[#050c18]/95 backdrop-blur-xl border border-[#1ab7f2]/50 shadow-[25px_0_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
                onMouseEnter={() => setHovered(hovered)}
              >
                {/* Top bar with active tag and dismiss */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#1ab7f2] animate-ping" />
                    <span className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
                      Profile Showcase // {hovered.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHovered(null);
                    }}
                    className="text-[10px] font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-2 py-1 border border-white/10 hover:border-white/30"
                  >
                    [Close ✕]
                  </button>
                </div>

                {/* Main profile content: Big photo on left, details and quote on right */}
                <div className="my-auto py-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Photo on the left */}
                  <div className="sm:col-span-5 relative aspect-[3/4] overflow-hidden bg-[#040810] border border-[#1ab7f2]/40 shadow-xl">
                    {hovered.image ? (
                      <img
                        src={hovered.image}
                        alt={hovered.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#071322] font-display text-6xl font-bold text-[#1ab7f2]">
                        {hovered.initials}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050c18] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Name, position, and quote below */}
                  <div className="sm:col-span-7 flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f]">
                      {hovered.department || 'Hypervision Society'}
                    </span>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {hovered.name}
                    </h3>
                    <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#1ab7f2] font-semibold">
                      {hovered.role}
                    </p>

                    {/* Quote below */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#597187] block mb-1">
                        Perspective
                      </span>
                      <blockquote className="text-xs sm:text-sm italic leading-relaxed text-[#c2d0dc] border-l-2 border-[#1ab7f2] pl-3">
                        &ldquo;{hovered.quote || 'Innovate. Collaborate. Elevate.'}&rdquo;
                      </blockquote>
                    </div>

                    {/* Social profiles */}
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {hovered.linkedin && (
                        <a
                          href={hovered.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono uppercase tracking-wider text-white bg-[#0a182c] border border-white/10 hover:border-[#1ab7f2] px-2.5 py-1 transition-colors"
                        >
                          LinkedIn Profile &rarr;
                        </a>
                      )}
                      {hovered.github && (
                        <a
                          href={hovered.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono uppercase tracking-wider text-[#8fa2b6] bg-[#071322] border border-white/10 hover:border-white/30 px-2.5 py-1 transition-colors"
                        >
                          GitHub Profile &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer hints */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#597187]">
                  <span>Hover other photos to inspect</span>
                  <a
                    href="/board"
                    className="text-[#1ab7f2] hover:text-white transition-colors"
                  >
                    Executive Hierarchy &rarr;
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section footer banner */}
        <div className="mt-10 p-4 border border-white/10 bg-[#060e18] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>Hypervision Society Roster &bull; 24 Active Core Members</span>
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