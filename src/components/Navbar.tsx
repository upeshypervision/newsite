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
        scrolled ? 'glass-nav py-2.5' : 'bg-transparent py-4'
      }`}
    >
      <div className="section-wrap flex items-center justify-between gap-6">
        {/* Hack Club-style Ribbon Flag Logo */}
        <a href="/" className="inline-flex items-center gap-2 group no-underline shrink-0">
          <div className="hack-flag text-xs sm:text-sm font-extrabold tracking-wider">
            HYPERVISION
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#788e9f] hidden lg:inline-block ml-1">
            UPES Dehradun
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[.14em] text-[#8fa2b6] hover:text-white transition-colors relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/admin"
            className="text-[10px] font-mono uppercase tracking-[.14em] text-[#597187] hover:text-[#1ab7f2] transition-colors"
          >
            Admin
          </a>
          <button
            onClick={onOpenJoin}
            className="editorial-button primary !min-h-[38px] !px-4 text-xs font-bold"
          >
            Join the club
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xs font-mono uppercase tracking-widest text-white border border-white/20 px-3 py-1.5"
          aria-expanded={open}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="md:hidden bg-[#050c16]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-4 mt-2">
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
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <a
              href="/admin"
              onClick={() => setOpen(false)}
              className="text-xs font-mono uppercase tracking-widest text-[#597187]"
            >
              CMS Admin
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onOpenJoin?.();
              }}
              className="editorial-button primary text-xs"
            >
              Join the club
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};