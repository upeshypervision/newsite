import React, { useState } from 'react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <>
      {/* COMMUNITY PHOTO COLLAGE & "IMAGINE A WORLD WHERE YOU JOINED" SECTION */}
      <section className="relative bg-[#02050c] text-white overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-t border-white/10">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1ab7f208_1px,transparent_1px),linear-gradient(to_bottom,#1ab7f208_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 relative z-10">
          {/* TOP PHOTO ROW: Full-bleed panoramic student moments */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-3">
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
              <img
                src="/gallery/gallery_4.webp"
                alt="MAC Auditorium symposium crowd"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
              <img
                src="/events/sih_1.webp"
                alt="Smart India Hackathon 330 teams arbitration"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg hidden sm:block">
              <img
                src="/events/pehchaan_2.webp"
                alt="Annual tech and career festival crowd"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg hidden sm:block">
              <img
                src="/events/avritti_2.webp"
                alt="Alumni connect networking hall"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          {/* MAIN 3-COLUMN MOSAIC: Left Photos | Center Floating Card | Right Photos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
            {/* LEFT PHOTO COLUMN (3 cols) */}
            <div className="hidden lg:grid grid-cols-2 gap-3 lg:col-span-3">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/gallery/gallery_1.webp"
                  alt="Hackathon winner celebration on stage"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/gallery/gallery_3.webp"
                  alt="03:42 AM late night lab coding"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/events/drone_tech.webp"
                  alt="Autonomous drone avionics payload"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/events/avritti_1.webp"
                  alt="Alumni technical mentorship session"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

            {/* CENTER FLOATING CARD (6 cols) */}
            <div className="lg:col-span-6 w-full">
              <div className="bg-[#071322]/95 backdrop-blur-2xl border-2 border-white/15 hover:border-[#1ab7f2]/60 rounded-3xl p-6 sm:p-9 text-center shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative transition-all duration-300">
                {/* Heading */}
                <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.05]">
                  Imagine a world where you<br />
                  <span className="text-[#1ab7f2]">joined Hypervision:</span>
                </h2>

                {/* Center Featured Preview Window with Playful Banner Stickers */}
                <div className="mt-5 relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/20 bg-[#030712] shadow-2xl group">
                  <img
                    src="/events/code_hustle_1.webp"
                    alt="Code Hustle 24-hour hackathon floor"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02050c]/80 via-transparent to-[#02050c]/40" />

                  {/* Playful Handwritten & Sticker Elements */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1ab7f2] text-[#020813] font-display font-black text-xs sm:text-sm md:text-base px-5 sm:px-7 py-2 sm:py-2.5 rounded-full uppercase tracking-wider shadow-[0_10px_30px_rgba(26,183,242,0.5)] transform -rotate-3 border-2 border-white pointer-events-none select-none">
                    WELCOME TO HYPERVISION
                  </div>

                  {/* Tech annotations overlay */}
                  <span className="absolute top-2.5 left-2.5 bg-[#050c18]/90 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-white px-2.5 py-1 rounded-full border border-white/20">
                    03:42 AM SPRINTS &bull; LABS
                  </span>
                  <span className="absolute bottom-2.5 left-2.5 bg-[#050c18]/90 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#1ab7f2] px-2.5 py-1 rounded-full border border-[#1ab7f2]/30">
                    DRONE AVIONICS &bull; MEITY
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 bg-[#050c18]/90 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-white px-2.5 py-1 rounded-full border border-white/20">
                    330+ TEAMS
                  </span>
                </div>

                {/* Email Join Form */}
                <div className="mt-5 max-w-md mx-auto">
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center bg-[#040812] border border-white/20 focus-within:border-[#1ab7f2] p-1.5 shadow-2xl transition-all rounded-full"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@stu.upes.ac.in"
                      className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder-[#597187] focus:outline-none font-mono"
                    />
                    <button
                      type="submit"
                      className="editorial-button primary !min-h-[38px] !px-6 text-xs font-bold shrink-0 rounded-full cursor-pointer"
                    >
                      {submitted ? 'Joined!' : 'Join!'}
                    </button>
                  </form>
                </div>

                {/* Action Links & Terms */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="#events"
                    className="editorial-button primary text-xs !min-h-[36px] !px-5 rounded-full"
                  >
                    Explore current programs &rarr;
                  </a>
                  <a
                    href="/board"
                    className="editorial-button text-xs !min-h-[36px] !px-5 rounded-full"
                  >
                    Meet the Board
                  </a>
                </div>

                <p className="mt-4 text-[10px] sm:text-[11px] font-mono text-[#788e9f]">
                  For all UPES engineers &amp; developers &bull; Open to all batches
                </p>
              </div>
            </div>

            {/* RIGHT PHOTO COLUMN (3 cols) */}
            <div className="hidden lg:grid grid-cols-2 gap-3 lg:col-span-3">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/events/code_hustle_2.webp"
                  alt="Team collaborating with laptops"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/events/sih_2.webp"
                  alt="Judging panel and student teams"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/gallery/gallery_2.webp"
                  alt="Hardware workshop floor"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
                <img
                  src="/events/code_connect_1.webp"
                  alt="Computer lab programming workshop"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM PHOTO ROW: Full-bleed student initiatives */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-3">
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
              <img
                src="/events/code_hustle_1.webp"
                alt="Code Hustle hackathon floor builders"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg">
              <img
                src="/events/sih_poster.webp"
                alt="Smart India Hackathon national qualifier"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg hidden sm:block">
              <img
                src="/events/code_connect.webp"
                alt="Code connect mentorship series"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#071322] border border-white/10 group shadow-lg hidden sm:block">
              <img
                src="/events/pehchaan.webp"
                alt="Pehchaan technical festival"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* TECHNICAL BLUEPRINT BANNER TRANSITION STRIP (Generated CAD & Engineering Blueprint) */}
        <div className="mt-14 relative w-full overflow-hidden border-t border-b border-white/15">
          {/* Blueprint banner illustration graphic */}
          <div className="relative aspect-[21/9] sm:aspect-[24/7] max-h-[220px] w-full overflow-hidden bg-[#040812]">
            <img
              src="/assets/hypervision_blueprint_banner.jpg"
              alt="UPES Hypervision Autonomous Drone &amp; Systems Engineering Blueprint"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02050c] via-transparent to-[#02050c] opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020409] via-transparent to-transparent opacity-80" />

            {/* Overlaid Airmail Postcard Sticker */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="airmail-box px-6 py-3.5 inline-flex items-center gap-4 text-left group rounded-2xl bg-[#050c18]/95 backdrop-blur-md border-2 border-dashed border-[#1ab7f2]/60 shadow-2xl">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#788e9f] block">
                    HYPERVISION HQ &bull; DEHRADUN, UK &bull; EST. 2011
                  </span>
                  <strong className="text-xs sm:text-sm font-display text-white group-hover:text-[#1ab7f2] transition-colors block mt-0.5">
                    TO: you, a builder anywhere at UPES
                  </strong>
                </div>
                <a
                  href="#events"
                  className="bg-[#1ab7f2] hover:bg-white text-[#020813] font-bold text-[10px] font-mono uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all shrink-0 no-underline"
                >
                  Explore Flagships &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Wavy bottom SVG transition contour */}
          <svg
            className="w-full h-8 text-[#020409] fill-current block -mt-1"
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
          >
            <path d="M0,20 C320,40 420,0 720,20 C1020,40 1120,0 1440,20 L1440,40 L0,40 Z" />
          </svg>
        </div>
      </section>

      {/* MAIN DEVELOPER FOOTER */}
      <footer className="bg-[#020409] pt-14 pb-10 border-t border-white/10 text-[#8fa2b6]">
        <div className="section-wrap">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Left Brand Column */}
            <div className="lg:col-span-5">
              <a href="/" className="inline-flex items-center gap-3 group no-underline mb-4">
                <img
                  src="/logo.png"
                  alt="Hypervision"
                  className="w-10 h-10 object-contain rounded-full"
                />
                <span className="font-display font-black text-2xl tracking-tight text-white uppercase group-hover:text-[#1ab7f2] transition-colors">
                  HYPERVISION<span className="text-[#1ab7f2]">.</span>
                </span>
              </a>
              <p className="text-xs sm:text-sm text-[#9ab0c4] font-medium">
                For builders, by builders.
              </p>
              <p className="mt-2 text-xs text-[#788e9f] leading-relaxed max-w-sm">
                The premier student-led technical innovation society at the School of Computer Science, UPES Dehradun. Active since 2011.
              </p>
              <p className="mt-3 text-xs font-mono text-[#597187]">
                Bidholi Campus, Energy Acres, Dehradun 248007
              </p>

              {/* Social Channels with Vector SVG Glyphs */}
              <div className="mt-5 flex items-center gap-3">
                {/* GitHub */}
                <a
                  href={HYPERVISION_INFO.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="GitHub"
                  aria-label="GitHub Organization"
                >
                  <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={HYPERVISION_INFO.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={HYPERVISION_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="Instagram"
                  aria-label="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${HYPERVISION_INFO.email}`}
                  className="w-10 h-10 bg-[#071322] border border-white/15 hover:border-[#1ab7f2] hover:bg-[#1ab7f2] rounded-full flex items-center justify-center text-[#8fa2b6] hover:text-[#020813] transition-all shadow-md group"
                  title="Email Contact"
                  aria-label="Email Hypervision"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2 transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 1: Initiatives */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-3 font-semibold">
                Initiatives
              </p>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
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
                    SwaYaan Drones
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    SIH Matrix Engine
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Pehchaan Fest
                  </a>
                </li>
                <li>
                  <a href="/events" className="hover:text-white transition-colors">
                    Event Archives
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Society Navigation */}
            <div className="lg:col-span-2">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-3 font-semibold">
                Society
              </p>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a href="/#about" className="hover:text-white transition-colors">
                    About Society
                  </a>
                </li>
                <li>
                  <a href="/#projects" className="hover:text-white transition-colors">
                    What We Ship
                  </a>
                </li>
                <li>
                  <a href="/#events" className="hover:text-white transition-colors">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="/#team" className="hover:text-white transition-colors">
                    The Family
                  </a>
                </li>
                <li>
                  <a href="/board" className="text-[#1ab7f2] hover:text-white transition-colors">
                    Board Hierarchy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal & Resources */}
            <div className="lg:col-span-3">
              <p className="text-[10px] font-mono uppercase tracking-[.2em] text-[#1ab7f2] mb-3 font-semibold">
                Compliance &amp; Terms
              </p>
              <ul className="space-y-2 text-xs font-mono uppercase tracking-wider">
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors font-semibold text-white">
                    Privacy Policy &amp; Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy#liability" className="hover:text-white transition-colors">
                    Liability &amp; Warranty Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white transition-colors">
                    Sponsor Guidelines
                  </a>
                </li>
                <li>
                  <a href="/admin" className="text-[#597187] hover:text-[#1ab7f2] transition-colors">
                    CMS Admin Desk
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright strip */}
          <div className="mt-8 pt-2 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#597187]">
            <span>&copy; 2011 &ndash; 2026 UPES Hypervision &bull; School of Computer Science, UPES</span>
            <div className="flex items-center gap-4">
              <a
                href={HYPERVISION_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Open source on GitHub
              </a>
              <span>&bull;</span>
              <a href="#top" className="hover:text-white transition-colors">
                Back to top &uarr;
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
