import React, { useState } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export const HypervisionLogo: React.FC<LogoProps> = ({
  size = 36,
  className = '',
  showText = false,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {!imgError ? (
        <img
          src="/logo.png"
          alt="UPES HyperVision Logo"
          width={size}
          height={size}
          className="shrink-0 object-contain rounded-full transition-transform duration-300 hover:rotate-6"
          style={{ width: `${size}px`, height: `${size}px` }}
          onError={() => setImgError(true)}
        />
      ) : (
        <img
          src="/logo.webp"
          alt="UPES HyperVision Logo"
          width={size}
          height={size}
          className="shrink-0 object-contain rounded-full"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      )}
      {showText && (
        <span className="font-display font-black text-xl tracking-tight text-white uppercase">
          HYPERVISION
        </span>
      )}
    </div>
  );
};