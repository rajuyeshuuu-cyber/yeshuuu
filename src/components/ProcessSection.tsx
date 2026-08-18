import React from 'react';
import { PROCESS_STEPS } from '../data/servicesData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-800/80 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                THE POST-PRODUCTION PIPELINE
              </span>
            </div>
            <h2
              id="process-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase font-heading"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              HOW WE WORK
            </h2>
          </div>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            A frictionless 4-step pipeline designed to take your raw footage to broadcast master files with zero stress and rapid turnaround.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.stepNumber}
              id={`process-step-${step.stepNumber}`}
              className="bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group"
            >
              {/* Step Number */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl sm:text-4xl font-extrabold text-neutral-600 group-hover:text-white font-mono transition-colors">
                  {step.stepNumber}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900">
                  PHASE {idx + 1}
                </span>
              </div>

              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Step bullet details */}
              <div className="space-y-1.5 pt-4 border-t border-neutral-900">
                {step.details.map((d, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[11px] text-neutral-300 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white transition-colors" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
