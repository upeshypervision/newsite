/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoadingScreen } from './components/LoadingScreen';
import { LazyReveal } from './components/LazyReveal';

// Code-split lazy loading of below-the-fold section components
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const EventsAndTimeline = lazy(() => import('./components/EventsAndTimeline').then(m => ({ default: m.EventsAndTimeline })));
const WhyHypervision = lazy(() => import('./components/WhyHypervision').then(m => ({ default: m.WhyHypervision })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const Team = lazy(() => import('./components/Team').then(m => ({ default: m.Team })));
const Partners = lazy(() => import('./components/Partners').then(m => ({ default: m.Partners })));
const JoinSection = lazy(() => import('./components/JoinSection').then(m => ({ default: m.JoinSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const JoinModal = lazy(() => import('./components/JoinModal').then(m => ({ default: m.JoinModal })));

// Frosted glass loading skeleton fallback for smooth transition
const SectionSkeleton: React.FC<{ label?: string }> = ({ label = "Loading Section" }) => (
  <div className="py-24 border-b border-white/[0.08] relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-4">
      <div className="space-y-3">
        <div className="h-3 w-28 bg-cyan-400/20 rounded-full animate-pulse" />
        <div className="h-10 w-64 bg-white/10 rounded-sm animate-pulse" />
      </div>
      <div className="h-4 w-40 bg-white/5 rounded-full hidden sm:block animate-pulse" />
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-64 glass-card rounded-sm p-6 flex flex-col justify-between animate-pulse">
        <div className="space-y-3">
          <div className="h-4 w-12 bg-white/10 rounded" />
          <div className="h-6 w-3/4 bg-white/15 rounded" />
          <div className="h-16 w-full bg-white/5 rounded" />
        </div>
        <div className="h-4 w-1/2 bg-white/10 rounded" />
      </div>
      <div className="h-64 glass-card rounded-sm p-6 flex flex-col justify-between animate-pulse">
        <div className="space-y-3">
          <div className="h-4 w-12 bg-white/10 rounded" />
          <div className="h-6 w-3/4 bg-white/15 rounded" />
          <div className="h-16 w-full bg-white/5 rounded" />
        </div>
        <div className="h-4 w-1/2 bg-white/10 rounded" />
      </div>
      <div className="h-64 glass-card rounded-sm p-6 flex flex-col justify-between animate-pulse hidden lg:flex">
        <div className="space-y-3">
          <div className="h-4 w-12 bg-white/10 rounded" />
          <div className="h-6 w-3/4 bg-white/15 rounded" />
          <div className="h-16 w-full bg-white/5 rounded" />
        </div>
        <div className="h-4 w-1/2 bg-white/10 rounded" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleOpenJoin = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoin = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-neutral-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Initial cinematic loading screen using the logo */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} minDurationMs={2400} />
      )}

      {/* Background ambient glass refraction light sources */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-5%] left-[-8%] w-[680px] h-[680px] bg-cyan-500/[0.12] rounded-full blur-[170px] animate-float-slow" />
        <div className="absolute top-[22%] right-[-10%] w-[750px] h-[750px] bg-indigo-600/[0.11] rounded-full blur-[190px] animate-float-reverse" />
        <div className="absolute top-[48%] left-[-12%] w-[800px] h-[800px] bg-blue-600/[0.10] rounded-full blur-[210px] animate-float-slow" />
        <div className="absolute top-[72%] right-[-8%] w-[650px] h-[650px] bg-teal-500/[0.11] rounded-full blur-[180px] animate-float-reverse" />
        <div className="absolute bottom-[-10%] left-[25%] w-[700px] h-[700px] bg-sky-600/[0.09] rounded-full blur-[200px]" />
      </div>

      {/* Top sticky navigation bar */}
      <Navbar onOpenJoin={handleOpenJoin} />

      {/* Main content flow with Lazy Loading and Scroll Reveal */}
      <main className="flex-1 relative z-10">
        <Hero onOpenJoin={handleOpenJoin} />

        <Suspense fallback={<SectionSkeleton label="About" />}>
          <LazyReveal>
            <About />
          </LazyReveal>

          <LazyReveal>
            <JoinSection onOpenJoin={handleOpenJoin} />
          </LazyReveal>

          <LazyReveal>
            <Projects />
          </LazyReveal>

          <LazyReveal>
            <EventsAndTimeline onOpenJoin={handleOpenJoin} />
          </LazyReveal>

          <LazyReveal>
            <WhyHypervision />
          </LazyReveal>

          <LazyReveal>
            <Gallery />
          </LazyReveal>

          <LazyReveal>
            <Team />
          </LazyReveal>

          <LazyReveal>
            <Partners />
          </LazyReveal>
        </Suspense>
      </main>

      {/* Lazy Loaded Footer */}
      <Suspense fallback={<div className="h-32 bg-neutral-950 border-t border-white/[0.08]" />}>
        <Footer onOpenJoin={handleOpenJoin} />
      </Suspense>

      {/* Lazy Loaded Join Application Modal */}
      {isJoinModalOpen && (
        <Suspense fallback={null}>
          <JoinModal isOpen={isJoinModalOpen} onClose={handleCloseJoin} />
        </Suspense>
      )}
    </div>
  );
}
