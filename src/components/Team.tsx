/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { TEAM_MEMBERS, TeamMember } from '../data/hypervisionData';
import {
  Linkedin,
  Github,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  Cpu,
  Layers,
  Network,
  Users,
  Terminal,
  Palette,
  Calendar,
  Radio,
  X,
  Briefcase
} from 'lucide-react';
import { HypervisionLogo } from './HypervisionLogo';

export const Team: React.FC = () => {
  const [mobileFilter, setMobileFilter] = useState<'all' | 'executive' | 'tech' | 'creative' | 'ops' | 'faculty'>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredBranch, setHoveredBranch] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 1400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(85, Math.max(45, Math.floor(width / 18)));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 0.8,
      baseAlpha: Math.random() * 0.35 + 0.2,
      glow: Math.random() > 0.65,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseStep: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;
        p1.pulseStep += p1.pulseSpeed;

        if (p1.x < -10) p1.x = width + 10;
        if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        if (p1.y > height + 10) p1.y = -10;

        const currentAlpha = p1.baseAlpha + Math.sin(p1.pulseStep) * 0.15;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.glow
          ? `rgba(56, 189, 248, ${Math.min(1, currentAlpha + 0.35)})`
          : `rgba(34, 211, 238, ${Math.max(0.1, currentAlpha)})`;
        ctx.fill();

        if (p1.glow) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, 0.12)`;
          ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 135) * 0.18;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Safe helper to locate team member with fallbacks
  const getMember = (name: string, fallbackRole: string, category: TeamMember['category'], department: string): TeamMember => {
    const found = TEAM_MEMBERS.find((m) => m.name.toLowerCase() === name.toLowerCase());
    if (found) return found;
    return {
      name,
      role: fallbackRole,
      category,
      department,
      initials: name.split(' ').map((n) => n[0]).join('').slice(0, 2)
    };
  };

  // 1. Faculty Mentorship
  const virender = getMember('Dr. Virender Kadyan', 'Faculty Advisor', 'faculty', 'School of Computer Science, UPES');
  const bhavana = getMember('Dr. Bhavana Kaushik', 'Faculty Coordinator', 'faculty', 'School of Computer Science, UPES');

  // 2. Executive Leadership Apex
  const purva = getMember('Purva', 'President', 'executive', 'Executive Board');

  // 3. Executive Council
  const divyanshu = getMember('Divyanshu Gaur', 'General Secretary', 'executive', 'Organizational Affairs');
  const priya = getMember('Priya Mehta', 'Vice President', 'executive', 'Executive Council');
  const praanjal = getMember('Praanjal Jain', 'Treasurer', 'executive', 'Finance & Resource Allocation');

  // 4. Strategic Advisory & Directorate Leads
  const priyanshi = getMember('Priyanshi Singhi', 'Workflow Supervisor', 'executive', 'Operational Flow');
  const pranav = getMember('Pranav Nair', 'Strategic Branding Head', 'executive', 'Brand Strategy & Positioning');
  const tanish = getMember('Tanish Khandelwal', 'Social Media Advisory', 'design', 'Growth & Engagement');
  const yash = getMember('Yash Gupta', 'Tech Visionary', 'technical', 'Technical Directorate');

  // 5. Functional Department Pillars (Heads & Associates)
  const akshat = getMember('Akshat Agarwal', 'Design Head', 'design', 'Visual Systems & UI/UX');
  const misha = getMember('Misha', 'Associate Design Head', 'design', 'Brand Assets & Typography');

  const om = getMember('Om Agarwal', 'Technical Head', 'technical', 'Software & Systems Architecture');
  const siddhant = getMember('Siddhant Gupta', 'Associate Technical Head', 'technical', 'Platform Engineering');

  const manan = getMember('Manan Arora', 'Editorial Head', 'design', 'Publications & Content Architecture');
  const jahanvi = getMember('Jahanvi Sengar', 'Associate Editorial Head', 'design', 'Publications & Content Writing');

  const pramansh = getMember('Pramansh Praveen', 'Social Media Manager', 'design', 'Public Outreach & Media');
  const manasvi = getMember('Manasvi Soni', 'Associate Social Media Manager', 'design', 'Public Communications');

  // 6. Operations, Events & PR Clusters
  const anshul = getMember('Anshul Goel', 'Events Head', 'operations', 'Flagship Hackathons & Competitions');
  const atharv = getMember('Atharv Pandey', 'Associate Events Head', 'operations', 'Hackathons & Logistics');
  const disha = getMember('Disha Rastogi', 'Associate Events Head', 'operations', 'Event Management');

  const priyal = getMember('Priyal Sharma', 'PR Head', 'outreach', 'Institutional Relations');
  const abhay = getMember('Abhay Sachan', 'Associate PR Head', 'outreach', 'Ecosystem Collaborations');
  const preksha = getMember('Preksha Grover', 'Associate PR Head', 'outreach', 'Sponsorship & External Outreach');

  const saksham = getMember('Saksham Srivastava', 'Operations Head', 'operations', 'Logistical Infrastructure');
  const harsh = getMember('Harsh Kamboj', 'Associate Operations Head', 'operations', 'Field Execution');
  const namami = getMember('Namami Pandey', 'Associate Operations Head', 'operations', 'Resource Management');

  /**
   * Clean, Streamlined Interactive Node Component
   */
  const HierarchyNode = ({
    member,
    branchId = 'general',
    size = 'md',
    tierType = 'member',
    subtitle,
    className = '',
  }: {
    member: TeamMember;
    branchId?: string;
    size?: 'sm' | 'md' | 'lg' | 'apex';
    tierType?: 'faculty' | 'apex' | 'council' | 'head' | 'associate' | 'member';
    subtitle?: string;
    className?: string;
  }) => {
    const isHovered = hoveredNode === member.name;
    const isBranchHovered = hoveredBranch === branchId;
    const isDimmed = hoveredBranch !== null && !isBranchHovered;

    const sizeMap = {
      sm: {
        wrapper: 'w-36 sm:w-40 p-2 sm:p-2.5',
        avatar: 'w-10 h-10 sm:w-11 sm:h-11',
        name: 'text-[11px] sm:text-xs',
        role: 'text-[8.5px] sm:text-[9px]',
      },
      md: {
        wrapper: 'w-48 sm:w-52 p-3',
        avatar: 'w-14 h-14 sm:w-16 sm:h-16',
        name: 'text-xs sm:text-sm',
        role: 'text-[9.5px] sm:text-[10px]',
      },
      lg: {
        wrapper: 'w-52 sm:w-60 p-3.5',
        avatar: 'w-16 h-16 sm:w-18 sm:h-18',
        name: 'text-sm sm:text-base',
        role: 'text-[10px] sm:text-[11px]',
      },
      apex: {
        wrapper: 'w-60 sm:w-72 p-4',
        avatar: 'w-20 h-20 sm:w-22 sm:h-22',
        name: 'text-base sm:text-lg',
        role: 'text-xs',
      },
    }[size];

    const ringAccent = {
      faculty: 'ring-cyan-400/80 shadow-[0_0_16px_rgba(34,211,238,0.4)]',
      apex: 'ring-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.5)]',
      council: 'ring-sky-400 shadow-[0_0_16px_rgba(56,189,248,0.4)]',
      head: 'ring-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.3)]',
      associate: 'ring-neutral-400/40 shadow-[0_0_8px_rgba(255,255,255,0.1)]',
      member: 'ring-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.25)]',
    }[tierType];

    const badgeColor = {
      faculty: 'bg-cyan-500/15 text-cyan-300 border-cyan-400/30',
      apex: 'bg-amber-400/15 text-amber-300 border-amber-400/40',
      council: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
      head: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/25',
      associate: 'bg-white/5 text-neutral-400 border-white/10',
      member: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/20',
    }[tierType];

    return (
      <div
        onMouseEnter={() => {
          setHoveredNode(member.name);
          setHoveredBranch(branchId);
        }}
        onMouseLeave={() => {
          setHoveredNode(null);
          setHoveredBranch(null);
        }}
        onClick={() => setSelectedMember(member)}
        className={`group relative flex flex-col items-center text-center rounded-2xl bg-neutral-900/60 backdrop-blur-md border border-white/10 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none ${
          className || sizeMap.wrapper
        } ${isDimmed ? 'opacity-30 scale-95 filter blur-[0.4px]' : 'opacity-100'} ${
          isHovered
            ? 'scale-105 z-30 border-cyan-400 shadow-[0_12px_36px_rgba(34,211,238,0.3)] -translate-y-1'
            : 'hover:border-white/25 hover:bg-neutral-900/80'
        }`}
      >
        {/* Ambient Subtle Glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />

        {/* Circular Avatar Portal */}
        <div className={`relative ${sizeMap.avatar} rounded-full ring-2 ${ringAccent} p-0.5 mb-2.5 transition-transform duration-300 group-hover:scale-105`}>
          <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 border border-white/20">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top filter grayscale-[8%] group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-display font-extrabold text-white text-xs sm:text-sm bg-neutral-900">
                {member.initials}
              </div>
            )}
          </div>

          {/* Micro status light */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-neutral-950 shadow-[0_0_6px_#22d3ee]" />
        </div>

        {/* Role Pill */}
        <span className={`inline-block px-2 py-0.5 rounded-full font-mono uppercase font-bold tracking-wider leading-none mb-1 border ${badgeColor} ${sizeMap.role}`}>
          {member.role}
        </span>

        {/* Member Name */}
        <h4 className={`font-display font-extrabold uppercase tracking-tight text-white group-hover:text-cyan-200 transition-colors leading-tight ${sizeMap.name}`}>
          {member.name}
        </h4>

        {/* Optional Subtitle */}
        {subtitle && (
          <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
            {subtitle}
          </span>
        )}
      </div>
    );
  };

  return (
    <section id="team" className="py-20 border-b border-white/[0.08] relative overflow-hidden bg-[#030712]">
      {/* Background Interactive Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75" />

      {/* Background Cybernetic Subtle Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto pb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3 shadow-[0_0_16px_rgba(34,211,238,0.2)]">
            <Network className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Interactive Leadership Matrix</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white drop-shadow-[0_2px_16px_rgba(255,255,255,0.2)]">
            HYPERVISION FAMILY
          </h2>

          <p className="mt-2 text-sm sm:text-base text-neutral-300 font-light max-w-xl">
            Meet the people shaping the future of Hypervision.
          </p>

          {/* Clean Legend */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-6 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.02] px-4 py-2 rounded-full border border-white/[0.08]">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
              Executive Leadership
            </span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
              Department Leadership
            </span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              Associate Leadership
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / TABLET (>= 768px): CLEAN CONNECTED HIERARCHICAL COMMAND TREE    */}
        {/* ========================================================================= */}
        <div className="hidden md:flex flex-col items-center relative w-full">

          {/* ------------------------------------------------------------------- */}
          {/* TIER 1: FACULTY LEADERSHIP                                          */}
          {/* ------------------------------------------------------------------- */}
          <div className="flex flex-col items-center relative w-full max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>FACULTY LEADERSHIP</span>
            </span>

            <div className="flex items-center justify-center gap-12 sm:gap-24 relative w-full">
              {/* Connector line between mentors */}
              <div className="absolute top-1/2 left-24 right-24 h-[2px] bg-gradient-to-r from-cyan-400/40 via-cyan-400 to-cyan-400/40 shadow-[0_0_8px_#22d3ee] pointer-events-none -translate-y-1/2" />

              <HierarchyNode
                member={virender}
                size="lg"
                tierType="faculty"
                branchId="faculty"
              />
              <HierarchyNode
                member={bhavana}
                size="lg"
                tierType="faculty"
                branchId="faculty"
              />
            </div>

            {/* Vertical stem down to President */}
            <div className="w-[2px] h-10 bg-gradient-to-b from-cyan-400 to-amber-400 shadow-[0_0_8px_#22d3ee] my-1" />
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* TIER 2: EXECUTIVE LEADERSHIP (PRESIDENT APEX)                       */}
          {/* ------------------------------------------------------------------- */}
          <div className="flex flex-col items-center relative mt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>EXECUTIVE LEADERSHIP</span>
            </span>

            <HierarchyNode
              member={purva}
              size="apex"
              tierType="apex"
              branchId="executive"
            />

            {/* Vertical stem down to Executive Council */}
            <div className="w-[2px] h-10 bg-gradient-to-b from-amber-400 to-sky-400 shadow-[0_0_8px_#38bdf8] my-1" />
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* TIER 3: EXECUTIVE COUNCIL                                           */}
          {/* ------------------------------------------------------------------- */}
          <div className="flex flex-col items-center relative w-full max-w-4xl mt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold mb-3 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>EXECUTIVE COUNCIL</span>
            </span>

            <div className="relative w-full flex items-center justify-center">
              {/* Horizontal cross-busbar */}
              <div className="absolute top-1/2 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-sky-400/40 via-sky-400 to-sky-400/40 shadow-[0_0_8px_#38bdf8] pointer-events-none -translate-y-1/2" />

              <div className="grid grid-cols-3 gap-8 sm:gap-16 relative z-10">
                <HierarchyNode
                  member={divyanshu}
                  size="md"
                  tierType="council"
                  branchId="executive"
                />
                <HierarchyNode
                  member={priya}
                  size="md"
                  tierType="council"
                  branchId="executive"
                />
                <HierarchyNode
                  member={praanjal}
                  size="md"
                  tierType="council"
                  branchId="executive"
                />
              </div>
            </div>

            {/* Vertical stem down to Strategic & Department Layer */}
            <div className="w-[2px] h-12 bg-gradient-to-b from-sky-400 via-cyan-400 to-cyan-500 shadow-[0_0_10px_#22d3ee] my-2" />
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* TIER 4: STRATEGIC & ADVISORY HORIZONTAL LAYER                       */}
          {/* ------------------------------------------------------------------- */}
          <div className="flex flex-col items-center relative w-full max-w-5xl mt-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>STRATEGIC ADVISORY & DIRECTORS</span>
            </span>

            <div className="relative w-full flex items-center justify-center">
              {/* 4-way horizontal bus */}
              <div className="absolute top-1/2 left-[6%] right-[6%] h-[2px] bg-cyan-400/50 shadow-[0_0_8px_rgba(34,211,238,0.5)] pointer-events-none -translate-y-1/2" />

              <div className="grid grid-cols-4 gap-4 sm:gap-8 relative z-10 w-full px-2">
                <div className="flex justify-center">
                  <HierarchyNode
                    member={priyanshi}
                    size="md"
                    tierType="head"
                    branchId="ops"
                  />
                </div>
                <div className="flex justify-center">
                  <HierarchyNode
                    member={pranav}
                    size="md"
                    tierType="head"
                    branchId="creative"
                  />
                </div>
                <div className="flex justify-center">
                  <HierarchyNode
                    member={tanish}
                    size="md"
                    tierType="head"
                    branchId="creative"
                  />
                </div>
                <div className="flex justify-center">
                  <HierarchyNode
                    member={yash}
                    size="md"
                    tierType="head"
                    branchId="tech"
                  />
                </div>
              </div>
            </div>

            {/* 4 vertical connector stems dropping into the 4 wings below */}
            <div className="grid grid-cols-4 w-full px-2 my-2 relative z-0">
              <div className="flex justify-center">
                <div className="w-[2px] h-8 bg-cyan-400/60 shadow-[0_0_6px_#22d3ee]" />
              </div>
              <div className="flex justify-center">
                <div className="w-[2px] h-8 bg-cyan-400/60 shadow-[0_0_6px_#22d3ee]" />
              </div>
              <div className="flex justify-center">
                <div className="w-[2px] h-8 bg-cyan-400/60 shadow-[0_0_6px_#22d3ee]" />
              </div>
              <div className="flex justify-center">
                <div className="w-[2px] h-8 bg-cyan-400/60 shadow-[0_0_6px_#22d3ee]" />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------------- */}
          {/* TIER 5: THE 4 FUNCTIONAL WINGS (HEADS + ASSOCIATES)                 */}
          {/* ------------------------------------------------------------------- */}
          <div className="w-full max-w-6xl mt-1">
            <div className="grid grid-cols-4 gap-4 sm:gap-6 items-start">

              {/* Column 1: Design Wing */}
              <div className="flex flex-col items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5 pb-2 border-b border-white/[0.08] w-full justify-center">
                  <Palette className="w-3 h-3" />
                  <span>Design Wing</span>
                </div>

                <HierarchyNode
                  member={akshat}
                  size="sm"
                  tierType="head"
                  branchId="creative"
                />
                <div className="w-[1.5px] h-4 bg-cyan-400/50" />
                <HierarchyNode
                  member={misha}
                  size="sm"
                  tierType="associate"
                  branchId="creative"
                />
              </div>

              {/* Column 2: Technical Wing */}
              <div className="flex flex-col items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1.5 pb-2 border-b border-white/[0.08] w-full justify-center">
                  <Terminal className="w-3 h-3" />
                  <span>Technical Wing</span>
                </div>

                <HierarchyNode
                  member={om}
                  size="sm"
                  tierType="head"
                  branchId="tech"
                />
                <div className="w-[1.5px] h-4 bg-emerald-400/50" />
                <HierarchyNode
                  member={siddhant}
                  size="sm"
                  tierType="associate"
                  branchId="tech"
                />
              </div>

              {/* Column 3: Editorial Wing */}
              <div className="flex flex-col items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono uppercase font-bold text-sky-400 flex items-center gap-1.5 pb-2 border-b border-white/[0.08] w-full justify-center">
                  <Layers className="w-3 h-3" />
                  <span>Editorial Wing</span>
                </div>

                <HierarchyNode
                  member={manan}
                  size="sm"
                  tierType="head"
                  branchId="creative"
                />
                <div className="w-[1.5px] h-4 bg-sky-400/50" />
                <HierarchyNode
                  member={jahanvi}
                  size="sm"
                  tierType="associate"
                  branchId="creative"
                />
              </div>

              {/* Column 4: Social Media Wing */}
              <div className="flex flex-col items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-[10px] font-mono uppercase font-bold text-pink-400 flex items-center gap-1.5 pb-2 border-b border-white/[0.08] w-full justify-center">
                  <Radio className="w-3 h-3" />
                  <span>Social Media Wing</span>
                </div>

                <HierarchyNode
                  member={pramansh}
                  size="sm"
                  tierType="head"
                  branchId="creative"
                />
                <div className="w-[1.5px] h-4 bg-pink-400/50" />
                <HierarchyNode
                  member={manasvi}
                  size="sm"
                  tierType="associate"
                  branchId="creative"
                />
              </div>

            </div>
          </div>

          {/* Central Stem connecting to Operations, Events & PR Tier */}
          <div className="w-[2px] h-12 bg-gradient-to-b from-cyan-400 to-indigo-400 shadow-[0_0_8px_#22d3ee] my-4" />

          {/* ------------------------------------------------------------------- */}
          {/* TIER 6: EVENTS, OPERATIONS & PR DIRECTORATE WINGS                   */}
          {/* ------------------------------------------------------------------- */}
          <div className="w-full max-w-5xl">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 font-bold bg-indigo-950/40 px-3.5 py-1 rounded-full border border-indigo-500/30">
                OPERATIONS, EVENTS & PUBLIC RELATIONS WINGS
              </span>
            </div>

            <div className="grid grid-cols-3 gap-5 sm:gap-6 lg:gap-8 items-stretch">

              {/* Events Wing */}
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-400/20 transition-colors">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-3 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>Events Directorate</span>
                </span>

                <HierarchyNode
                  member={anshul}
                  size="sm"
                  tierType="head"
                  branchId="ops"
                />

                <div className="w-[1.5px] h-4 bg-cyan-400/50 my-1.5" />

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                  <HierarchyNode
                    member={atharv}
                    size="sm"
                    tierType="associate"
                    branchId="ops"
                    className="w-full p-2 sm:p-2.5"
                  />
                  <HierarchyNode
                    member={disha}
                    size="sm"
                    tierType="associate"
                    branchId="ops"
                    className="w-full p-2 sm:p-2.5"
                  />
                </div>
              </div>

              {/* PR & Institutional Outreach Wing */}
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-400/20 transition-colors">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  <span>PR & Outreach</span>
                </span>

                <HierarchyNode
                  member={priyal}
                  size="sm"
                  tierType="head"
                  branchId="ops"
                />

                <div className="w-[1.5px] h-4 bg-indigo-400/50 my-1.5" />

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                  <HierarchyNode
                    member={abhay}
                    size="sm"
                    tierType="associate"
                    branchId="ops"
                    className="w-full p-2 sm:p-2.5"
                  />
                  <HierarchyNode
                    member={preksha}
                    size="sm"
                    tierType="associate"
                    branchId="ops"
                    className="w-full p-2 sm:p-2.5"
                  />
                </div>
              </div>

              {/* Operations & Logistics Wing */}
              <div className="flex flex-col items-center p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-emerald-400/20 transition-colors">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3" />
                  <span>Operations Wing</span>
                </span>

                <HierarchyNode
                  member={saksham}
                  size="sm"
                  tierType="head"
                  branchId="ops"
                />

                <div className="w-[1.5px] h-4 bg-emerald-400/50 my-1.5" />

                <div className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full">
                  <HierarchyNode
                    member={harsh}
                    size="sm"
                    tierType="associate"
                    branchId="ops"
                    className="w-full p-2 sm:p-2.5"
                  />
                  <HierarchyNode
                    member={namami}
                    size="sm"
                    tierType="associate"
                    branchId="ops"
                    className="w-full p-2 sm:p-2.5"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE (< 768px): HIGH-END EXECUTIVE PHONE INTERFACE                      */}
        {/* ========================================================================= */}
        <div className="md:hidden space-y-4">
          
          {/* Mobile Category Filter Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 select-none">
            {[
              { id: 'all', label: 'All', count: 26, icon: Network },
              { id: 'executive', label: 'Executive', count: 4, icon: ShieldCheck },
              { id: 'tech', label: 'Tech & Eng', count: 3, icon: Terminal },
              { id: 'creative', label: 'Creative & Media', count: 8, icon: Palette },
              { id: 'ops', label: 'Operations & PR', count: 10, icon: Calendar },
              { id: 'faculty', label: 'Mentors', count: 2, icon: GraduationCap },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = mobileFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMobileFilter(tab.id as typeof mobileFilter)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.35)] font-bold'
                      : 'text-neutral-400 bg-white/[0.03] border border-white/[0.08] hover:text-white'
                  }`}
                >
                  <TabIcon className="w-3 h-3" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-cyan-400/30 text-white' : 'bg-white/5 text-neutral-500'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Featured Presidential Apex Spotlight Card (Shown in 'all' or 'executive') */}
          {(mobileFilter === 'all' || mobileFilter === 'executive') && (
            <div
              onClick={() => setSelectedMember(purva)}
              className="relative p-4 rounded-2xl bg-gradient-to-b from-amber-950/30 via-neutral-900/80 to-neutral-950/90 border border-amber-400/50 shadow-[0_0_24px_rgba(251,191,36,0.18)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-400 to-cyan-400 shadow-[0_0_16px_rgba(251,191,36,0.5)] shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 border border-white/20">
                    {purva.image ? (
                      <img src={purva.image} alt={purva.name} className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display font-extrabold text-sm text-white">
                        {purva.initials}
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-400 border-2 border-neutral-950 shadow-[0_0_6px_#f59e0b]" />
                </div>

                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30 mb-1">
                    EXECUTIVE LEADERSHIP · APEX
                  </span>
                  <h4 className="font-display text-base font-black uppercase text-white truncate">
                    {purva.name}
                  </h4>
                  <p className="text-[11px] text-neutral-300 font-light truncate">
                    President · HyperVision Society
                  </p>
                </div>

                <div className="p-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 shrink-0">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          )}

          {/* Members 2-Column Responsive Touch Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Filter members based on selected mobile category */}
            {(() => {
              let membersToShow: TeamMember[] = [];
              if (mobileFilter === 'all') {
                membersToShow = [
                  virender, bhavana,
                  divyanshu, priya, praanjal,
                  yash, om, siddhant,
                  pranav, tanish, akshat, misha, manan, jahanvi, pramansh, manasvi,
                  priyanshi, anshul, atharv, disha, saksham, harsh, namami, priyal, abhay, preksha
                ];
              } else if (mobileFilter === 'executive') {
                membersToShow = [divyanshu, priya, praanjal];
              } else if (mobileFilter === 'tech') {
                membersToShow = [yash, om, siddhant];
              } else if (mobileFilter === 'creative') {
                membersToShow = [pranav, tanish, akshat, misha, manan, jahanvi, pramansh, manasvi];
              } else if (mobileFilter === 'ops') {
                membersToShow = [priyanshi, anshul, atharv, disha, saksham, harsh, namami, priyal, abhay, preksha];
              } else if (mobileFilter === 'faculty') {
                membersToShow = [virender, bhavana];
              }

              return membersToShow.map((member) => (
                <div
                  key={member.name}
                  onClick={() => setSelectedMember(member)}
                  className="flex flex-col items-center text-center p-3 rounded-xl bg-neutral-900/60 border border-white/10 active:scale-95 active:border-cyan-400/60 transition-all select-none cursor-pointer"
                >
                  {/* Portrait */}
                  <div className="relative w-12 h-12 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-sky-400 to-blue-600 shadow-[0_0_10px_rgba(34,211,238,0.3)] mb-2">
                    <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 border border-white/20">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-display font-bold text-xs text-white">
                          {member.initials}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role */}
                  <span className="inline-block px-1.5 py-0.5 rounded text-[8.5px] font-mono uppercase font-semibold tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-400/20 max-w-full truncate mb-1">
                    {member.role}
                  </span>

                  {/* Name */}
                  <h4 className="font-display text-xs font-bold uppercase text-white truncate max-w-full leading-tight">
                    {member.name}
                  </h4>
                </div>
              ));
            })()}
          </div>

        </div>

        {/* ======================================================== */}
        {/* PREMIUM PROFILE INSPECTOR MODAL                          */}
        {/* ======================================================== */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-[#070e20] border border-cyan-400/50 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 relative shadow-[0_25px_80px_rgba(34,211,238,0.35)] select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                aria-label="Close profile modal"
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 mt-2 sm:mt-0">
                {/* Large Profile Portrait with Neon Ring */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_24px_rgba(34,211,238,0.5)] shrink-0">
                  <div className="w-full h-full rounded-full overflow-hidden bg-neutral-950 border border-white/30">
                    {selectedMember.image ? (
                      <img
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-display font-extrabold text-2xl text-white">
                        {selectedMember.initials}
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Identity Details */}
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                    {selectedMember.role}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-0.5">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light mt-1.5 leading-relaxed">
                    {selectedMember.department || 'School of Computer Science, UPES'}
                  </p>

                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 border border-cyan-400/30 text-cyan-300">
                    <span>UPES Cohort 2025–26</span>
                  </div>
                </div>
              </div>

              {/* Social / Contact Links */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  Connect & Verify
                </span>

                <div className="flex items-center gap-2">
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/40 text-xs font-mono text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {selectedMember.github && (
                    <a
                      href={selectedMember.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/30 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
