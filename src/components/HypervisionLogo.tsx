import React, { useState } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const HypervisionLogo: React.FC<LogoProps> = ({
  size = 36,
  className = "",
  showText = false
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {!imgError ? (
        <img
          src="/logo.webp"
          alt="UPES HyperVision Emblem"
          width={size}
          height={size}
          className="shrink-0 object-contain rounded-full transition-transform duration-300 hover:rotate-6"
          style={{ width: `${size}px`, height: `${size}px` }}
          onError={() => setImgError(true)}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 hover:rotate-6"
          aria-label="UPES HyperVision Logo Emblem"
        >
          {/* Radial ticks */}
          <line x1="96" y1="25" x2="96" y2="35" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
          <line x1="114" y1="28" x2="118" y2="39" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
          <line x1="133" y1="36" x2="139" y2="48" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
          <line x1="150" y1="50" x2="157" y2="62" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />
          <line x1="162" y1="68" x2="171" y2="78" stroke="#bae6fd" strokeWidth="6" strokeLinecap="round" />

          {/* Cyan arcs */}
          <path
            d="M 32 85 A 72 72 0 0 1 76 34"
            stroke="#38bdf8"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 110 166 A 72 72 0 0 0 166 112"
            stroke="#38bdf8"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bottom-left segmented blocks */}
          <rect x="30" y="128" width="12" height="12" rx="3" transform="rotate(-30 30 128)" fill="#2563eb" />
          <rect x="42" y="142" width="12" height="12" rx="3" transform="rotate(-30 42 142)" fill="#2563eb" />
          <rect x="56" y="154" width="12" height="12" rx="3" transform="rotate(-30 56 154)" fill="#2563eb" />

          {/* Concentric rings and white waveform */}
          <circle cx="100" cy="100" r="60" fill="#0284c7" />
          <circle cx="100" cy="100" r="54" stroke="#08090b" strokeWidth="8" fill="none" />
          <circle cx="100" cy="100" r="50" fill="#1d4ed8" />
          <path
            d="M 70 70 L 70 114 Q 70 118 74 116 L 84 100 Q 86 98 89 101 L 100 112 Q 112 126 124 116 Q 134 104 142 98 L 150 96"
            stroke="#ffffff"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="86" cy="116" r="10" fill="#ffffff" />
          <circle cx="86" cy="116" r="8" fill="#bae6fd" />
          <circle cx="86" cy="116" r="5.5" fill="#0284c7" />
          <circle cx="86" cy="116" r="3" fill="#0f172a" />
        </svg>
      )}

      {showText && (
        <div className="flex flex-col">
          <span className="text-base font-semibold tracking-tight text-white leading-none font-display">
            HYPERVISION
          </span>
          <span className="text-[10px] tracking-wider text-neutral-400 font-mono mt-0.5">
            UPES DEHRADUN
          </span>
        </div>
      )}
    </div>
  );
};
