import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/hypervisionData';
import { TiltCard } from './TiltCard';

const ActivityCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => (
  <TiltCard maxTilt={6} className="h-full">
    <article
      onClick={onOpen}
      className="group relative overflow-hidden bg-[#071322] border border-white/10 hover:border-[#1ab7f2] rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] cursor-pointer transition-all duration-300 shadow-xl hover:shadow-[0_20px_45px_rgba(26,183,242,0.18)] text-left"
    >
      {/* Background graphic overlay */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/85 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] font-bold">
            SYS // 0{index + 1} &bull; {project.category}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#1ab7f2] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-[#9ab0c4] leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <p className="mt-1 text-[11px] font-mono text-[#597187]">
          {project.metrics || 'Production deployment'}
        </p>
      </div>

      {/* Bottom Bar: Curvy Button on left, Pill on right (Image 2 style) */}
      <div className="relative z-10 mt-6 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div>
          <button
            type="button"
            className="rounded-full bg-[#1ab7f2] hover:bg-white text-[#020813] font-bold text-xs px-5 py-2 transition-all shadow-md"
          >
            See specs &rarr;
          </button>
          <span className="block text-[9px] font-mono text-[#597187] mt-1">
            Production ready
          </span>
        </div>

        <div className="bg-white text-[#020813] font-bold text-[10px] font-mono uppercase tracking-wider px-3.5 py-1 rounded-full shadow">
          Live System
        </div>
      </div>
    </article>
  </TiltCard>
);

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="site-section py-20 sm:py-28 bg-[#040812]">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b rule">
          <div>
            <p className="section-kicker">02 // What We Ship</p>
            <h2 className="section-title">
              Working systems,<br />
              <span className="text-[#1ab7f2]">zero theory.</span>
            </h2>
          </div>
          <p className="section-intro">
            Interactive software, competition engines, and autonomous hardware engineered by UPES students. Click any card to inspect technical specs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <ActivityCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-[#020710]/90 backdrop-blur-md p-5 sm:p-10 overflow-y-auto flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-3xl w-full bg-[#081322] border border-[#1ab7f2]/40 p-6 sm:p-10 relative rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2]">
                  {selected.category}
                </span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {selected.title}
                </h3>
                <p className="mt-1 text-sm font-mono uppercase tracking-wider text-[#788e9f]">
                  {selected.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/20 rounded-full"
              >
                [Close &times;]
              </button>
            </div>

            <div className="mt-6 aspect-[2/1] overflow-hidden bg-[#040912] border border-white/10 rounded-2xl">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6">
              <p className="text-sm leading-relaxed text-[#c0d4e6]">
                {selected.fullOverview || selected.description}
              </p>

              {selected.metrics && (
                <div className="mt-5 p-3.5 bg-[#050c18] border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[#788e9f] uppercase tracking-wider">Metrics</span>
                  <span className="text-[#1ab7f2] font-semibold">{selected.metrics}</span>
                </div>
              )}

              <div className="mt-6">
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

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-3">
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