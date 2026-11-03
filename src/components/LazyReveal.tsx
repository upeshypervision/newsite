import React, { useRef, useState, useEffect } from 'react';

interface LazyRevealProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  delayMs?: number;
}

export const LazyReveal: React.FC<LazyRevealProps> = ({
  children,
  threshold = 0.08,
  rootMargin = '150px 0px',
  className = '',
  delayMs = 0,
}) => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              timeoutId = setTimeout(() => {
                setIsVisible(true);
              }, delayMs);
            } else {
              setIsVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeoutId !== null) clearTimeout(timeoutId);
    };
  }, [threshold, rootMargin, delayMs]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0 filter-none'
          : 'opacity-0 translate-y-6 blur-[2px]'
      } ${className}`}
    >
      {children}
    </div>
  );
};
