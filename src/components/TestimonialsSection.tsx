import React from 'react';
import { TESTIMONIALS_DATA } from '../data/servicesData';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                CLIENT FEEDBACK & REVIEWS
              </span>
            </div>
            <h2
              id="testimonials-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              WHAT CREATORS SAY
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
            <span className="text-xs font-mono text-neutral-300 font-semibold">
              5.0 / 5.0 RATING (50+ REVIEWS)
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div
              key={testimonial.id}
              id={`testimonial-card-${testimonial.id}`}
              className="bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 rounded-xl p-7 flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                {/* Rating stars and Project Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-white text-white" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                    {testimonial.projectType}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-900">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-neutral-800"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white tracking-wide">
                      {testimonial.name}
                    </span>
                    <CheckCircle2 className="w-3 h-3 text-neutral-400" />
                  </div>
                  <span className="text-[11px] text-neutral-400 block">
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
