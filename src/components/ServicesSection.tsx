import React from 'react';
import { ArrowUpRight, Scissors, Film, Clapperboard, Smartphone, Briefcase, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  // Helper to render subtle service category icons
  const getIcon = (id: string) => {
    switch (id) {
      case 'video-editing':
        return <Scissors className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'cinematic-editing':
        return <Film className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'trailer-editing':
        return <Clapperboard className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'reels-shorts-editing':
        return <Smartphone className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'commercial-editing':
        return <Briefcase className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      case 'motion-graphics':
        return <Sparkles className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
      default:
        return <Film className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative border-t border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                OUR DISCIPLINES & EXPERTISE
              </span>
            </div>
            <h2
              id="services-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              SERVICES
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Tailored post-production solutions crafted for creators, filmmakers, and brands. 
            Click explore to review full capabilities.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group relative bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-600 rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/80 hover:-translate-y-1"
            >
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:border-neutral-700 transition-colors">
                  {getIcon(service.id)}
                </div>
                <span className="text-xs font-mono font-medium text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  0{index + 1}
                </span>
              </div>

              {/* Service Content: Name + Very Short Description (NO PRICING) */}
              <div className="mb-8">
                <h3
                  id={`service-name-${service.id}`}
                  className="text-lg sm:text-xl font-bold tracking-wider text-white uppercase mb-3 group-hover:text-neutral-100 transition-colors"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {service.name}
                </h3>
                <p
                  id={`service-desc-${service.id}`}
                  className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal"
                >
                  {service.shortDescription}
                </p>
              </div>

              {/* EXPLORE Button */}
              <button
                id={`service-explore-btn-${service.id}`}
                onClick={() => onSelectService(service)}
                className="w-full py-3 px-4 bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 text-neutral-200 group-hover:text-white hover:bg-neutral-800 font-semibold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-between active:scale-[0.98] cursor-pointer"
                aria-label={`Explore details for ${service.name}`}
              >
                <span>EXPLORE</span>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
