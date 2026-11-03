import React, { useEffect, useState } from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';
import { TiltCard } from './TiltCard';

interface HeroProps {
  onOpenJoin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin }) => {
  const [events, setEvents] = useState<ManagedEvent[]>(getManagedEvents);

  useEffect(() => {
    const update = () => setEvents(getManagedEvents());
    void hydrateManagedContent();
    window.addEventListener(CONTENT_EVENT, update);
    return () => window.removeEventListener(CONTENT_EVENT, update);
  }, []);

  const event = events.find((item) => item.isUpcoming) ?? events[0];

  const stats = [
    {
      value: '100+',
      label: 'Active Builders',
      hint: 'Meet the team &rarr;',
      href: '/board',
    },
    {
      value: '50+',
      label: 'Production Systems',
      hint: 'Explore software &rarr;',
      href: '/#projects',
    },
    {
      value: '30+',
      label: 'Hackathons & Sprints',
      hint: 'View calendar &rarr;',
      href: '/#events',
    },
    {
      value: '15',
      label: 'Years of Legacy',
      hint: 'Browse archives &rarr;',
      href: '/events',
    },
  ];

  return (
    <section className="site-section hero-shell relative overflow-hidden pt-28 pb-16 sm:pt-36">
      {/* High-contrast hacker grid background */}
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Atmospheric blue flare */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#1ab7f2]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-wrap relative z-10">
        {/* Hack Club-style Ribbon Kicker */}
        <div className="inline-flex items-center gap-3 bg-[#081322] border border-[#1ab7f2]/40 px-3.5 py-1.5 mb-8">
          <span className="w-2 h-2 bg-[#1ab7f2] animate-ping" />
          <span className="text-[11px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-semibold">
            By Students, For Builders &bull; Est. 2011
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f] hidden sm:inline-block">
            SoCS, UPES Dehradun
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <h1 className="hero-display text-white font-bold tracking-tight uppercase">
              We build.<br />
              <span className="text-[#1ab7f2]">We ship.</span><br />
              No fluff<span className="text-[#1ab7f2]">.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#9ab0c4]">
              UPES Hypervision is an autonomous collective of student software engineers, avionics researchers, and community hackers. We don&apos;t build slide decks&mdash;we build competition arbiters, drone payloads, and production web systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#events" className="editorial-button primary">
                Explore Calendar &rarr;
              </a>
              <button onClick={onOpenJoin} className="editorial-button">
                Apply for Membership
              </button>
              <a
                href="https://github.com/upes-hypervision"
                target="_blank"
                rel="noreferrer"
                className="editorial-button text-[#1ab7f2] border-[#1ab7f2]/40 hover:bg-[#1ab7f2] hover:text-[#020813]"
              >
                GitHub [Org]
              </a>
            </div>
          </div>

          {/* Interactive 3D Flagship Card */}
          <div className="lg:col-span-5">
            {event && (
              <TiltCard maxTilt={10} className="w-full">
                <article className="hero-event p-6 border border-[#1ab7f2]/40 relative bg-[#081322]">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[.14em] text-[#1ab7f2] mb-4">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#1ab7f2] rounded-full" />
                      Live Flagship
                    </span>
                    <span className="bg-[#1ab7f2]/10 border border-[#1ab7f2]/30 px-2 py-0.5 text-white">
                      {event.month} {event.day ? `${event.day}, ` : ''}{event.year}
                    </span>
                  </div>

                  <div className="relative aspect-[1.4] overflow-hidden bg-[#040812] border border-white/10">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover photo-mono"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-80" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#9edcf8]">
                      {event.category} // {event.location}
                    </span>
                  </div>

                  <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#8fa2b6] line-clamp-2">
                    {event.subtitle || event.description}
                  </p>

                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noreferrer"
                      className="editorial-button primary w-full text-center mt-5 !min-h-[42px]"
                    >
                      Open Live Event &rarr;
                    </a>
                  )}
                </article>
              </TiltCard>
            )}
          </div>
        </div>

        {/* Interactive Click-to-Redirect Stats Matrix */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
          {stats.map((stat) => (
            <a
              key={stat.label}
              href={stat.href}
              className="group p-5 bg-[#081322]/60 border border-white/10 hover:border-[#1ab7f2] transition-all hover:-translate-y-1 block"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight group-hover:text-[#1ab7f2] transition-colors">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-mono uppercase tracking-[.12em] text-[#8fa2b6]">
                {stat.label}
              </div>
              <div className="mt-3 text-[10px] font-mono uppercase tracking-wider text-[#1ab7f2] opacity-0 group-hover:opacity-100 transition-opacity">
                {stat.hint}
              </div>
            </a>
          ))}
        </div>

        {/* Society Motto Bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#040810] border border-white/10 p-4 text-[11px] font-mono uppercase tracking-[.14em]">
          <div className="flex items-center gap-2 text-[#1ab7f2]">
            <span className="font-bold text-white">MOTTO:</span>
            <span>{HYPERVISION_INFO.motto}</span>
          </div>
          <div className="text-[#597187]">
            UPES Energy Acres &bull; Bidholi, Dehradun [30.4159&deg; N, 77.9669&deg; E]
          </div>
        </div>
      </div>
    </section>
  );
};
