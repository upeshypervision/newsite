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
    { label: 'About', href: '/#about' },
    { label: 'Programs', href: '/#events' },
    { label: 'What We Ship', href: '/#projects' },
    { label: 'Family', href: '/#team' },
    { label: 'Board', href: '/board' },
    { label: 'Privacy', href: '/privacy' },
  ];

  return (
    <header
      className={`fixed z-50 top-0 inset-x-0 transition-all duration-200 ${
        scrolled ? 'glass-nav py-2.5 shadow-lg' : 'bg-transparent py-4'
      }`}
    >
      <div className="section-wrap flex items-center justify-between gap-6">
        {/* Real Hypervision Logo + HYPERVISION text on right */}
        <a href="/" className="inline-flex items-center gap-3 group no-underline shrink-0">
          <HypervisionLogo size={36} />
          <div className="flex flex-col">
            <span className="font-display font-black text-xl tracking-tight text-white uppercase group-hover:text-[#1ab7f2] transition-colors leading-none">
              HYPERVISION<span className="text-[#1ab7f2]">.</span>
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[.18em] text-[#788e9f] mt-0.5 hidden sm:inline-block">
              UPES Dehradun
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[.14em] text-[#8fa2b6] hover:text-white transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Curvy Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/#join"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="editorial-button primary !min-h-[38px] !px-5 text-xs font-bold rounded-full no-underline cursor-pointer"
          >
            Join the club
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xs font-mono uppercase tracking-widest text-white border border-white/20 px-3.5 py-1.5 rounded-full"
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="md:hidden bg-[#050c16]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4 mt-2 rounded-b-2xl">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-xs font-mono uppercase tracking-widest text-[#c0d4e6] hover:text-white py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end">
            <a
              href="/#join"
              onClick={(e) => {
                setOpen(false);
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="editorial-button primary text-xs rounded-full w-full text-center no-underline cursor-pointer"
            >
              Join the club
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};