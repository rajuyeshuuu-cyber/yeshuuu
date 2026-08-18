import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ShieldCheck, Clock, Layers, Sparkles } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onGetQuote: (service: ServiceItem) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
  onGetQuote,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <AnimatePresence>
      <div
        id="service-detail-modal-container"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-service-title"
      >
        {/* Backdrop */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          id="service-detail-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl shadow-black p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Subtle top spotlight & cinematic border gradient */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-neutral-700/15 blur-[60px] pointer-events-none" />

          {/* Close Button */}
          <button
            id="service-modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all cursor-pointer focus:outline-none"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Tag / Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-medium tracking-widest text-neutral-400 uppercase border border-neutral-800 bg-neutral-900/80 px-2.5 py-1 rounded">
              SERVICE DETAILS
            </span>
            <span className="text-[11px] font-mono tracking-wider text-neutral-500">
              YESHUUU EDITS
            </span>
          </div>

          {/* Service Name */}
          <h2
            id="modal-service-title"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide uppercase mb-3 font-heading"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            {service.name}
          </h2>

          {/* Professional Service Description */}
          <p
            id="modal-service-description"
            className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal"
          >
            {service.fullDescription}
          </p>

          {/* Pricing Box - Highlighted according to prompt */}
          <div
            id="modal-service-pricing-box"
            className="mb-6 p-4 sm:p-5 rounded-xl bg-neutral-900/70 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 block font-medium">
                PRICING
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-sm font-normal text-neutral-400">Starting from</span>
                <span
                  id="modal-service-price-tag"
                  className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono"
                >
                  {service.startingPrice}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span>{service.turnaround}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
                <span>Master 4K Ready</span>
              </div>
            </div>
          </div>

          {/* WHAT'S INCLUDED Section */}
          <div id="modal-service-includes-container" className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-neutral-300 mb-3 flex items-center gap-2 font-mono">
              <span>WHAT'S INCLUDED</span>
              <div className="h-[1px] flex-1 bg-neutral-800" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.includes.map((feature, idx) => (
                <div
                  key={idx}
                  id={`modal-feature-item-${idx}`}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800/60 text-neutral-200 text-xs sm:text-sm font-normal"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-white shrink-0">
                    <Check className="w-3 h-3 text-neutral-200" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer with prominent GET A QUOTE button and Return button */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-800/80">
            <button
              id="modal-return-to-services-btn"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-medium uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors text-center cursor-pointer"
            >
              Return to Services
            </button>

            <button
              id="modal-get-a-quote-btn"
              onClick={() => onGetQuote(service)}
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl shadow-white/10 active:scale-95 cursor-pointer"
            >
              <span>GET A QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
