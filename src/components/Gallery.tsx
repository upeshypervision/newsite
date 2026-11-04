import React, { useState } from 'react';
import { TiltCard } from './TiltCard';

interface PhotoItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  time: string;
  location: string;
  tag: string;
  tapeRotation?: string;
}

const ARENA_PHOTOS: PhotoItem[] = [
  {
    id: 'ch-victory',
    image: '/gallery/gallery_1.webp',
    title: 'Code Hustle Winner Podium',
    caption: 'Final arbitration and trophy ceremony after 24 continuous hours of full-stack and machine learning software prototyping.',
    time: '08:45 PM',
    location: 'MAC Auditorium Stage',
    tag: 'FLAGSHIP 24H',
  },
  {
    id: 'drone-bench',
    image: '/gallery/gallery_2.webp',
    title: 'MeitY SwaYaan Avionics Bench',
    caption: 'Testing custom optical flow and lidar fusion telemetry on the autonomous quadcopter companion computer.',
    time: '02:15 PM',
    location: 'Avionics Lab, UPES Bidholi',
    tag: 'HARDWARE RIG',
  },
  {
    id: 'late-night-lab',
    image: '/gallery/gallery_3.webp',
    title: '3 AM Engineering Room',
    caption: 'Student engineers debugging WebSocket synchronization and jury state machines before sunrise.',
    time: '03:42 AM',
    location: 'Computer Lab 402',
    tag: 'SPRINT ARCHIVE',
  },
  {
    id: 'symposium-hall',
    image: '/gallery/gallery_4.webp',
    title: 'Pehchaan Technical Keynote',
    caption: '450+ students gathered for annual tech symposium sessions, dragons’ den founder pitches, and placement panels.',
    time: '11:30 AM',
    location: 'Auditorium Complex',
    tag: 'SYMPOSIUM',
  },
  {
    id: 'ch-floor',
    image: '/events/code_hustle_1.webp',
    title: 'Code Hustle Hackathon Floor',
    caption: '60 finalist teams competing head-to-head with live leaderboard updates every two hours.',
    time: '01:10 AM',
    location: 'Bidholi Central Floor',
    tag: '24-HOUR FLOOR',
  },
  {
    id: 'sih-hall',
    image: '/events/sih_1.webp',
    title: '330-Team SIH Qualifier',
    caption: 'The massive national round qualifier processed by Hypervision’s automated scoring matrix.',
    time: '04:20 PM',
    location: 'School of Computer Science',
    tag: '330 TEAMS',
  },
];

export const Gallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <section id="gallery" className="site-section py-20 sm:py-28 bg-[#040812] text-white">
      <div className="section-wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b rule">
          <div>
            <p className="section-kicker">05 // Visual Field Archive</p>
            <h2 className="section-title">
              In the<br />
              <span className="text-[#1ab7f2]">arena.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2">
            <p className="section-intro">
              No stock graphics. 3 AM terminal screens, hardware benches, MAC Auditorium late nights, and fifteen years of campus builder culture.
            </p>
            <span className="text-xs font-mono uppercase tracking-widest text-[#788e9f]">
              Coordinates: 30°24&apos;58&quot;N 77°58&apos;11&quot;E &bull; UPES Bidholi
            </span>
          </div>
        </div>

        {/* Real Polaroid Photo Wall (FULL VIVID COLOR - NO BLACK & WHITE) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {ARENA_PHOTOS.map((item, idx) => {
            const rotationClass =
              idx % 3 === 0
                ? 'sm:-rotate-2 hover:rotate-0'
                : idx % 3 === 1
                ? 'sm:rotate-2 hover:rotate-0'
                : 'sm:-rotate-1 hover:rotate-0';

            return (
              <div
                key={item.id}
                className={`transition-all duration-300 ${rotationClass} group`}
              >
                <TiltCard maxTilt={8} className="h-full">
                  {/* Real Classic Polaroid Card: White frame, thick bottom chin, 3D physics */}
                  <div
                    onClick={() => setSelectedPhoto(item)}
                    className="bg-[#f8fafc] text-[#0f172a] p-3.5 pb-5 rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_50px_rgba(26,183,242,0.3)] transition-all cursor-pointer relative"
                  >
                    {/* Top tape sticker accent */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#1ab7f2]/30 backdrop-blur-sm border border-white/40 shadow-sm transform -rotate-1 rounded-sm pointer-events-none" />

                    {/* Image frame in FULL VIVID COLOR */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#02050a] rounded-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Cyan corner tag */}
                      <span className="absolute top-2 right-2 bg-[#020813]/90 text-[#1ab7f2] font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#1ab7f2]/40 font-bold">
                        {item.tag}
                      </span>

                      {/* Timestamp tag */}
                      <span className="absolute bottom-2 left-2 bg-[#020813]/90 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                        {item.time}
                      </span>
                    </div>

                    {/* Classic Polaroid Bottom Chin */}
                    <div className="mt-3.5 pt-1 px-1 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display font-bold text-sm sm:text-base text-[#0f172a] leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[11px] font-mono text-[#475569] line-clamp-1">
                          {item.location} &bull; Field Archive
                        </p>
                      </div>

                      <span className="text-[10px] font-mono text-[#0284c7] font-bold shrink-0 mt-0.5">
                        Inspect &rarr;
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Real Tape Banner Footer */}
        <div className="mt-12 p-4 sm:p-5 border border-white/10 bg-[#060e18] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#1ab7f2] rounded-full animate-pulse" />
            <p className="text-xs font-mono uppercase tracking-wider text-[#9ab0c4]">
              Campus Photography &bull; 2011 &ndash; 2026 Archive Records &bull; School of Computer Science, UPES
            </p>
          </div>
          <a
            href="/events"
            className="editorial-button text-xs font-mono uppercase tracking-widest text-[#1ab7f2] rounded-full !px-5"
          >
            Review Hackathon Chronology &rarr;
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#02060e]/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#071322] border border-[#1ab7f2]/50 p-6 sm:p-8 rounded-3xl relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-xs font-mono uppercase tracking-wider text-[#788e9f] hover:text-white px-3 py-1 border border-white/10 rounded-full"
            >
              [Close &times;]
            </button>

            <div className="relative aspect-[16/10] overflow-hidden bg-black border border-white/10 rounded-2xl mt-6 sm:mt-2">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10 pt-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[.18em] text-[#1ab7f2] font-bold">
                  {selectedPhoto.tag} // {selectedPhoto.time} // {selectedPhoto.location}
                </span>
                <h3 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-white">
                  {selectedPhoto.title}
                </h3>
                <p className="mt-2 text-sm text-[#9ab0c4] max-w-2xl leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-[#597187]">
                UPES Hypervision Archive Records
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};