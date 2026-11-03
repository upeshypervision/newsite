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
  <TiltCard maxTilt={8} className="h-full">
    <button
      onClick={onOpen}
      className="activity-card group text-left cursor-pointer p-0 block w-full h-full bg-[#081322] border border-white/10 hover:border-[#1ab7f2] transition-colors"
    >
      <div className="relative aspect-[1.7] overflow-hidden bg-[#040912]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover photo-mono group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-85" />
        <span className="absolute top-3 left-3 font-mono text-xs font-semibold text-[#1ab7f2] bg-[#050c16]/90 px-2 py-0.5 border border-[#1ab7f2]/30">
          SYS // 0{index + 1}
        </span>
        <span className="absolute bottom-3 left-4 text-[10px] font-mono uppercase tracking-widest text-[#9edcf8]">
          {project.category}
        </span>
      </div>

      <div className="p-6">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
          {project.subtitle}
        </p>
        <h3 className="mt-1 font-display text-2xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[#8fa2b6] line-clamp-2">
          {project.description}
        </p>
        <div className="mt-5 border-t border-white/10 pt-3 flex items-center justify-between gap-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#597187]">
            {project.metrics ?? 'Production system'}
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-[#1ab7f2] group-hover:text-white transition-colors">
            View specs &rarr;
          </span>
        </div>
      </div>
    </button>
  </TiltCard>
);

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="site-section py-20 sm:py-28 bg-[#050c16]">
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
            Interactive software, competition engines, and autonomous hardware engineered by UPES students. Hover cards for 3D physics.
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
            className="max-w-3xl w-full bg-[#081322] border border-[#1ab7f2]/40 p-6 sm:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
                  {selected.number} // {selected.category}
                </span>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-white">
                  {selected.title}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-[11px] font-mono uppercase tracking-widest text-[#8fa2b6] hover:text-white border border-white/20 px-3 py-1.5"
              >
                Close
              </button>
            </div>

            <div className="mt-6 aspect-video overflow-hidden border border-white/10 bg-[#040810]">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover photo-mono"
              />
            </div>

            <p className="mt-6 text-base leading-relaxed text-[#c2d0dc]">
              {selected.fullOverview}
            </p>

            <div className="mt-6 pt-5 border-t border-white/10">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#788e9f] mb-3">
                Technologies &amp; Architecture
              </span>
              <div className="flex flex-wrap gap-2">
                {selected.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="text-[11px] font-mono uppercase tracking-wider text-[#1ab7f2] bg-[#050c16] border border-[#1ab7f2]/30 px-2.5 py-1"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            {selected.link && (
              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="editorial-button primary mt-8 inline-flex"
              >
                Open Live Platform &rarr;
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
