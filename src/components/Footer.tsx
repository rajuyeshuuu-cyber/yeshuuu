import React from 'react';
import { Film, ArrowUp, Mail, Instagram, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-black text-white border-t border-neutral-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-neutral-900 gap-8">
          {/* Brand */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white">
                <Film className="w-4 h-4 text-neutral-300" />
              </div>
              <span className="font-bold tracking-widest text-lg text-white uppercase font-mono">
                YESHUUU<span className="text-neutral-400 font-light ml-1">EDITS</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs max-w-sm">
              Cinematic post-production studio crafting high-impact videos, film color grades, trailers, and viral content.
            </p>
          </div>

          {/* Socials & Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#process" className="hover:text-white transition-colors">
              Process
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#hire" className="hover:text-white transition-colors">
              Hire Me
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a
              href="mailto:editoryeshuuu@gmail.com"
              className="text-white hover:text-neutral-300 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>editoryeshuuu@gmail.com</span>
            </a>
          </div>

          {/* Back to Top */}
          <button
            id="footer-back-to-top-btn"
            onClick={scrollToTop}
            className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] font-mono text-neutral-400 gap-4">
          <div>
            © {new Date().getFullYear()} YESHUUU EDITS. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Premium Video Post-Production</span>
            <span>•</span>
            <span>4K Master Spec</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
