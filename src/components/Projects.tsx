import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/hypervisionData';

const ActivityCard = ({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => (
  <button
    onClick={onOpen}
    className="activity-card group text-left cursor-pointer p-0 block w-full"
  >
    <div className="relative aspect-[1.55] overflow-hidden bg-[#040912]">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover photo-mono"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#081322] via-transparent to-transparent opacity-90" />
      <span className="absolute top-4 left-4 font-mono text-xs font-semibold text-[#1ab7f2] bg-[#050c16]/80 px-2 py-1 border border-[#1ab7f2]/30">
        0{index + 1}
      </span>
      <span className="absolute bottom-4 left-5 text-[10px] font-mono uppercase tracking-widest text-[#9edcf8]">
        {project.category}
      </span>
    </div>

    <div className="p-6 sm:p-7">
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2]">
        {project.subtitle}
      </p>
      <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-[#1ab7f2] transition-colors">
        {project.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#8fa2b6] line-clamp-2">
        {project.description}
      </p>
      <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between gap-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#597187]">
          {project.metrics ?? 'Production system'}
        </span>
        <span className="text-xs font-mono uppercase tracking-wider text-[#1ab7f2] group-hover:text-white transition-colors">
          View specs
        </span>
      </div>
    </div>
  </button>
);

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="site-section py-24 sm:py-32 bg-[#050c16]">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b rule">
          <div>
            <p className="section-kicker">02 // Engineering Portfolio</p>
            <h2 className="section-title">
              Things we<br />
              <span className="text-[#1ab7f2]">built & shipped.</span>
            </h2>
          </div>
          <p className="section-intro">
            Not slide decks or conceptual mockups. Real evaluation engines, flight firmware, and tournament matrices that handled hundreds of live users.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <h3 className="mt-2 font-display text-3xl sm:text-5xl font-bold text-white">
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
                Technologies & Architecture
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
                Open Live Platform
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
