import React from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

export const Footer: React.FC = () => {
  return (
    <>
      {/* Hack Club-style Pre-Footer Banner */}
      <section className="py-20 sm:py-24 bg-[#030710] border-t border-white/10 text-white relative overflow-hidden">
        {/* Subtle cyan grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1ab7f208_1px,transparent_1px),linear-gradient(to_bottom,#1ab7f208_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="section-wrap relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-12 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 bg-[#1ab7f2] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] font-semibold">
                  By Builders, For Builders &bull; Est. 2011
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                Build systems.<br />
                <span className="text-[#1ab7f2]">Ship code.</span>
              </h2>
              <p className="mt-5 text-sm sm:text-base text-[#8fa2b6] max-w-xl leading-relaxed">
                Whether you write embedded firmware, build distributed web platforms, train neural vision models, or arbitrate multi-track hackathons.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={HYPERVISION_INFO.socials.codeHustleLive}
                target="_blank"
                rel="noreferrer"
                className="editorial-button primary text-xs"
              >
                Launch Code Hustle &rarr;
              </a>
              <a
                href={HYPERVISION_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="editorial-button text-xs"
              >
                GitHub Org &rarr;
              </a>
              <a href="#top" className="editorial-button text-xs">
                Back to Top &uarr;
              </a>
            </div>
          </div>

          {/* Real-time Telemetry & Campus Coordinates Bar */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="border border-white/10 bg-[#060e1a] p-3 flex items-center gap-2.5">
              <span className="w-2 h-2 bg-[#1ab7f2] animate-ping" />
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#597187] block">Network Status</span>
                <span className="text-white font-semibold uppercase tracking-wider text-[11px]">ALL SYSTEMS OPERATIONAL</span>
              </div>
            </div>

            <div className="border border-white/10 bg-[#060e1a] p-3">
              <span className="text-[9px] uppercase tracking-widest text-[#597187] block">Campus Headquarters</span>
              <span className="text-[#c0d4e6] uppercase tracking-wider text-[11px]">UPES Bidholi &bull; Energy Acres</span>
            </div>

            <div className="border border-white/10 bg-[#060e1a] p-3">
              <span className="text-[9px] uppercase tracking-widest text-[#597187] block">Global Coordinates</span>
              <span className="text-[#c0d4e6] tracking-wider text-[11px]">30°24&apos;58&quot;N &bull; 77°58&apos;11&quot;E</span>
            </div>

            <div className="border border-white/10 bg-[#060e1a] p-3">
              <span className="text-[9px] uppercase tracking-widest text-[#597187] block">Society Tenet</span>
              <span className="text-[#1ab7f2] font-semibold uppercase tracking-wider text-[11px]">INNOVATE. COLLABORATE. ELEVATE.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hack Club-style Developer Directory Footer */}
      <footer className="bg-[#02050b] pt-16 pb-12 border-t border-white/10 text-[#8fa2b6]">
        <div className="section-wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
            {/* Branding Column */}
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-display text-3xl font-bold tracking-tight">
                  HYPERVISION<span className="text-[#1ab7f2]">.</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1ab7f2] bg-[#050c18] border border-[#1ab7f2]/40 px-2 py-0.5">
                  UPES Dehradun
                </span>
              </div>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#788e9f]">
                The flagship student technical innovation society at the School of Computer Science, UPES Dehradun. Active since 2011 with 15 years of continuous builder history.
              </p>
              <p className="mt-4 text-xs font-mono text-[#597187] leading-relaxed">
                Energy Acres, P.O. Bidholi via Prem Nagar,<br />
                Dehradun, Uttarakhand, India 248007
              </p>
              <div className="mt-6">
                <a
                  href={`mailto:${HYPERVISION_INFO.email}`}
                  className="text-xs font-mono text-[#1ab7f2] hover:text-white transition-colors underline underline-offset-4"
                >
                  {HYPERVISION_INFO.email}
                </a>
              </div>
            </div>

            {/* Column 1: Ecosystem Initiatives */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-4 font-semibold">
                Initiatives
              </p>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a
                    href="https://code-hustle-11.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Code Hustle 24H
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    SwaYaan Drone Labs
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    SIH Matrix Engine
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Pehchaan Tech Fest
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Avritti Alumni Room
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Society Navigation */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-4 font-semibold">
                Architecture
              </p>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a href="/#about" className="hover:text-white transition-colors">
                    01 // Society
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    02 // What We Ship
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    03 // Calendar
                  </a>
                </li>
                <li>
                  <a href="/#team" className="hover:text-white transition-colors">
                    04 // The Family
                  </a>
                </li>
                <li>
                  <a href="/#gallery" className="hover:text-white transition-colors">
                    05 // Visual Arena
                  </a>
                </li>
                <li>
                  <a href="/board" className="text-[#1ab7f2] hover:text-white transition-colors">
                    Executive Board &rarr;
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Communication Channels */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-4 font-semibold">
                Channels
              </p>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a
                    href={HYPERVISION_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub [Org]
                  </a>
                </li>
                <li>
                  <a
                    href={HYPERVISION_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn [Network]
                  </a>
                </li>
                <li>
                  <a
                    href={HYPERVISION_INFO.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram [Media]
                  </a>
                </li>
                <li>
                  <a href="/admin" className="text-[#597187] hover:text-[#1ab7f2] transition-colors">
                    CMS Admin Desk
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-white transition-colors">
                    Event Archives
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Compliance & Legal */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-4 font-semibold">
                Compliance
              </p>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors text-white font-medium">
                    Liability Disclaimer
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    No-Warranty Policy
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Sponsor Releases
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Student Welfare
                  </a>
                </li>
                <li>
                  <span className="text-[#597187]">UPES SoCS Charter</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Liability Box (Explicit Legal Protection per user instructions) */}
          <div className="mt-10 p-5 border border-white/10 bg-[#040810] text-[#788e9f] text-[11px] leading-relaxed font-mono">
            <strong className="text-white block uppercase tracking-wider mb-1.5">
              LEGAL LIABILITY DISCLAIMER &amp; INDEMNITY WAIVER:
            </strong>
            UPES Hypervision is an independent student technical society under the School of Computer Science, University of Petroleum and Energy Studies (UPES), Dehradun. UPES Hypervision, UPES administration, faculty advisors, student leadership, event organizers, and corporate sponsors explicitly disclaim all warranties and assume no legal or financial liability for any direct, indirect, incidental, or consequential damages resulting from participation in hackathons, hardware prototypes, code deployments, external dependencies, or third-party sponsor offerings. Full legally binding terms are codified at{' '}
            <a href="/privacy" className="text-[#1ab7f2] underline underline-offset-2 hover:text-white">
              hypervision.in/privacy
            </a>.
          </div>

          {/* Bottom Copyright Strip */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[#597187]">
            <span>&copy; 2011 &ndash; 2026 UPES Hypervision &bull; All Rights Reserved</span>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy &amp; Terms
              </a>
              <a href="/board" className="hover:text-white transition-colors">
                Society Roster
              </a>
              <a href="/events" className="hover:text-white transition-colors">
                Archive Log
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};