import React from 'react';
import { motion } from 'motion/react';
import {
  Smartphone,
  Tv,
  Clapperboard,
  Bot,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { ServiceItem, PortfolioCategory } from '../types';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService?: (service: ServiceItem) => void;
  onViewPortfolioCategory?: (category: PortfolioCategory) => void;
  onHireService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
  onViewPortfolioCategory,
  onHireService,
}) => {
  // Minimal visual icon selector for each of the 7 services
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'reels-editing':
        return <Smartphone className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      case 'corporate-ads':
        return <Tv className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      case 'trailer-editing':
        return <Clapperboard className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      case 'ai-video-editing':
        return <Bot className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      case 'poster-design':
        return <ImageIcon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      case 'banner-design':
        return <Layers className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      case 'thumbnail-design':
        return <Sparkles className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
      default:
        return <Sparkles className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors" />;
    }
  };

  const handleViewPortfolio = (category: PortfolioCategory) => {
    if (onViewPortfolioCategory) {
      onViewPortfolioCategory(category);
    } else {
      const el = document.querySelector('#work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleHireClick = (service: ServiceItem) => {
    if (onHireService) {
      onHireService(service);
    } else if (onSelectService) {
      onSelectService(service);
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative border-t border-neutral-900 overflow-hidden"
    >
      {/* Subtle Ambient Background Highlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
            Professional post-production and digital graphic solutions crafted for creators, businesses, and cinematic productions.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div
          id="services-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group relative bg-neutral-950/70 border border-neutral-800/80 hover:border-neutral-600 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/90 backdrop-blur-xl"
            >
              {/* Subtle Top Edge Highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-t-2xl group-hover:via-white/30 transition-all duration-300" />

              <div>
                {/* Header: Icon + Card Index + Info */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center group-hover:border-neutral-700 transition-colors shadow-inner">
                    {getServiceIcon(service.id)}
                  </div>
                  <div className="flex items-center gap-2">
                    {onSelectService && (
                      <button
                        onClick={() => onSelectService(service)}
                        className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all cursor-pointer"
                        title="View full service details"
                        aria-label={`View full details for ${service.name}`}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    )}
                    <span className="text-xs font-mono font-medium text-neutral-500 group-hover:text-neutral-400 transition-colors">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Service Name */}
                <h3
                  id={`service-name-${service.id}`}
                  className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase mb-2.5 group-hover:text-neutral-100 transition-colors font-heading"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  {service.name}
                </h3>

                {/* Short Description */}
                <p
                  id={`service-desc-${service.id}`}
                  className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-normal mb-6 min-h-[40px]"
                >
                  {service.shortDescription}
                </p>
              </div>

              {/* Pricing & Actions */}
              <div className="pt-5 border-t border-neutral-900/90">
                {/* Starting Price Display */}
                <div className="flex items-baseline justify-between mb-5">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                    Starting from
                  </span>
                  <span
                    id={`service-price-${service.id}`}
                    className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight"
                  >
                    {service.startingPrice}
                  </span>
                </div>

                {/* Action Buttons: View Portfolio & Hire Me */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    id={`service-portfolio-btn-${service.id}`}
                    onClick={() => handleViewPortfolio(service.portfolioCategory)}
                    className="min-h-[44px] py-2.5 px-3 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-semibold text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                    aria-label={`View Portfolio for ${service.name}`}
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-200" />
                  </button>

                  <button
                    id={`service-hire-btn-${service.id}`}
                    onClick={() => handleHireClick(service)}
                    className="min-h-[44px] py-2.5 px-3 bg-white hover:bg-neutral-200 text-black font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-white/5 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                    aria-label={`Hire Me for ${service.name}`}
                  >
                    <span>Hire Me</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
