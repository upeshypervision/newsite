import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/hypervisionData';

const ProjectCard = ({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) => (
  <button onClick={onOpen} className="project-card group text-left">
    <div className="project-card-image relative aspect-[1.55] overflow-hidden bg-[#181a1e]">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover photo-mono group-hover:scale-105 transition duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent opacity-90" />
      <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white">0{index + 1} / {project.category}</span>
      <span className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-widest text-[#22d3ee]">Open case study →</span>
    </div>
    <div className="project-card-body border-x border-b border-white/15 p-6 sm:p-7">
      <p className="text-[10px] font-mono uppercase tracking-widest text-[#22d3ee]">{project.subtitle}</p>
      <h3 className="mt-3 font-display text-3xl leading-none text-white">{project.title}</h3>
      <p className="mt-4 text-sm leading-6 text-[#92949c]">{project.description}</p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4"><span className="text-[10px] font-mono uppercase tracking-wider text-[#777a84]">{project.metrics ?? 'Student-built system'}</span><span className="font-display text-2xl text-[#22d3ee]">{project.number}</span></div>
    </div>
  </button>
);

export const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  return <section id="projects" className="site-section py-24"><div className="section-wrap"><div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-8 border-b rule"><div className="lg:col-span-7"><p className="section-kicker">02 — Past activity</p><h2 className="mt-3 font-display text-5xl sm:text-7xl leading-none text-white">What we<br /><em className="text-[#22d3ee]">built.</em></h2></div><p className="section-intro lg:col-span-4 lg:justify-self-end">Clear work, clear outcomes. A selection of systems and experiments made by Hypervision members.</p></div><div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">{PROJECTS.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onOpen={() => setSelected(project)} />)}</div></div>{selected && <div className="fixed inset-0 z-50 bg-[#101114]/95 p-5 sm:p-10 overflow-y-auto" onClick={() => setSelected(null)}><div className="max-w-3xl mx-auto pt-10" onClick={(event) => event.stopPropagation()}><button onClick={() => setSelected(null)} className="text-[11px] font-mono uppercase tracking-widest text-[#aeb0b6] hover:text-white">Close project</button><img src={selected.image} alt={selected.title} className="w-full aspect-video object-cover photo-mono mt-8" /><p className="section-kicker mt-8">{selected.number} / {selected.category}</p><h3 className="mt-3 font-display text-6xl text-white">{selected.title}</h3><p className="mt-6 text-lg leading-8 text-[#b8bac1]">{selected.fullOverview}</p><div className="mt-8 pt-5 border-t rule flex flex-wrap gap-x-6 gap-y-3 text-[11px] font-mono uppercase tracking-wider text-[#22d3ee]">{selected.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>{selected.link && <a href={selected.link} target="_blank" rel="noreferrer" className="editorial-button primary mt-8">Open live platform</a>}</div></div>}</section>;
};
