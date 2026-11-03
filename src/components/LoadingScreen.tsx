import React, { useState, useEffect } from 'react';
import { HypervisionLogo } from './HypervisionLogo';
import { Sparkles, Terminal, Cpu, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 2600,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const statusMessages = [
    { text: "INITIALIZING HYPERVISION CORE ARCHITECTURE...", icon: Cpu },
    { text: "CALIBRATING AVIONICS & AUTONOMOUS ROBOTICS NODES...", icon: Terminal },
    { text: "CONFIGURING CODE HUSTLE & SIH MATRIX RUNTIMES...", icon: ShieldCheck },
    { text: "SYNCING SCHOOL OF COMPUTER SCIENCE DATA LAYER...", icon: Sparkles },
    { text: "SYSTEM OPERATIONAL · WELCOME TO WHAT'S NEXT", icon: Sparkles }
  ];

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 30;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress(rawPct);

      // Status stage calculation
      if (rawPct < 22) {
        setStatusIndex(0);
      } else if (rawPct < 48) {
        setStatusIndex(1);
      } else if (rawPct < 74) {
        setStatusIndex(2);
      } else if (rawPct < 96) {
        setStatusIndex(3);
      } else {
        setStatusIndex(4);
      }

      if (rawPct >= 100) {
        clearInterval(timer);
        // Brief cinematic pause at 100% before aperture expansion
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 320);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [minDurationMs, onComplete]);

  const CurrentStatusIcon = statusMessages[statusIndex].icon;

  return (
    <div
      aria-label="Loading UPES HyperVision Platform"
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 bg-[#07080a] text-white overflow-hidden transition-all duration-700 ease-out select-none ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none blur-sm'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background ambient refraction illumination */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/[0.12] rounded-full blur-[160px] animate-pulse-glow" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-400/[0.08] rounded-full blur-[140px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px] bg-indigo-600/[0.10] rounded-full blur-[180px] animate-float-reverse" />
        <div className="absolute inset-0 tech-grid-pattern opacity-30" />
      </div>

      {/* Top Telemetry */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            UPES HYPERVISION · SYSTEM BOOT
          </span>
        </div>
      </div>

      {/* Center Cinematic Logo & Radar Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto">
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
          {/* Outermost Pulsing Expanding Ripple Rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ripple pointer-events-none" />
          <div className="absolute inset-4 rounded-full border border-sky-400/15 animate-ripple [animation-delay:1.2s] pointer-events-none" />

          {/* Radar Sweep Arc Ring (Rotating Clockwise) */}
          <div className="absolute inset-3 rounded-full border border-white/10 animate-radar-spin">
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-300/60" />
          </div>

          {/* Reverse Orbiting Cyan Segmented Arc (Counter-Clockwise) */}
          <svg
            className="absolute inset-0 w-full h-full animate-radar-spin-reverse pointer-events-none"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle
              cx="100"
              cy="100"
              r="88"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            <path
              d="M 35 100 A 65 65 0 0 1 100 35"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="opacity-75"
            />
            <path
              d="M 165 100 A 65 65 0 0 1 100 165"
              stroke="#0284c7"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-60"
            />
          </svg>

          {/* Inner Frosted Glass Housing Disc */}
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full glass-card flex items-center justify-center p-3 shadow-[0_0_50px_rgba(56,189,248,0.25)] border border-cyan-400/30 overflow-hidden">
            {/* Shimmer Light Reflection Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none" />

            {/* Central Official Emblem */}
            <div className="relative z-10 transition-transform duration-500 hover:scale-105">
              <HypervisionLogo size={96} className="filter drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]" />
            </div>

            {/* Central Ocular Sensor Aura */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Brand Lockup */}
        <div className="text-center mt-6">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white flex items-center justify-center gap-2">
            <span>UPES HYPERVISION</span>
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mt-1">
            School of Computer Science · Estd. 2011
          </p>
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="mt-8 flex items-center gap-2.5 px-4 py-2 rounded-sm glass-card text-xs font-mono text-neutral-300 max-w-md w-full justify-center shadow-md">
          <CurrentStatusIcon className="w-4 h-4 text-cyan-400 shrink-0 animate-pulse" />
          <span className="truncate">{statusMessages[statusIndex].text}</span>
        </div>

        {/* High-Tech Progress Bar & Percentage */}
        <div className="mt-6 w-full max-w-xs sm:max-w-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-500 uppercase tracking-wider">Kernel Initialization</span>
            <span className="text-cyan-300 font-bold tabular-nums">
              {progress.toString().padStart(3, '0')}%
            </span>
          </div>

          {/* Frosted Glass Progress Track */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-300 rounded-full transition-all duration-75 relative shadow-[0_0_12px_#38bdf8]"
              style={{ width: `${progress}%` }}
            >
              {/* Leading edge laser glint */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>
        </div>

        {/* Equalizer Frequency Bars */}
        <div className="mt-6 flex items-center gap-1 h-3" aria-hidden="true">
          <span className="w-1 bg-cyan-400/80 rounded-full animate-pulse h-2" style={{ animationDelay: '0.1s' }} />
          <span className="w-1 bg-cyan-400/80 rounded-full animate-pulse h-3" style={{ animationDelay: '0.3s' }} />
          <span className="w-1 bg-cyan-400/80 rounded-full animate-pulse h-1" style={{ animationDelay: '0.2s' }} />
          <span className="w-1 bg-cyan-400/80 rounded-full animate-pulse h-2.5" style={{ animationDelay: '0.4s' }} />
          <span className="w-1 bg-cyan-400/80 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.25s' }} />
        </div>
      </div>

      {/* Bottom Institutional Heritage */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-2 border-t border-white/[0.08] pt-4">
        <span>Innovate. Collaborate. Elevate.</span>
        <span>UPES Bidholi Campus, Dehradun</span>
      </div>
    </div>
  );
};
