import React from 'react';
import { Play, ArrowDown, Briefcase, Sparkles, Film, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onViewWork: () => void;
  onOpenHire: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onViewWork,
  onOpenHire,
}) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black text-white"
    >
      {/* Background ambient lighting and subtle film grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-neutral-700/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-neutral-800/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Cinematic Studio Eyebrow Badge */}
        <div
          id="hero-status-pill"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 text-neutral-300 text-[11px] tracking-widest uppercase mb-8 shadow-sm backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-medium text-neutral-200">YESHUUU EDITS</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-400">Available for Freelance & Contract Projects</span>
        </div>

        {/* Main Title */}
        <h1
          id="hero-main-title"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 max-w-4xl"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          PRECISION CUTS.{' '}
          <span className="text-neutral-400 block sm:inline">CINEMATIC COLOR.</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500">
            TIMELESS STORIES.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          id="hero-subtitle"
          className="text-neutral-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          Crafting high-tension trailers, cinematic film edits, viral vertical shorts, 
          commercial ad campaigns, and slick motion graphics that keep audiences glued.
        </p>

        {/* CTAs with prominent HIRE ME button */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto justify-center mb-16">
          {/* Primary High-Impact HIRE ME Button */}
          <button
            id="hero-hire-me-btn"
            onClick={onOpenHire}
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-md hover:bg-neutral-200 transition-all shadow-xl shadow-white/10 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group ring-2 ring-white/30"
          >
            <Briefcase className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
            <span>Hire Me</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Secondary Explore Services Button */}
          <button
            id="hero-explore-services-btn"
            onClick={onExploreServices}
            className="w-full sm:w-auto px-7 py-4 bg-neutral-900 border border-neutral-700 text-white font-semibold text-xs uppercase tracking-widest rounded-md hover:bg-neutral-800 hover:border-neutral-500 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Explore Services</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Tertiary View Work Button */}
          <button
            id="hero-view-work-btn"
            onClick={onViewWork}
            className="w-full sm:w-auto px-7 py-4 bg-neutral-950/80 border border-neutral-800 text-neutral-300 font-semibold text-xs uppercase tracking-widest rounded-md hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Featured Work</span>
          </button>
        </div>

        {/* Performance metrics banner */}
        <div
          id="hero-metrics-bar"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl p-6 rounded-xl border border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md"
        >
          <div className="flex flex-col items-center text-center p-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">150+</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">
              Projects Delivered
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">10M+</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">
              Views Generated
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">99.4%</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">
              Client Satisfaction
            </span>
          </div>
          <div className="flex flex-col items-center text-center p-2">
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono">24-48h</span>
            <span className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-medium">
              Rapid Turnaround
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
