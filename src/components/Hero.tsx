import React, { useRef, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Cpu, Network, ShieldCheck, Terminal } from 'lucide-react';
import { HYPERVISION_INFO } from '../data/hypervisionData';

interface HeroProps {
  onOpenJoin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Enhanced cybernetic particle network with mouse interaction
    const particleCount = Math.min(105, Math.max(55, Math.floor(window.innerWidth / 16)));
    let mouse = { x: -1000, y: -1000, radius: 160 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 2.2 + 0.8,
      baseAlpha: Math.random() * 0.45 + 0.35,
      alpha: Math.random() * 0.45 + 0.35,
      glow: Math.random() > 0.6,
      pulseSpeed: Math.random() * 0.03 + 0.015,
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

        // Mouse interaction
        const dxMouse = p1.x - mouse.x;
        const dyMouse = p1.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          p1.x += (dxMouse / distMouse) * force;
          p1.y += (dyMouse / distMouse) * force;
        }

        // Draw particle with pulsating glow
        const currentAlpha = p1.baseAlpha + Math.sin(p1.pulseStep) * 0.2;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.glow
          ? `rgba(56, 189, 248, ${Math.min(1, currentAlpha + 0.3)})`
          : `rgba(34, 211, 238, ${Math.max(0.1, currentAlpha)})`;
        ctx.fill();

        if (p1.glow) {
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${Math.min(0.25, currentAlpha * 0.35)})`;
          ctx.fill();
        }

        // Connect nearby particles with luminous cybernetic filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 150) * 0.26;
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Connect particle to active mouse position
        if (distMouse < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          const mouseLineAlpha = (1 - distMouse / mouse.radius) * 0.45;
          ctx.strokeStyle = `rgba(34, 211, 238, ${mouseLineAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 overflow-hidden border-b border-white/[0.08]">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        aria-hidden="true"
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 tech-grid-pattern opacity-25 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Ambient gradient focal light */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="max-w-4xl">
          {/* Institutional Trust Kicker with Glass Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono text-neutral-300 tracking-wider uppercase mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>School of Computer Science, UPES</span>
            <span aria-hidden="true" className="text-neutral-500">·</span>
            <span className="text-cyan-300 font-semibold">Estd. 2011</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white leading-[0.95] sm:leading-[0.92] uppercase select-none">
            <span className="block">BUILD</span>
            <span className="block text-neutral-400 hover:text-white transition-colors duration-300">
              WHAT'S
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              NEXT.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-neutral-300 max-w-2xl font-light leading-relaxed">
            {HYPERVISION_INFO.tagline} We are UPES's premier student-led technical innovation society—turning deep algorithmic research, autonomous robotics, and real-time systems into production-grade solutions.
          </p>

          {/* CTAs with Glassmorphism */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-200 active:bg-neutral-300 transition-colors rounded-sm shadow-lg shadow-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 text-center"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>

            <button
              onClick={onOpenJoin}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white glass-pill hover:bg-white/10 hover:border-cyan-400/50 transition-all rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer shadow-md text-center"
            >
              <span>Join HyperVision</span>
              <ArrowUpRight className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Proof / Trust Bar Adjacent at Bottom of Hero in Glass Panel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12">
        <div className="p-4 sm:p-5 rounded-sm glass-card-static grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-xs text-neutral-300">
          <div className="flex items-center gap-3">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Autonomous Systems & Edge AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>24h Flagship Code Hustle</span>
          </div>
          <div className="flex items-center gap-3">
            <Network className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>330+ Teams SIH Qualifier Matrix</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>MeitY & NIT Kurukshetra SwaYaan</span>
          </div>
        </div>
      </div>
    </section>
  );
};
