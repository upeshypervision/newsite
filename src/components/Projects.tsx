import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS, Project } from '../data/hypervisionData';
import { TiltCard } from './TiltCard';

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the projects for seamless infinite auto-scroll wrap
  const displayProjects = [
    ...PROJECTS,
    ...PROJECTS,
    ...PROJECTS,
  ];

  // Auto-scroll loop using requestAnimationFrame with sub-pixel float accumulator
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animId: number;
    let lastTime: number | null = null;
    const pixelsPerSecond = 34; // gentle, readable glide speed
    let scrollPos = container.scrollLeft;

    const step = (now: number) => {
      if (!isPaused && container) {
        if (lastTime !== null) {
          const delta = (now - lastTime) / 1000;
          scrollPos += pixelsPerSecond * delta;

          // Seamless loop reset when scrolling past the first set of items
          const oneSetWidth = container.scrollWidth / 3;
          if (oneSetWidth > 0 && scrollPos >= oneSetWidth) {
            scrollPos -= oneSetWidth;
          }
          container.scrollLeft = scrollPos;
        }
        lastTime = now;
      } else {
        lastTime = null;
        if (container) {
          scrollPos = container.scrollLeft;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      setIsPaused(true);
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 2500);
    }
  };

  return (
    <section id="projects" className="site-section py-20 sm:py-28 bg-[#040812] text-white overflow-hidden">
      <div className="section-wrap">
        {/* Section Header with Arrow Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b rule mb-8">
          <div>
            <p className="section-kicker">05 // What We Ship</p>
            <h2 className="section-title">
              Working systems,<br />
              <span className="text-[#1ab7f2]">zero theory.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-4">
            <p className="text-xs sm:text-sm text-[#8fa2b6] max-w-sm">
              Interactive software, competition engines, and autonomous hardware engineered by UPES students. Click any card to inspect technical specs.
            </p>

            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleManualScroll('left')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#1ab7f2] bg-[#071322] flex items-center justify-center text-white hover:text-[#1ab7f2] transition-colors cursor-pointer"
                title="Scroll Left"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll('right')}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-[#1ab7f2] bg-[#071322] flex items-center justify-center text-white hover:text-[#1ab7f2] transition-colors cursor-pointer"
                title="Scroll Right"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* HORIZONTAL AUTO-SCROLLING POSTER TRACK */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 2000);
          }}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 select-none cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="w-[290px] sm:w-[320px] shrink-0"
            >
              <TiltCard maxTilt={8} className="h-full">
                <article
                  onClick={() => setSelected(project)}
                  className="group relative h-[470px] sm:h-[490px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#1ab7f2] cursor-pointer shadow-2xl transition-all duration-300 flex flex-col justify-between p-6 sm:p-7 text-left bg-[#071322] hover:shadow-[0_20px_45px_rgba(26,183,242,0.22)]"
                >
                  {/* Full-bleed system poster background */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* High contrast gradient overlay for legible text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050c] via-[#02050c]/70 to-[#02050c]/25" />

                  {/* Top Bar: System Tag & Status */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="bg-[#050c18]/90 text-[#1ab7f2] border border-[#1ab7f2]/40 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                      SYS // {project.number} &bull; {project.category.split(' ')[0]}
                    </span>
                    <span className="bg-white text-[#020813] font-bold text-[9px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                      Live System
                    </span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="relative z-10">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#1ab7f2] font-semibold mb-1 truncate">
                      {project.subtitle}
                    </p>

                    <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#1ab7f2] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs text-[#9ab0c4] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-white/15 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-[#1ab7f2] hover:bg-white text-[#020813] font-bold text-xs px-4 py-1.5 transition-all shadow-md cursor-pointer"
                      >
                        See specs &rarr;
                      </button>

                      <span className="text-[10px] font-mono text-[#8fa2b6] truncate max-w-[120px]">
                        {project.metrics?.split('·')[0] || 'Production'}
                      </span>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>

        {/* Quick status footer */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-[#597187]">
          <span>4 Production Systems Deployed</span>
          <span className="hidden sm:inline-block">Hover to pause &bull; Click card for full specs</span>
        </div>
      </div>

      {/* FULL TECHNICAL SPECS MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-[#020710]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-2xl w-full bg-[#071322] border border-[#1ab7f2]/50 p-6 sm:p-8 rounded-3xl relative shadow-2xl my-auto text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-bold">
                  {selected.category}
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {selected.title}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-wider text-[#788e9f]">
                  {selected.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/20 rounded-full shrink-0 cursor-pointer"
              >
                [Close &times;]
              </button>
            </div>

            <div className="mt-5 aspect-[16/9] overflow-hidden bg-[#040912] border border-white/10 rounded-2xl relative">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-3 left-3 bg-[#050c16]/90 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-white">
                SYS // {selected.number} &bull; {selected.category}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm leading-relaxed text-[#c0d4e6]">
                {selected.fullOverview || selected.description}
              </p>

              {selected.metrics && (
                <div className="mt-4 p-3 bg-[#050c18] border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[#788e9f] uppercase tracking-wider">Metrics</span>
                  <span className="text-[#1ab7f2] font-semibold">{selected.metrics}</span>
                </div>
              )}

              <div className="mt-5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f] block mb-2">
                  Architecture &amp; Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono uppercase tracking-wider text-[#c0d4e6] bg-[#050c16] border border-white/10 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-3">
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button primary text-xs flex-1 text-center rounded-full"
                  >
                    Open Live Deployment &rarr;
                  </a>
                )}
                {selected.github && (
                  <a
                    href={selected.github}
                    target="_blank"
                    rel="noreferrer"
                    className="editorial-button text-xs flex-1 text-center rounded-full"
                  >
                    Source Code on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
