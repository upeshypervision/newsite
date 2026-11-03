import React from 'react';

export const WhyHypervision: React.FC = () => {
  const pillars = [
    {
      number: "01",
      title: "BUILD",
      summary: "We don't just discuss technology. We build with it.",
      details: "From low-level ROS flight navigation nodes to resilient distributed hackathon matrix engines, every initiative ships to real users and real hardware."
    },
    {
      number: "02",
      title: "COLLABORATE",
      summary: "Students, developers, designers and researchers working together.",
      details: "A cross-disciplinary collective spanning the School of Computer Science—combining mathematical theory, systems infrastructure, and visual design."
    },
    {
      number: "03",
      title: "IMPACT",
      summary: "Turning ideas into real-world solutions.",
      details: "Serving 330+ participating student teams in national qualifiers, partnering with MeitY and NIT Kurukshetra, and placing alumni into leading global tech organizations."
    }
  ];

  return (
    <section className="py-24 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-12 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              07 / Philosophy
            </span>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white">
              Why HyperVision
            </h2>
          </div>
          <p className="text-sm font-light text-neutral-400 max-w-sm">
            Our governing ethos since 2011 at the School of Computer Science, UPES Dehradun.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="glass-card p-8 rounded-sm space-y-6 flex flex-col justify-between"
            >
              <div>
                <div className="font-display text-6xl sm:text-7xl font-black text-white/20 tracking-tighter leading-none select-none">
                  {pillar.number}
                </div>

                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  {pillar.title}
                </h3>

                <p className="mt-4 text-base text-neutral-200 font-medium leading-snug">
                  {pillar.summary}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-neutral-300/80 font-light leading-relaxed">
                  {pillar.details}
                </p>
              </div>

              <div className="w-12 h-0.5 bg-cyan-400/40 pt-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
