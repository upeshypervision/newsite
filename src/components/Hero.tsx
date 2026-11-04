import React, { useState } from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';
import { TiltCard } from './TiltCard';
import { saveSignup } from '../data/contentStore';

interface HeroProps {
  onOpenJoin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin }) => {
  const [email, setEmail] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await saveSignup({ email, source: 'hero_newsletter' });
      setEmail('');
    }
    onOpenJoin();
  };

  const stats = [
    {
      value: '100+',
      label: 'Active Builders',
      href: '/board',
    },
    {
      value: '50+',
      label: 'Production Systems',
      href: '/#projects',
    },
    {
      value: '30+',
      label: 'Hackathons & Sprints',
      href: '/#events',
    },
    {
      value: '15',
      label: 'Years of Legacy',
      href: '/events',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#040812] text-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#1ab7f20a_1px,transparent_1px),linear-gradient(to_bottom,#1ab7f20a_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Atmospheric center cyan glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#1ab7f2]/10 blur-[120px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* LEFT SCATTER PHOTOS (Folder Document Pull-Out Spring Animation) */}
      <div className="hidden lg:block absolute left-3 xl:left-8 top-32 w-64 pointer-events-auto space-y-6 select-none z-10">
        {/* Top Left: Lab Coding */}
        <TiltCard maxTilt={10}>
          <div className="folder-card-left p-2 transform -rotate-6 w-56 rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-lg">
              <img
                src="/gallery/gallery_3.webp"
                alt="Late night lab sprint"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-[#040912]/90 text-[8px] font-mono uppercase tracking-widest text-[#1ab7f2] px-2 py-0.5 rounded-full border border-[#1ab7f2]/30">
                03:42 AM LABS
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Mid Left: Code Hustle */}
        <TiltCard maxTilt={10}>
          <div className="folder-card-left p-2 transform rotate-3 w-60 ml-4 rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-lg">
              <img
                src="/events/code_hustle_1.webp"
                alt="Code Hustle hackathon floor"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-[#040912]/90 text-[8px] font-mono uppercase tracking-widest text-white px-2 py-0.5 rounded-full border border-white/20">
                24H SPRINT FLOOR
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Bottom Left: Drone Tech */}
        <TiltCard maxTilt={10}>
          <div className="folder-card-left p-2 transform -rotate-3 w-52 rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-lg">
              <img
                src="/events/drone_tech.webp"
                alt="Autonomous drone hardware payload"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-[#040912]/90 text-[8px] font-mono uppercase tracking-widest text-[#9edcf8] px-2 py-0.5 rounded-full border border-[#1ab7f2]/30">
                SWAYAAN AVIONICS
              </span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* RIGHT SCATTER PHOTOS (Folder Document Pull-Out Bouncy Animation) */}
      <div className="hidden lg:block absolute right-3 xl:right-8 top-32 w-64 pointer-events-auto space-y-6 select-none z-10">
        {/* Top Right: Winner Podium */}
        <TiltCard maxTilt={10}>
          <div className="folder-card-right p-2 transform rotate-6 w-56 ml-auto rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-lg">
              <img
                src="/gallery/gallery_1.webp"
                alt="Hackathon winner celebration"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-[#040912]/90 text-[8px] font-mono uppercase tracking-widest text-white px-2 py-0.5 rounded-full border border-white/20">
                STAGE WINNERS
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Mid Right: SIH 330 Teams */}
        <TiltCard maxTilt={10}>
          <div className="folder-card-right p-2 transform -rotate-4 w-60 mr-4 rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-lg">
              <img
                src="/events/sih_1.webp"
                alt="Smart India Hackathon 330 teams"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-[#040912]/90 text-[8px] font-mono uppercase tracking-widest text-[#1ab7f2] px-2 py-0.5 rounded-full border border-[#1ab7f2]/30">
                330 TEAMS ARBITRATION
              </span>
            </div>
          </div>
        </TiltCard>

        {/* Bottom Right: Keynote Hall */}
        <TiltCard maxTilt={10}>
          <div className="folder-card-right p-2 transform rotate-3 w-52 ml-auto rounded-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-lg">
              <img
                src="/gallery/gallery_4.webp"
                alt="MAC Auditorium symposium"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-1.5 bg-[#040912]/90 text-[8px] font-mono uppercase tracking-widest text-white px-2 py-0.5 rounded-full border border-white/20">
                MAC AUDITORIUM
              </span>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* CENTER STAGE HERO CONTENT */}
      <div className="section-wrap relative z-20 max-w-3xl mx-auto text-center px-4 sm:px-6">
        {/* Hack Club-style Clean Announcement Link */}
        <div className="mb-6">
          <a
            href="#events"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#c0d4e6] hover:text-white transition-colors group"
          >
            <span className="text-amber-300">✨</span>
            <span>
              Check out <strong>Code Hustle 24H</strong>, UPES&apos;s flagship hackathon of the season
            </span>
            <span className="text-[#1ab7f2] group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>

        {/* Iconic Hack Club Bold Headline */}
        <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-white">
          Where students<br />
          <span className="bg-gradient-to-r from-[#1ab7f2] via-[#38bdf8] to-white bg-clip-text text-transparent">
            build cool stuff.
          </span>
        </h1>

        {/* Punchy Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#9ab0c4] leading-relaxed max-w-xl mx-auto">
          Hypervision is UPES Dehradun&apos;s flagship student technical society. The largest campus movement of autonomous drones, 24-hour hackathons, and production systems.
        </p>

        {/* Curvy Input / Join Box */}
        <div className="mt-8 max-w-md mx-auto">
          <form
            onSubmit={handleJoin}
            className="flex items-center bg-[#071322] border border-white/20 focus-within:border-[#1ab7f2] p-1.5 shadow-2xl transition-all rounded-full"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@stu.upes.ac.in"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder-[#597187] focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="editorial-button primary !min-h-[38px] !px-6 text-xs font-bold shrink-0 rounded-full"
            >
              Join!
            </button>
          </form>
          <p className="text-[11px] font-mono text-[#597187] mt-2.5">
            For all UPES engineers &amp; developers &bull; Open to all batches
          </p>
        </div>

        {/* Curvy Airmail Postcard Sticker Element */}
        <div className="mt-10 inline-block">
          <a
            href="#events"
            className="airmail-box px-6 py-4 inline-flex items-center gap-4 text-left group rounded-2xl"
          >
            <div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#597187] block">
                TO: you, a builder anywhere at UPES
              </span>
              <strong className="text-xs sm:text-sm font-display text-white group-hover:text-[#1ab7f2] transition-colors block mt-0.5">
                Explore 2026 Flagships &amp; Sprints &rarr;
              </strong>
            </div>
            <span className="bg-[#1ab7f2] text-[#020813] font-bold text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full shrink-0">
              Open Track
            </span>
          </a>
        </div>

        {/* Clean Interactive Stats Row */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <a
              key={stat.label}
              href={stat.href}
              className="group text-center transition-transform hover:-translate-y-0.5 p-2 rounded-xl"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-white group-hover:text-[#1ab7f2] transition-colors">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-wider text-[#788e9f] group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};