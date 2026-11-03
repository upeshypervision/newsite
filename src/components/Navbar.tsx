import React, { useEffect, useState } from 'react';
import { HypervisionLogo } from './HypervisionLogo';

interface NavbarProps {
  onOpenJoin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    ['About', '/#about'],
    ['Activity', '/#projects'],
    ['Events', '/#events'],
    ['Board', '/board'],
    ['Privacy', '/privacy'],
  ];

  return (
    <header className={`fixed z-40 top-0 inset-x-0 transition-colors duration-200 ${scrolled ? 'glass-nav' : 'bg-[#050c16]/80'}`}>
      <div className="section-wrap h-[76px] flex items-center justify-between gap-8">
        <a href="/" className="flex items-center gap-3 text-white no-underline shrink-0 group">
          <HypervisionLogo size={32} />
          <span className="font-display font-bold text-lg tracking-[-.03em] uppercase">
            hypervision<span className="text-[#1ab7f2]">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[11px] font-mono uppercase tracking-[.12em] text-[#8fa2b6] hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="/admin"
            className="text-[10px] font-mono uppercase tracking-[.14em] text-[#597187] hover:text-[#1ab7f2] transition-colors"
          >
            Admin
          </a>
          <button
            onClick={onOpenJoin}
            className="editorial-button primary !min-h-[40px] !px-5 text-[11px]"
          >
            Join the club
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[11px] font-mono uppercase tracking-widest text-white border border-white/20 px-3 py-2"
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-[#050c16] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-[12px] font-mono uppercase tracking-widest text-[#a8b8c8] hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href="/admin"
            onClick={() => setOpen(false)}
            className="text-[12px] font-mono uppercase tracking-widest text-[#597187]"
          >
            Admin Panel
          </a>
          <button
            onClick={() => {
              setOpen(false);
              onOpenJoin?.();
            }}
            className="editorial-button primary w-full text-center mt-2"
          >
            Join the club
          </button>
        </nav>
      )}
    </header>
  );
};
