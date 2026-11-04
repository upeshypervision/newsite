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

  // Keyboard escape listener to close expanded card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHovered(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  const getFocusAreas = (category: string) => {
    switch (category) {
      case 'executive':
        return ['Executive Governance', 'Arbitration Matrices', 'Resource Allocation'];
      case 'technical':
        return ['Distributed Systems', 'Avionics & Firmware', 'Full-Stack Sprints'];
      case 'design':
        return ['Visual Systems', 'Brand Strategy', 'Interface Engineering'];
      case 'operations':
        return ['Event Logistics', 'Media Production', 'Sponsor Coordination'];
      case 'faculty':
        return ['Academic Mentorship', 'Research Strategy', 'Institutional Oversight'];
      default:
        return ['Student Engineering', 'Open Source', 'Hackathon Sprints'];
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hovered) return;
    const currentIndex = filteredMembers.findIndex((m) => m.name === hovered.name);
    const prevIndex = (currentIndex - 1 + filteredMembers.length) % filteredMembers.length;
    setHovered(filteredMembers[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hovered) return;
    const currentIndex = filteredMembers.findIndex((m) => m.name === hovered.name);
    const nextIndex = (currentIndex + 1) % filteredMembers.length;
    setHovered(filteredMembers[nextIndex]);
  };

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
              Faculty advisors, software architects, avionics researchers, and operations leads. Click or hover any portrait to inspect.
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

        {/* INTERACTIVE FULL-GRID CONTAINER */}
        <div
          className="mt-8 relative rounded-3xl overflow-hidden min-h-[420px]"
          onMouseLeave={() => setHovered(null)}
        >
          {/* THE GRID OF TINY PHOTOS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {filteredMembers.map((member) => (
              <div
                key={member.name}
                onMouseEnter={() => setHovered(member)}
                onClick={() => setHovered(member)}
                className="group relative aspect-[3/4] overflow-hidden bg-[#071322] border border-white/10 hover:border-[#1ab7f2] rounded-2xl transition-all duration-300 cursor-pointer shadow hover:shadow-[0_12px_28px_rgba(26,183,242,0.25)]"
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

          {/* EXPANDED MEMBER SHOWCASE (Richly populated, zero empty black void) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-30 bg-[#02060f]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
                onClick={() => setHovered(null)}
              >
                {/* Centered Curvy Spotlight Card */}
                <motion.div
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="max-w-4xl w-full bg-[#071322] border border-[#1ab7f2]/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] relative overflow-hidden my-auto"
                >
                  {/* Atmospheric cyan flare in card corner */}
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#1ab7f2]/15 blur-3xl pointer-events-none rounded-full" />

                  {/* Top Bar: Badges + Prev/Next Navigation + Close Button */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1ab7f2]/10 border border-[#1ab7f2]/40 text-[#1ab7f2] text-[10px] font-mono uppercase tracking-widest px-3 py-0.5 rounded-full font-semibold">
                        {hovered.category} // Active Builder
                      </span>
                      <span className="text-[#597187] text-[10px] font-mono uppercase tracking-wider hidden sm:inline-block">
                        UPES School of Computer Science
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Prev / Next controls */}
                      <button
                        onClick={handlePrev}
                        className="text-xs font-mono px-2.5 py-1 border border-white/10 hover:border-[#1ab7f2] rounded-full text-[#8fa2b6] hover:text-white transition-colors"
                        title="Previous Builder"
                      >
                        &larr; Prev
                      </button>
                      <button
                        onClick={handleNext}
                        className="text-xs font-mono px-2.5 py-1 border border-white/10 hover:border-[#1ab7f2] rounded-full text-[#8fa2b6] hover:text-white transition-colors"
                        title="Next Builder"
                      >
                        Next &rarr;
                      </button>
                      <button
                        onClick={() => setHovered(null)}
                        className="text-xs font-mono px-3 py-1 bg-[#050c18] border border-white/20 hover:border-white text-[#788e9f] hover:text-white rounded-full transition-colors ml-1"
                      >
                        [Close &times;]
                      </button>
                    </div>
                  </div>

                  {/* Main Grid: Big Photo on left, Rich Content on right */}
                  <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                    {/* BIG HIGH-RES PHOTO */}
                    <div className="w-48 h-56 sm:w-64 sm:h-72 shrink-0 overflow-hidden bg-[#02050a] border border-[#1ab7f2]/40 rounded-2xl shadow-xl relative">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-transparent opacity-60" />
                      <span className="absolute bottom-2.5 left-2.5 bg-[#050c16]/90 text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2] px-2.5 py-0.5 rounded-full border border-white/10">
                        {hovered.department || 'Hypervision Society'}
                      </span>
                    </div>

                    {/* RICH DETAILS ON THE RIGHT */}
                    <div className="flex-1 text-center md:text-left">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#788e9f] block">
                        Official Roster
                      </span>

                      <h3 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mt-1">
                        {hovered.name}
                      </h3>

                      <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-[#1ab7f2] font-bold mt-1">
                        {hovered.role}
                      </p>

                      {/* Perspective Quote Card */}
                      <div className="mt-4 p-3.5 sm:p-4 bg-[#050c18] border border-white/10 rounded-2xl">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#597187] block mb-1">
                          Perspective &bull; Builder Ethos
                        </span>
                        <blockquote className="text-xs sm:text-sm italic leading-relaxed text-[#c2d0dc] border-l-2 border-[#1ab7f2] pl-3 text-left">
                          &ldquo;{hovered.quote || 'Innovate. Collaborate. Elevate.'}&rdquo;
                        </blockquote>
                      </div>

                      {/* Focus Areas & Competencies */}
                      <div className="mt-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f] block mb-2">
                          Domain &amp; Society Focus
                        </span>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                          {getFocusAreas(hovered.category).map((area) => (
                            <span
                              key={area}
                              className="text-[10px] font-mono text-[#c0d4e6] bg-[#040912] border border-white/10 px-2.5 py-0.5 rounded-full"
                            >
                              &bull; {area}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Curvy Action Buttons */}
                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center md:justify-start gap-3">
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
                            className="rounded-full bg-[#050c18] border border-white/20 hover:border-white text-white font-medium text-xs px-5 py-2 transition-all"
                          >
                            GitHub Profile &rarr;
                          </a>
                        )}
                        <a
                          href="/board"
                          className="editorial-button text-xs rounded-full !px-4"
                        >
                          Full Hierarchy &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section footer banner */}
        <div className="mt-8 p-4 border border-white/10 bg-[#060e18] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
          <span>Hover or click any portrait &bull; Inspect detailed credentials &bull; 24 Active Core Members</span>
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