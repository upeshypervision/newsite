/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LazyReveal } from './components/LazyReveal';
import { AdminPanel } from './components/AdminPanel';

// Code-split lazy loading of below-the-fold section components
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const EventsAndTimeline = lazy(() => import('./components/EventsAndTimeline').then(m => ({ default: m.EventsAndTimeline })));
const WhyHypervision = lazy(() => import('./components/WhyHypervision').then(m => ({ default: m.WhyHypervision })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const Team = lazy(() => import('./components/Team').then(m => ({ default: m.Team })));
const Partners = lazy(() => import('./components/Partners').then(m => ({ default: m.Partners })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const JoinModal = lazy(() => import('./components/JoinModal').then(m => ({ default: m.JoinModal })));

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  if (window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

  const handleOpenJoin = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoin = () => {
    setIsJoinModalOpen(false);
  };

  return (
    <div className="site-shell min-h-screen flex flex-col relative overflow-x-hidden">

      {/* Background ambient glass refraction light sources */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 hero-glow" />
      </div>

      {/* Top sticky navigation bar */}
      <Navbar onOpenJoin={handleOpenJoin} />

      {/* Main content flow with Lazy Loading and Scroll Reveal */}
      <main className="flex-1 relative z-10">
        <Hero onOpenJoin={handleOpenJoin} />

        <Suspense fallback={null}>
          <LazyReveal>
            <About />
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
        <Footer />
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
