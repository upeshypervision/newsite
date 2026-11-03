import React, { useEffect, useState } from 'react';
import { HypervisionLogo } from './HypervisionLogo';

interface NavbarProps { onOpenJoin?: () => void; }

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [['About', '#about'], ['Work', '#projects'], ['Events', '#events'], ['Family', '#team'], ['Partners', '#sponsors']];
  return (
    <header className={`fixed z-40 top-0 inset-x-0 border-b transition-colors ${scrolled ? 'bg-[#101114]/95 backdrop-blur-md border-white/15' : 'border-transparent'}`}>
      <div className="section-wrap h-[76px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 text-white no-underline">
          <HypervisionLogo size={28} />
          <span className="font-mono text-[12px] font-medium tracking-[.14em]">HYPERVISION</span>
        </a>
        <nav className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => <a key={href} href={href} className="text-[11px] font-mono uppercase tracking-[.1em] text-[#9b9da5] hover:text-white transition-colors">{label}</a>)}
          <button onClick={onOpenJoin} className="editorial-button !min-h-[38px] !px-4">Apply</button>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-[11px] font-mono uppercase tracking-widest text-white border border-white/30 px-3 py-2" aria-expanded={open}>{open ? 'Close' : 'Menu'}</button>
      </div>
      {open && <nav className="md:hidden bg-[#101114] border-t border-white/10 px-5 py-4 flex flex-col gap-4">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="text-[12px] font-mono uppercase tracking-widest text-[#b5b6bc]">{label}</a>)}
        <button onClick={() => { setOpen(false); onOpenJoin?.(); }} className="editorial-button w-fit">Apply to join</button>
      </nav>}
    </header>
  );
};
