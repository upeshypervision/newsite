import React, { useEffect, useState } from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';
import { CONTENT_EVENT, getManagedEvents, hydrateManagedContent, ManagedEvent } from '../data/contentStore';

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

  return (
    <section className="site-section hero-shell relative overflow-hidden pt-28 pb-14 sm:pt-36">
      <div className="hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="section-wrap relative z-10">
        <div className="flex items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[.16em] text-[#788e9f]">
          <span>UPES / School of Computer Science</span>
          <span className="hidden sm:inline-block">Student-led engineering since 2011</span>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="section-kicker">The technical society at UPES</p>
            <h1 className="hero-display mt-6 max-w-4xl text-white">
              Make<br />
              <span className="hero-word-blue">something</span><br />
              real<span className="text-[#1ab7f2]">.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#a8bac9]">
              Hypervision is where students turn curiosity into working software, serious competition systems, autonomous avionics, and a community of builders who ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#events" className="editorial-button primary">
                Explore Calendar
              </a>
              <button onClick={onOpenJoin} className="editorial-button">
                Apply for Membership
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            {event && (
              <article className="hero-event p-6 border border-[#1ab7f2]/30 relative">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[.14em] text-[#1ab7f2]">
                  <span>Next Flagship</span>
                  <span>{event.month} {event.day}, {event.year}</span>
                </div>

                <div className="relative mt-5 aspect-[1.3] overflow-hidden bg-[#040810] border border-white/10">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover photo-mono"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050c16] via-transparent to-transparent opacity-80" />
                  <p className="absolute bottom-3 left-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#9edcf8]">
                    {event.category} / {event.location}
                  </p>
                </div>

                <h2 className="mt-5 font-display text-2xl sm:text-3xl font-bold leading-tight text-white">
                  {event.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6] line-clamp-2">
                  {event.subtitle || event.description}
                </p>

                {event.link && (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button primary w-full text-center mt-5 !min-h-[42px]"
                  >
                    Open Event Page
                  </a>
                )}
              </article>
            )}
          </div>
        </div>

        {/* Technical stats rule bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 border-t border-white/10">
          <div className="py-6 border-r border-white/10">
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">100+</span>
            <span className="block mt-2 text-[10px] font-mono uppercase tracking-[.12em] text-[#788e9f]">
              Active Builders
            </span>
          </div>
          <div className="py-6 pl-6 border-r border-white/10">
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">50+</span>
            <span className="block mt-2 text-[10px] font-mono uppercase tracking-[.12em] text-[#788e9f]">
              Production Systems
            </span>
          </div>
          <div className="py-6 pl-6 border-r border-white/10">
            <span className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">30+</span>
            <span className="block mt-2 text-[10px] font-mono uppercase tracking-[.12em] text-[#788e9f]">
              Hackathons & Sprints
            </span>
          </div>
          <div className="py-6 pl-6">
            <span className="font-display text-4xl sm:text-5xl font-bold text-[#1ab7f2] tracking-tight">15</span>
            <span className="block mt-2 text-[10px] font-mono uppercase tracking-[.12em] text-[#788e9f]">
              Years of Legacy
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3 text-[11px] font-mono uppercase tracking-[.12em] text-[#597187]">
          <span>{HYPERVISION_INFO.motto}</span>
          <span>School of Computer Science, UPES Dehradun</span>
        </div>
      </div>
    </section>
  );
};
