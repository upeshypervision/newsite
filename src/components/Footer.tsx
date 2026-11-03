import React from 'react';
import { HypervisionLogo } from './HypervisionLogo';
import { HYPERVISION_INFO } from '../data/hypervisionData';
import { Github, Linkedin, Instagram, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenJoin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenJoin: _onOpenJoin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950/80 backdrop-blur-2xl border-t border-white/[0.08] pt-16 pb-12 text-neutral-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Brand & Affiliation Column */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <HypervisionLogo size={36} />
              <div>
                <span className="font-display text-lg font-bold text-white tracking-tight uppercase block leading-none">
                  UPES HyperVision
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  School of Computer Science, Estd. 2011
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md pt-2">
              {HYPERVISION_INFO.tagline} A student-driven technical society translating theoretical research into sovereign engineering execution.
            </p>

            <div className="pt-2 text-xs font-mono text-neutral-400 space-y-1">
              <div>UPES Bidholi Campus, Energy Acres, Prem Nagar</div>
              <div>Dehradun, Uttarakhand 248007, India</div>
            </div>
          </div>

          {/* External Links & Socials */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
              Direct Channels & Outreach
            </span>
            <p className="text-xs text-neutral-400 font-light">
              Connect with our technical directorate, faculty advisors, and event logistics team.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={HYPERVISION_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass-pill text-neutral-400 hover:text-white hover:border-cyan-400/50 rounded-sm transition-colors"
                aria-label="HyperVision LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={HYPERVISION_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass-pill text-neutral-400 hover:text-white hover:border-cyan-400/50 rounded-sm transition-colors"
                aria-label="HyperVision GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={HYPERVISION_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 glass-pill text-neutral-400 hover:text-white hover:border-cyan-400/50 rounded-sm transition-colors"
                aria-label="HyperVision Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${HYPERVISION_INFO.email}`}
                className="p-2.5 glass-pill text-neutral-400 hover:text-white hover:border-cyan-400/50 rounded-sm transition-colors"
                aria-label="HyperVision Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs font-mono text-neutral-400">
              Inquiries: <a href={`mailto:${HYPERVISION_INFO.email}`} className="text-cyan-400 hover:underline">{HYPERVISION_INFO.email}</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <div>
            © 2026 UPES HyperVision · School of Computer Science, UPES Dehradun.
          </div>

          <div className="flex items-center gap-6">
            <span>Motto: "Innovate. Collaborate. Elevate."</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-pill hover:text-white hover:border-cyan-400/50 rounded-sm transition-colors cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
