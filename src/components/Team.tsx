import React, { useEffect, useMemo, useState } from 'react';
import { CONTENT_EVENT, getManagedFamily, hydrateManagedContent, ManagedFamilyMember } from '../data/contentStore';

const MemberTile = ({
  member,
  active,
  onHover,
}: {
  member: ManagedFamilyMember;
  active: boolean;
  onHover: () => void;
}) => (
  <button
    onMouseEnter={onHover}
    onFocus={onHover}
    onClick={onHover}
    className={`family-card group aspect-square text-left cursor-pointer p-0 relative transition-all duration-300 ${
      active ? 'active ring-2 ring-[#1ab7f2] scale-[1.03] z-20' : 'opacity-85 hover:opacity-100 hover:scale-[1.02]'
    }`}
  >
    {member.image ? (
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover photo-mono"
        loading="lazy"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-[#071322] font-display text-3xl font-bold text-[#1ab7f2]">
        {member.initials}
      </div>
    )}

    {/* Subtle overlay metadata */}
    <div className="absolute inset-x-2 bottom-2 z-10">
      <span className="block text-[8px] font-mono uppercase tracking-widest text-[#1ab7f2] truncate">
        {member.role}
      </span>
      <strong className="block text-xs font-semibold text-white truncate">
        {member.name}
      </strong>
    </div>
  </button>
);

export const Team: React.FC = () => {
  const [members, setMembers] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [selected, setSelected] = useState<ManagedFamilyMember | null>(null);
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

  const active = selected ?? filteredMembers[0] ?? members[0];

  const categories = [
    { key: 'all', label: 'All Family' },
    { key: 'faculty', label: 'Faculty' },
    { key: 'executive', label: 'Executive' },
    { key: 'technical', label: 'Technical' },
    { key: 'design', label: 'Design' },
    { key: 'operations', label: 'Operations & PR' },
  ];

  return (
    <section id="team" className="site-section py-24 sm:py-32 bg-[#050c16]">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b rule">
          <div>
            <p className="section-kicker">04 // The Roster</p>
            <h2 className="section-title">
              The Hypervision<br />
              <span className="text-[#1ab7f2]">family.</span>
            </h2>
          </div>
          <p className="section-intro">
            From faculty advisors to technical heads, engineers, and operational coordinators. Hover any member to bring their story forward.
          </p>
        </div>

        {/* Filter bar */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setFilter(c.key);
                const nextMembers = c.key === 'all' ? members : members.filter((m) => m.category === c.key);
                if (nextMembers.length > 0) setSelected(nextMembers[0]);
              }}
              className={`text-[10px] font-mono uppercase tracking-[.14em] px-3 py-1.5 border transition-all ${
                filter === c.key
                  ? 'border-[#1ab7f2] bg-[#1ab7f2]/10 text-white'
                  : 'border-white/10 text-[#788e9f] hover:text-white hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Dynamic Focus Grid & Expanded Left-Photo Showcase */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Hover Zoom Card */}
          {active && (
            <aside className="lg:col-span-5 bg-[#081322] border border-[#1ab7f2]/30 lg:sticky lg:top-28 overflow-hidden shadow-2xl">
              <div className="relative aspect-[1.1] w-full overflow-hidden bg-[#040810]">
                {active.image ? (
                  <img
                    src={active.image}
                    alt={active.name}
                    className="w-full h-full object-cover photo-mono"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#071322] font-display text-7xl font-bold text-[#1ab7f2]">
                    {active.initials}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] bg-[#050c16]/90 px-2 py-1 border border-[#1ab7f2]/30">
                  {active.category} // {active.role}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <span className="text-[10px] font-mono uppercase tracking-[.16em] text-[#788e9f]">
                  Active Profile
                </span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  {active.name}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#1ab7f2]">
                  {active.department || 'Hypervision Society'}
                </p>

                <blockquote className="mt-6 text-base sm:text-lg italic leading-relaxed text-[#c2d0dc] border-l-2 border-[#1ab7f2] pl-4">
                  &ldquo;{active.quote || 'Innovate. Collaborate. Elevate.'}&rdquo;
                </blockquote>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-4">
                  {active.linkedin && (
                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono uppercase tracking-wider text-[#8fa2b6] hover:text-[#1ab7f2] transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  )}
                  {active.github && (
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-mono uppercase tracking-wider text-[#8fa2b6] hover:text-[#1ab7f2] transition-colors"
                    >
                      GitHub Profile
                    </a>
                  )}
                </div>
              </div>
            </aside>
          )}

          {/* Members Tile Matrix */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filteredMembers.map((member) => (
                <MemberTile
                  key={member.name}
                  member={member}
                  active={active?.name === member.name}
                  onHover={() => setSelected(member)}
                />
              ))}
            </div>

            <div className="mt-8 p-4 border border-white/10 bg-[#060e18] flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#788e9f]">
              <span>Roster updated continuously via CMS</span>
              <a href="/board" className="text-[#1ab7f2] hover:text-white transition-colors">
                View Full Society Hierarchy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
