import React, { useState, Suspense, lazy } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Team = lazy(() => import('./Team').then((module) => ({ default: module.Team })));
const JoinModal = lazy(() => import('./JoinModal').then((module) => ({ default: module.JoinModal })));

interface BoardPageProps { onOpenJoin?: () => void; }

export const BoardPage: React.FC<BoardPageProps> = () => {
  const [joinOpen, setJoinOpen] = useState(false);
  return <div className="site-shell min-h-screen"><Navbar onOpenJoin={() => setJoinOpen(true)} /><main className="pt-28"><section className="section-wrap pb-14"><p className="section-kicker">Hypervision / Board</p><h1 className="mt-6 max-w-4xl font-display text-[clamp(64px,11vw,150px)] leading-[.8] tracking-[-.06em] text-white">The people<br /><em className="text-[#22d3ee]">who make it move.</em></h1><p className="mt-10 max-w-xl text-base leading-7 text-[#aeb0b6]">Faculty guidance at the top. Student leadership beneath it. A wider group of builders, organisers and collaborators carrying the work forward.</p></section><Suspense fallback={null}><Team /></Suspense></main><Footer />{joinOpen && <Suspense fallback={null}><JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} /></Suspense>}</div>;
};
