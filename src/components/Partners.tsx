import React from 'react';
import { SPONSORS } from '../data/hypervisionData';

export const Partners: React.FC = () => {
  const sponsors = [...SPONSORS, ...SPONSORS];
  return <section id="sponsors" className="sponsor-strip py-7 overflow-hidden"><div className="section-wrap flex flex-col md:flex-row md:items-center gap-6"><div className="shrink-0 md:w-48"><p className="section-kicker">Supported by</p><p className="mt-2 text-sm text-[#d3e0e9]">People who give ideas room to grow.</p></div><div className="overflow-hidden flex-1"><div className="partner-track flex items-center">{sponsors.map((sponsor, index) => <div key={`${sponsor.name}-${index}`} className="w-[160px] sm:w-[190px] h-16 shrink-0 border-l border-white/10 flex items-center justify-center px-7"><img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo max-w-full max-h-10 object-contain" /></div>)}</div></div></div></section>;
};
