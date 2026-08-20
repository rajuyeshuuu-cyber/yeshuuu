import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Sparkles,
  Sliders,
  ExternalLink,
  X,
  Eye,
  Layers,
  Film,
  Image as ImageIcon,
  Tv,
  Clapperboard,
  Bot,
  Maximize2,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/servicesData';
import { PortfolioItem, PortfolioCategory } from '../types';

interface CategoryNavConfig {
  id: PortfolioCategory;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  type: 'video' | 'image';
}

const CATEGORIES_CONFIG: CategoryNavConfig[] = [
  { id: 'Reels', label: 'REELS', count: 5, icon: Film, type: 'video' },
  { id: 'Corporate Ads', label: 'CORPORATE ADS', count: 2, icon: Tv, type: 'video' },
  { id: 'Trailer Cuts', label: 'TRAILER CUTS', count: 1, icon: Clapperboard, type: 'video' },
  { id: 'AI Videos', label: 'AI VIDEOS', count: 2, icon: Bot, type: 'video' },
  { id: 'Posters', label: 'POSTERS', count: 5, icon: ImageIcon, type: 'image' },
  { id: 'Banners', label: 'BANNERS', count: 5, icon: Layers, type: 'image' },
  { id: 'Thumbnails', label: 'THUMBNAILS', count: 5, icon: Sparkles, type: 'image' },
];

interface PortfolioSectionProps {
  activeCategory?: PortfolioCategory;
  onCategoryChange?: (category: PortfolioCategory) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  activeCategory: externalCategory,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState<PortfolioCategory>('Reels');
  const activeCategory = externalCategory !== undefined ? externalCategory : internalCategory;

  const handleCategorySelect = (cat: PortfolioCategory) => {
    setInternalCategory(cat);
    if (onCategoryChange) {
      onCategoryChange(cat);
    }
  };

  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Filter items strictly by active category
  const filteredItems = PORTFOLIO_DATA.filter((item) => item.category === activeCategory);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-800/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                CURATED CINEMATIC & DESIGN SHOWCASE
              </span>
            </div>
            <h2
              id="portfolio-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              PORTFOLIO ARCHIVE
            </h2>
          </div>

          <div className="text-right hidden md:block">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
              TOTAL DELIVERED WORK
            </span>
            <span className="text-lg font-bold text-white font-mono">
              {PORTFOLIO_DATA.length} SIGNATURE MASTERPIECES
            </span>
          </div>
        </div>

        {/* Premium Glassmorphism Category Navigation */}
        <div className="mb-12">
          {/* Mobile horizontal scroll container with no scrollbar */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-3 pt-1 scrollbar-none sm:flex-wrap">
            {CATEGORIES_CONFIG.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`portfolio-tab-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer whitespace-nowrap select-none ${
                    isActive
                      ? 'bg-neutral-900/90 text-white border-neutral-700 shadow-xl shadow-black/80 ring-1 ring-white/20'
                      : 'bg-neutral-950/60 text-neutral-400 hover:text-white border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/50 backdrop-blur-md'
                  } border backdrop-blur-xl`}
                >
                  {/* Subtle Top Edge Glass Highlight */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[1px] rounded-t-xl transition-opacity duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-100'
                        : 'bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* Icon */}
                  <IconComponent
                    className={`w-4 h-4 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'
                    }`}
                  />

                  {/* Label */}
                  <span className={`text-xs sm:text-sm font-bold tracking-wider uppercase font-heading ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                  }`}>
                    {cat.label}
                  </span>

                  {/* Project Count Pill */}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors ${
                      isActive
                        ? 'bg-white text-black font-extrabold'
                        : 'bg-neutral-900 text-neutral-500 group-hover:text-neutral-300 border border-neutral-800'
                    }`}
                  >
                    {cat.count}
                  </span>

                  {/* Active Indicator Glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryGlow"
                      className="absolute inset-0 rounded-xl bg-white/[0.04] pointer-events-none ring-1 ring-white/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Dynamic Grid with Smooth Category Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={`grid gap-6 mb-20 ${
              activeCategory === 'Reels'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                : activeCategory === 'Posters'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
                : activeCategory === 'Banners'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : activeCategory === 'Trailer Cuts'
                ? 'grid-cols-1 max-w-3xl mx-auto'
                : activeCategory === 'Corporate Ads' || activeCategory === 'AI Videos'
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
            }`}
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                id={`portfolio-item-${item.id}`}
                onClick={() => setSelectedItem(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group relative bg-neutral-950/80 border border-neutral-800/90 hover:border-neutral-600/80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-black flex flex-col backdrop-blur-md"
              >
                {/* Media Container with tailored aspect ratio */}
                <div
                  className={`relative overflow-hidden bg-neutral-900 flex items-center justify-center ${
                    item.aspectRatio === '9:16'
                      ? 'aspect-[9/16]'
                      : item.aspectRatio === '3:4'
                      ? 'aspect-[3/4]'
                      : item.aspectRatio === '21:9'
                      ? 'aspect-[16/8]'
                      : 'aspect-video'
                  }`}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none" />

                  {/* Interactive Center Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-300">
                      {item.mediaType === 'video' ? (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-black" />
                      )}
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono font-medium tracking-wider uppercase px-2.5 py-1 rounded bg-black/80 border border-neutral-700/80 text-neutral-300 backdrop-blur-md">
                        {item.category}
                      </span>
                      {item.videoUrl && (
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-white/10 text-white border border-white/20 backdrop-blur-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                          4K MASTER
                        </span>
                      )}
                    </div>

                    {item.duration && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-neutral-400 border border-neutral-700/80 backdrop-blur-md">
                        {item.duration}
                      </span>
                    )}
                    {item.dimensions && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-neutral-400 border border-neutral-700/80 backdrop-blur-md">
                        {item.dimensions}
                      </span>
                    )}
                  </div>

                  {/* Bottom View Metric */}
                  {item.views && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] font-mono text-neutral-300 bg-black/80 px-2 py-0.5 rounded border border-neutral-700/80 backdrop-blur-md">
                      <Eye className="w-3 h-3 text-neutral-400" />
                      <span>{item.views}</span>
                    </div>
                  )}
                </div>

                {/* Card Information */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-1">
                      Client: {item.client}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide mb-2 line-clamp-2 group-hover:text-neutral-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-900">
                    {item.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Interactive Before & After Color Grade Showcase */}
        <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl">
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
              Drag the interactive slider below to witness the transformation from flat camera Log sensor footage to the final film-emulated master grade.
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

            {/* Before Image (Flat Log profile) with width clip */}
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

      {/* Media Lightbox Modal (HTML5 Video Player for Videos / High-Res Lightbox for Images) */}
      <AnimatePresence>
        {selectedItem && (
          <div
            id="portfolio-media-modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedItem(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-y-auto p-5 sm:p-7 shadow-2xl"
            >
              <button
                id="close-portfolio-modal"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 rounded-full border border-neutral-800 transition-colors z-20 cursor-pointer"
                aria-label="Close modal preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4 pr-10">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                    {selectedItem.category} • Client: {selectedItem.client}
                  </span>
                  {selectedItem.videoUrl && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                      MASTER 4K PLAYBACK
                    </span>
                  )}
                  {selectedItem.dimensions && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {selectedItem.dimensions}
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedItem.title}
                </h3>
              </div>

              {/* Media Player Container */}
              <div
                className={`relative rounded-xl overflow-hidden bg-black border border-neutral-800 mb-5 flex items-center justify-center shadow-inner ${
                  selectedItem.aspectRatio === '9:16'
                    ? 'max-h-[60vh] aspect-[9/16] mx-auto'
                    : selectedItem.aspectRatio === '3:4'
                    ? 'max-h-[60vh] aspect-[3/4] mx-auto'
                    : selectedItem.aspectRatio === '21:9'
                    ? 'aspect-[21/9]'
                    : 'aspect-video'
                }`}
              >
                {selectedItem.mediaType === 'video' && selectedItem.videoUrl ? (
                  <video
                    ref={videoRef}
                    id="portfolio-active-video-player"
                    src={selectedItem.videoUrl}
                    poster={selectedItem.poster || selectedItem.thumbnail}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={selectedItem.videoUrl} type="video/mp4" />
                    Your browser does not support HTML5 video playback.
                  </video>
                ) : selectedItem.mediaType === 'video' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedItem.thumbnail}
                      alt={selectedItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-xl mb-3">
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </div>
                      <span className="text-sm font-semibold text-white tracking-wider uppercase">
                        Cinematic Master Cut Loaded
                      </span>
                      <span className="text-xs text-neutral-400 font-mono mt-1">
                        4K 60FPS • Stereo Stems Synced
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedItem.thumbnail}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain bg-neutral-950"
                  />
                )}
              </div>

              <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-900">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedItem.tags.map((t, idx) => (
                    <span key={idx} className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  {selectedItem.videoUrl && (
                    <a
                      href={selectedItem.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Direct Video Link
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

