import React from 'react';
import { SPONSORS } from '../data/hypervisionData';

export const Partners: React.FC = () => {
  const sponsors = [...SPONSORS, ...SPONSORS];
  return <section id="sponsors" className="site-section py-24 overflow-hidden"><div className="section-wrap"><div className="flex flex-col md:flex-row md:items-end justify-between gap-6"><div><p className="section-kicker">04 — In good company</p><h2 className="section-title">Partners &<br /><em className="text-[#22d3ee]">sponsors.</em></h2></div><p className="section-intro">The people and organisations who give ambitious work more room to grow.</p></div></div><div className="mt-16 border-y rule overflow-hidden"><div className="partner-track flex items-center">{sponsors.map((sponsor, index) => <div key={`${sponsor.name}-${index}`} className="w-[220px] sm:w-[280px] h-36 shrink-0 border-r rule flex items-center justify-center p-8"><img src={sponsor.logo} alt={sponsor.name} className="max-w-full max-h-12 object-contain grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition" /></div>)}</div></div></section>;
};
