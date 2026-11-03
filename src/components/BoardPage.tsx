import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { JoinModal } from './JoinModal';
import { TEAM_MEMBERS, TeamMember } from '../data/hypervisionData';

interface BoardPageProps {
  onOpenJoin?: () => void;
}

const LeaderCard = ({ member }: { member: TeamMember }) => (
  <div className="bg-[#081322] border border-white/10 p-5 sm:p-6 group hover:border-[#1ab7f2] transition-colors">
    <div className="relative aspect-square w-full overflow-hidden bg-[#040810] border border-white/10 mb-5">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover photo-mono group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#060e18] font-display text-4xl font-bold text-[#1ab7f2]">
          {member.initials}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-70" />
    </div>

    <span className="text-[10px] font-mono uppercase tracking-[.14em] text-[#1ab7f2] block">
      {member.role}
    </span>
    <h4 className="mt-1 font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#1ab7f2] transition-colors">
      {member.name}
    </h4>
    {member.department && (
      <p className="mt-1 text-xs text-[#788e9f] font-mono uppercase tracking-wider line-clamp-1">
        {member.department}
      </p>
    )}

    {(member.linkedin || member.github) && (
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-3 text-xs font-mono uppercase tracking-wider">
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[#8fa2b6] hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        )}
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noreferrer"
            className="text-[#8fa2b6] hover:text-white transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    )}
  </div>
);

export const BoardPage: React.FC<BoardPageProps> = ({ onOpenJoin }) => {
  const [joinOpen, setJoinOpen] = useState(false);
  const openJoin = () => {
    setJoinOpen(true);
    onOpenJoin?.();
  };

  const faculty = TEAM_MEMBERS.filter((m) => m.category === 'faculty');
  const executive = TEAM_MEMBERS.filter((m) => m.category === 'executive');
  const technical = TEAM_MEMBERS.filter((m) => m.category === 'technical');
  const design = TEAM_MEMBERS.filter((m) => m.category === 'design');
  const operations = TEAM_MEMBERS.filter((m) => m.category === 'operations');
  const outreach = TEAM_MEMBERS.filter((m) => m.category === 'outreach');

  return (
    <div className="board-page min-h-screen bg-[#050c16] text-white flex flex-col">
      <Navbar onOpenJoin={openJoin} />

      <main className="flex-1 pt-32 pb-24">
        {/* Editorial Board Hero inspired by Hack Club */}
        <section className="section-wrap pb-16 border-b border-white/10">
          <p className="section-kicker">Governance &amp; Executive Directory</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[.9]">
            The people who make<br />
            <span className="text-[#1ab7f2]">Hypervision run.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#8fa2b6]">
            Inspired by open technical organizations like Hack Club: no honorary titles, no figureheads. Every person on this board builds code, runs 24-hour sprints, or drives the logistics of hundreds of participants.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={openJoin} className="editorial-button primary">
              Apply for Leadership
            </button>
            <a href="/#about" className="editorial-button">
              About the Society
            </a>
          </div>
        </section>

        {/* 1. Faculty Advisors */}
        <section className="section-wrap py-16 border-b border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
              01 // Institutional Guidance
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Faculty Leadership &amp; Advisory
            </h2>
            <p className="mt-2 text-sm text-[#8fa2b6]">
              Mentorship from the School of Computer Science (SoCS), UPES Dehradun.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <LeaderCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 2. Executive Apex */}
        <section className="section-wrap py-16 border-b border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
              02 // Executive Council
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Executive Board &amp; Operations Flow
            </h2>
            <p className="mt-2 text-sm text-[#8fa2b6]">
              Leading general society strategy, treasury, and cross-department collaboration.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {executive.map((member) => (
              <LeaderCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 3. Technical Directorate */}
        <section className="section-wrap py-16 border-b border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
              03 // Systems &amp; Software
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Technical Directorate &amp; Architecture
            </h2>
            <p className="mt-2 text-sm text-[#8fa2b6]">
              Building platform engines, SIH qualifier software, algorithms, and avionics firmware.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {technical.map((member) => (
              <LeaderCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 4. Design & Editorial */}
        <section className="section-wrap py-16 border-b border-white/10">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
              04 // Brand &amp; Creative
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Visual Systems, Typography &amp; Editorial
            </h2>
            <p className="mt-2 text-sm text-[#8fa2b6]">
              Directing identity, UI/UX systems, content architecture, and digital media.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {design.map((member) => (
              <LeaderCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* 5. Operations & PR */}
        <section className="section-wrap py-16">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
              05 // Execution &amp; Outreach
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Operations, Hackathons &amp; Ecosystem PR
            </h2>
            <p className="mt-2 text-sm text-[#8fa2b6]">
              Delivering flagship marathons, partner alliances, campus logistics, and external sponsorships.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...operations, ...outreach].map((member) => (
              <LeaderCard key={member.name} member={member} />
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {joinOpen && (
        <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
      )}
    </div>
  );
};
