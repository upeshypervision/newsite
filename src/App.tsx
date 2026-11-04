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
const Team = lazy(() => import('./components/Team').then(m => ({ default: m.Team })));
const Gallery = lazy(() => import('./components/Gallery').then(m => ({ default: m.Gallery })));
const Partners = lazy(() => import('./components/Partners').then(m => ({ default: m.Partners })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const JoinModal = lazy(() => import('./components/JoinModal').then(m => ({ default: m.JoinModal })));
const EventsArchive = lazy(() => import('./components/EventsArchive').then(m => ({ default: m.EventsArchive })));
const BoardPage = lazy(() => import('./components/BoardPage').then(m => ({ default: m.BoardPage })));
const PrivacyPage = lazy(() => import('./components/PrivacyPage').then(m => ({ default: m.PrivacyPage })));

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleOpenJoin = () => {
    setIsJoinModalOpen(true);
  };

  const handleCloseJoin = () => {
    setIsJoinModalOpen(false);
  };

  if (window.location.pathname === '/admin') return <AdminPanel />;
  if (window.location.pathname === '/events') return <EventsArchive />;
  if (window.location.pathname === '/board') return <BoardPage onOpenJoin={handleOpenJoin} />;
  if (window.location.pathname === '/privacy') return <PrivacyPage />;

  return (
    <div id="top" className="site-shell min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Top sticky navigation bar */}
      <Navbar onOpenJoin={handleOpenJoin} />

      {/* Main content flow with Lazy Loading and Scroll Reveal */}
      <main className="flex-1 relative z-10">
        <Hero onOpenJoin={handleOpenJoin} />

        <Suspense fallback={null}>
          <LazyReveal>
            <Partners />
          </LazyReveal>

          <LazyReveal>
            <About />
          </LazyReveal>

          <LazyReveal>
            <EventsAndTimeline onOpenJoin={handleOpenJoin} />
          </LazyReveal>

          <LazyReveal>
            <Team />
          </LazyReveal>

          <LazyReveal>
            <Gallery />
          </LazyReveal>

          <LazyReveal>
            <Projects />
          </LazyReveal>
        </Suspense>
      </main>

      {/* Lazy Loaded Footer */}
      <Suspense fallback={<div className="h-32 bg-[#050c16] border-t border-white/10" />}>
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
