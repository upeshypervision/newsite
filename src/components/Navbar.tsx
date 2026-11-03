import React, { useState, useEffect } from 'react';
import { HypervisionLogo } from './HypervisionLogo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenJoin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin: _onOpenJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Events", href: "#events" },
    { label: "Milestones", href: "#milestones" },
    { label: "Team", href: "#team" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Zone 1: Single text element / brand lockup */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
            aria-label="UPES HyperVision Home"
          >
            <HypervisionLogo size={30} />
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              HYPERVISION
            </span>
          </a>

          {/* Zone 2: Clean text navigation links inside subtle glass pill on desktop */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-wider text-neutral-300 px-6 py-2 rounded-full glass-pill">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-400 transition-colors relative py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Mobile menu toggle */}
          <div className="flex items-center">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white rounded glass-pill focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-neutral-950/90 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-300 hover:text-cyan-400 hover:bg-white/5 rounded-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
