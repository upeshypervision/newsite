import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/hypervisionData';
import { ArrowUpRight, ExternalLink, Github, X, CheckCircle2 } from 'lucide-react';
import { HypervisionLogo } from './HypervisionLogo';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              03 / Engineering
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Featured Work
            </h2>
          </div>
          <div className="text-sm font-light text-neutral-400 max-w-sm">
            Student-engineered platforms operating at institutional scale—from national hackathon evaluation engines to sovereign avionics payloads.
          </div>
        </div>

        {/* Asymmetric Editorial Grid with Glassmorphic Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {PROJECTS.map((project, index) => {
            const colSpan = index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5';

            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`${colSpan} group cursor-pointer glass-card rounded-sm overflow-hidden flex flex-col justify-between`}
              >
                {/* Project Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent opacity-80" />

                  {/* Corner indicator */}
                  <div className="absolute top-4 left-4 font-mono text-xs text-white glass-pill px-2.5 py-1">
                    {project.number}
                  </div>

                  {project.category && (
                    <div className="absolute top-4 right-4 font-mono text-[11px] text-cyan-300 glass-pill px-2.5 py-1">
                      {project.category}
                    </div>
                  )}
                </div>

                {/* Project Metadata & Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-1">
                      {project.subtitle}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-neutral-300/80 font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    {/* Unboxed tech metadata */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400">
                      {project.technologies.slice(0, 3).map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="group-hover:text-neutral-300 transition-colors">{tech}</span>
                          {tIdx < 2 && tIdx < project.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-neutral-700">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors shrink-0 ml-4">
                      <span>Explore</span>
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Project Modal Inspector with Deep Frosted Glass */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-modal rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2 text-neutral-300 hover:text-white glass-pill rounded-sm transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Visual Header */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
              
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 glass-pill px-3 py-1.5 rounded-sm">
                <HypervisionLogo size={22} />
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-200">
                  UPES HyperVision Project
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
                  {selectedProject.number} · {selectedProject.category}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white mt-1">
                  {selectedProject.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                  System Architecture & Overview
                </h4>
                <p className="text-neutral-200 leading-relaxed font-light text-base">
                  {selectedProject.fullOverview}
                </p>
              </div>

              {selectedProject.metrics && (
                <div className="p-4 glass-card rounded-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                      Production Benchmark
                    </span>
                    <span className="text-sm font-medium text-white">
                      {selectedProject.metrics}
                    </span>
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 glass-pill rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap gap-3 justify-end">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 glass-pill hover:bg-white/10 transition-colors rounded-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub Repo</span>
                  </a>
                )}

                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 transition-colors rounded-sm shadow-md"
                  >
                    <span>Launch Live Platform</span>
                    <ExternalLink className="w-4 h-4" />
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
