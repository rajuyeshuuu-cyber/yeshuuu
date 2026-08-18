import React, { useState, useEffect } from 'react';
import { Menu, X, Film, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="brand-logo-link"
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-white group-hover:border-neutral-500 transition-colors shadow-inner">
            <Film className="w-4 h-4 text-neutral-300 group-hover:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-widest text-base sm:text-lg text-white group-hover:text-neutral-200 transition-colors uppercase font-mono">
              YESHUUU<span className="text-neutral-400 font-light ml-1">EDITS</span>
            </span>
            <span className="text-[10px] tracking-wider text-neutral-500 uppercase -mt-1 font-mono">
              Cinematic Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors font-medium relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-get-quote-btn"
            onClick={() => onOpenQuote()}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-widest bg-white text-black hover:bg-neutral-200 transition-all rounded-md flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95 cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-quote-btn-compact"
            onClick={() => onOpenQuote()}
            className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider bg-white text-black rounded text-center"
          >
            Quote
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none rounded-md border border-neutral-800 bg-neutral-950"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-neutral-950/95 border-b border-neutral-800 px-6 py-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`mobile-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium tracking-wider uppercase text-neutral-300 hover:text-white py-2 border-b border-neutral-900"
              >
                {link.name}
              </a>
            ))}
            <button
              id="mobile-drawer-get-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="mt-2 w-full py-3 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-md flex items-center justify-center gap-2"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
