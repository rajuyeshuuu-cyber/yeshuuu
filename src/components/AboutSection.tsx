import React from 'react';
import { Award, Cpu, ShieldCheck, Film, Sparkles, Check } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const softwareStack = [
    { name: 'DaVinci Resolve Studio', role: 'Color Grading & Finishing' },
    { name: 'Adobe Premiere Pro', role: 'Story Cutting & Assembly' },
    { name: 'Adobe After Effects', role: 'Motion Graphics & VFX' },
    { name: 'Adobe Audition', role: 'Sound Design & Mastering' },
    { name: 'Blender 3D', role: '3D Titles & Camera Projection' }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Philosophy & Bio */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-white/70" />
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                BEHIND THE TIMELINE
              </span>
            </div>
            <h2
              id="about-section-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase mb-6 font-heading"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              CRAFTING STORIES WITH SURGICAL PRECISION
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              At <strong className="text-white font-semibold">YESHUUU EDITS</strong>, video editing is treated as an art form of rhythm, psychology, and visual tension. Every frame cut, sound layer, and color adjustment is executed with deliberate intention to capture and hold viewer attention.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Whether editing high-stakes theatrical trailers, viral vertical reels that beat social algorithms, or polished commercial brand films, we ensure your project commands authority and stands out from standard internet noise.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Guaranteed Deadlines
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Strict adherence to delivery timelines with zero missed deadlines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-neutral-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Broadcast Master Spec
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Exported in pristine 4K Prores/H.265 with mastered 24-bit audio stems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Software Suite & Production Tech Box */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-neutral-400" />
                  <span className="text-xs font-mono font-medium text-neutral-300 uppercase tracking-widest">
                    INDUSTRY SOFTWARE STACK
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-900/60 px-2 py-0.5 rounded">
                  PRO SUITE
                </span>
              </div>

              <div className="space-y-3">
                {softwareStack.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-neutral-900/50 border border-neutral-800/80 text-xs"
                  >
                    <span className="font-semibold text-neutral-200 tracking-wide">
                      {tool.name}
                    </span>
                    <span className="font-mono text-neutral-400 text-[11px]">
                      {tool.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hardware / Performance Spec Footnote */}
              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                <span>Color Managed Rec.709 & DCI-P3</span>
                <span>Spatial Audio Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
