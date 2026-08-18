import React, { useState } from 'react';
import { Play, Sparkles, Sliders, ExternalLink, X, Film, Eye } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/servicesData';
import { PortfolioItem } from '../types';

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const categories = ['All', 'Cinematic', 'Reels', 'Commercial', 'Trailers', 'Motion'];

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-800/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                CURATED SHOWCASE
              </span>
            </div>
            <h2
              id="portfolio-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              FEATURED WORK
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`portfolio-filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black shadow-md'
                    : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`portfolio-item-${item.id}`}
              onClick={() => setSelectedVideo(item)}
              className="group relative bg-neutral-950 border border-neutral-800/80 hover:border-neutral-600 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-black"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-neutral-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/60 border border-neutral-600/80 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-medium tracking-wider uppercase px-2.5 py-1 rounded bg-black/80 border border-neutral-800 text-neutral-300 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-neutral-400 border border-neutral-800">
                    {item.duration}
                  </span>
                </div>

                {/* Bottom View Metric */}
                {item.views && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 bg-black/70 px-2 py-0.5 rounded border border-neutral-800">
                    <Eye className="w-3 h-3 text-neutral-400" />
                    <span>{item.views}</span>
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="p-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                  Client: {item.client}
                </span>
                <h3 className="text-base font-bold text-white tracking-wide mb-2 line-clamp-1 group-hover:text-neutral-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Before & After Color Grade Showcase */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sliders className="w-4 h-4 text-neutral-400" />
                <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                  DAVINCI RESOLVE COLOR LAB
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase text-white font-heading">
                INTERACTIVE COLOR GRADING COMPARISON
              </h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm">
              Drag the interactive slider below to witness the transformation from flat Log sensor footage to final film-emulated master grade.
            </p>
          </div>

          {/* Before / After Slider Container */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden select-none border border-neutral-800">
            {/* After Image (Graded) */}
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=85"
              alt="Final Graded Footage"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-neutral-700 text-white text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded">
              CINEMATIC MASTER GRADE
            </div>

            {/* Before Image (Flat Log profile) with clip-path */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=85"
                alt="Raw Log Sensor Footage"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-125 contrast-75 saturate-50 max-w-none"
                style={{ width: '100vw' }}
              />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded">
                RAW FLAT LOG FOOTAGE
              </div>
            </div>

            {/* Divider Line & Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] cursor-ew-resize z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-black">
                <Sliders className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Native range input overlay for seamless drag touch & mouse */}
            <input
              id="color-grade-slider"
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              aria-label="Color grade before and after slider"
              className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
            />
          </div>

          <div className="flex items-center justify-between mt-4 text-[11px] font-mono text-neutral-500">
            <span>◄ RAW CAMERA LOG</span>
            <span className="text-neutral-400">DRAG SLIDER TO COMPARE</span>
            <span>CUSTOM FILM LUT GRADE ►</span>
          </div>
        </div>
      </div>

      {/* Video Preview Lightbox Modal */}
      {selectedVideo && (
        <div
          id="portfolio-video-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden p-6 shadow-2xl">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-full border border-neutral-800"
              aria-label="Close video preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                {selectedVideo.category} • Client: {selectedVideo.client}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {selectedVideo.title}
              </h3>
            </div>

            {/* Video Player Mockup Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800 mb-5 flex items-center justify-center group">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl mb-3 animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <span className="text-sm font-semibold text-white tracking-wider uppercase">
                  Cinematic Preview Loaded
                </span>
                <span className="text-xs text-neutral-400 font-mono mt-1">
                  Master 4K 60FPS • Stereo Stems Synced
                </span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 mb-4">
              {selectedVideo.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-900">
              <div className="flex items-center gap-2">
                {selectedVideo.tags.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded-lg hover:bg-neutral-200"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
