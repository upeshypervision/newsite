import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/hypervisionData';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section id="gallery" className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/[0.08] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              06 / Environment
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Campus Life & Gallery
            </h2>
          </div>
          <p className="text-sm font-light text-neutral-400 max-w-sm">
            Inside the MAC auditorium hackathons, avionics flight testing benches, and faculty keynotes at UPES Bidholi.
          </p>
        </div>

        {/* Gallery Grid with Glassmorphic Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer glass-card rounded-sm overflow-hidden relative aspect-[16/10]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 glass-pill text-white rounded-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 glass-pill px-2 py-0.5 inline-block mb-1.5">
                  {item.tag}
                </span>
                <h3 className="font-display text-base font-bold uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Frosted Glass */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full glass-modal rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 p-2 text-neutral-300 hover:text-white glass-pill rounded-sm"
              aria-label="Close image lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-neutral-300 hover:text-white glass-pill rounded-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-neutral-300 hover:text-white glass-pill rounded-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Image */}
            <div className="aspect-[16/10] w-full bg-black/50 flex items-center justify-center">
              <img
                src={GALLERY_ITEMS[activePhotoIndex].image}
                alt={GALLERY_ITEMS[activePhotoIndex].title}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="p-6 bg-neutral-950/70 border-t border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 glass-pill px-2 py-0.5">
                  {GALLERY_ITEMS[activePhotoIndex].tag}
                </span>
                <h4 className="font-display text-xl font-bold uppercase text-white mt-2">
                  {GALLERY_ITEMS[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-neutral-300/80 font-light mt-1">
                  {GALLERY_ITEMS[activePhotoIndex].description}
                </p>
              </div>
              <div className="text-xs font-mono text-neutral-400 shrink-0 ml-4 glass-pill px-2.5 py-1">
                {activePhotoIndex + 1} / {GALLERY_ITEMS.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
