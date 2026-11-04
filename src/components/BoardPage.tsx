import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { JoinModal } from './JoinModal';
import { TeamMember } from '../data/hypervisionData';
import {
  CONTENT_EVENT,
  getManagedFamily,
  hydrateManagedContent,
  ManagedFamilyMember,
} from '../data/contentStore';
import { TiltCard } from './TiltCard';

interface BoardPageProps {
  onOpenJoin?: () => void;
}

const LeaderCard = ({ member }: { member: ManagedFamilyMember | TeamMember }) => (
  <TiltCard maxTilt={6} className="h-full">
    <div className="bg-[#081322] border border-white/10 p-5 sm:p-6 rounded-2xl group hover:border-[#1ab7f2] transition-all h-full flex flex-col justify-between shadow-lg hover:shadow-[0_15px_35px_rgba(26,183,242,0.15)]">
      <div>
        <div className="relative aspect-square w-full overflow-hidden bg-[#040810] border border-white/10 rounded-xl mb-4">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#060e18] font-display text-4xl font-bold text-[#1ab7f2]">
              {member.initials}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-60" />
          <span className="absolute bottom-2 left-2 bg-[#050c18]/90 text-[8px] font-mono uppercase tracking-widest text-[#1ab7f2] px-2 py-0.5 rounded-full border border-[#1ab7f2]/30">
            {member.category}
          </span>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-[.14em] text-[#1ab7f2] font-semibold block">
          {member.role}
        </span>
        <h4 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#1ab7f2] transition-colors">
          {member.name}
        </h4>
        {member.department && (
          <p className="mt-1 text-xs text-[#788e9f] font-mono line-clamp-1">
            {member.department}
          </p>
        )}
      </div>

      {(member.linkedin || member.github) && (
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#1ab7f2] hover:text-white bg-[#050c16] border border-white/10 hover:border-[#1ab7f2] px-3 py-1 rounded-full transition-colors text-[10px]"
            >
              LinkedIn &rarr;
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#8fa2b6] hover:text-white bg-[#050c16] border border-white/10 px-3 py-1 rounded-full transition-colors text-[10px]"
            >
              GitHub &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  </TiltCard>
);

export const BoardPage: React.FC<BoardPageProps> = ({ onOpenJoin }) => {
  const [members, setMembers] = useState<ManagedFamilyMember[]>(getManagedFamily);
  const [joinOpen, setJoinOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const update = () => setMembers(getManagedFamily());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  const openJoin = () => {
    setJoinOpen(true);
    onOpenJoin?.();
  };

  const faculty = members.filter((m) => m.category === 'faculty');
  const executive = members.filter((m) => m.category === 'executive');
  const technical = members.filter((m) => m.category === 'technical');
  const design = members.filter((m) => m.category === 'design');
  const operations = members.filter((m) => m.category === 'operations' || m.category === 'outreach');

  const sections = [
    { key: 'faculty', label: '01 // Faculty', title: 'Faculty Leadership & Advisory', desc: 'Mentorship from School of Computer Science (SoCS), UPES Dehradun.', list: faculty },
    { key: 'executive', label: '02 // Executive', title: 'Executive Council Apex', desc: 'Society governance, treasury management, and high-stakes operations.', list: executive },
    { key: 'technical', label: '03 // Technical', title: 'Technical Directorate & Systems', desc: 'Arbitration engines, avionics flight firmware with NIT & MeitY, web systems.', list: technical },
    { key: 'design', label: '04 // Design', title: 'Visual Systems & Editorial', desc: 'Brand direction, interface engineering, video, and design systems.', list: design },
    { key: 'operations', label: '05 // Operations', title: 'Operations & PR Directorate', desc: 'Campus logistics, partner sponsorships, 24-hour sprint arbitration.', list: operations },
  ];

  const filteredSections = activeTab === 'all' ? sections : sections.filter((s) => s.key === activeTab);

  return (
    <div className="board-page min-h-screen bg-[#040812] text-white flex flex-col">
      <Navbar onOpenJoin={openJoin} />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        {/* Editorial Board Hero */}
        <section className="section-wrap pb-12 border-b border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 bg-[#1ab7f2] rounded-full animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
              Society Governance &bull; Est. 2011
            </span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02] text-white max-w-4xl">
            The people who make<br />
            <span className="text-[#1ab7f2]">Hypervision run.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#9ab0c4]">
            Inspired by Hack Club: zero honorary titles, zero figureheads. Every leader on this board builds code, runs 24-hour sprints, or manages operations for hundreds of competing students.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={openJoin}
              className="editorial-button primary text-xs font-bold rounded-full !px-6"
            >
              Apply for Leadership &rarr;
            </button>
            <a
              href="/#about"
              className="editorial-button text-xs rounded-full !px-5"
            >
              About the Society
            </a>
          </div>

          {/* Mobile-Friendly Department Quick Switcher */}
          <div className="mt-10 pt-6 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                  : 'border-white/10 text-[#788e9f] hover:text-white'
              }`}
            >
              All Tiers ({TEAM_MEMBERS.length})
            </button>
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveTab(s.key)}
                className={`text-xs font-mono uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all shrink-0 cursor-pointer ${
                  activeTab === s.key
                    ? 'border-[#1ab7f2] bg-[#1ab7f2] text-black font-bold'
                    : 'border-white/10 text-[#788e9f] hover:text-white'
                }`}
              >
                {s.label.split('// ')[1]} ({s.list.length})
              </button>
            ))}
          </div>
        </section>

        {/* Department Tiers (Mobile-optimized grid: 1 col on mobile, 2 on tablet, 3-4 on desktop) */}
        {filteredSections.map((sec) => (
          <section key={sec.key} className="section-wrap py-12 sm:py-16 border-b border-white/10">
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
                {sec.label}
              </span>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                {sec.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#8fa2b6]">
                {sec.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {sec.list.map((member) => (
                <LeaderCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />

      {joinOpen && (
        <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
      )}
    </div>
  );
};