import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, Ship, Train, Truck } from 'lucide-react';

interface HeaderProps {
  onOpenQuote?: () => void;
  onOpenTrack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenTrack }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Why Booth', href: '#why-booth' },
    { label: 'Industries', href: '#industries' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteClick = () => {
    setMobileMenuOpen(false);
    if (onOpenQuote) {
      onOpenQuote();
    } else {
      const el = document.getElementById('quote-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0a1128]/95 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg shadow-black/20'
          : 'bg-[#0a1128] border-b border-slate-800/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Navy/Amber contrast */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Ship className="w-3.5 h-3.5 absolute -top-0.5 -left-0.5 text-white/90" />
                <Train className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 text-white/90" />
                <Truck className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5 leading-none">
                BOOTH
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider border border-amber-500/30">
                  Logistics
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
                Courier Service LLC
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenTrack}
              className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Track quote
            </button>

            <a
              href="tel:18005552668"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>(800) 555-BOOTH</span>
            </a>

            <button
              type="button"
              onClick={handleQuoteClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-primary active:scale-[0.98] transition-all shadow-md shadow-amber-500/25 cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-5 border-t border-slate-800 bg-[#0a1128] rounded-b-2xl shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400 hover:bg-slate-850 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenTrack) onOpenTrack();
                  }}
                  className="text-left px-3 py-2 text-sm font-semibold text-slate-200 hover:text-amber-400"
                >
                  Track Quote Status
                </button>
                <button
                  type="button"
                  onClick={handleQuoteClick}
                  className="w-full py-3 px-4 rounded-full text-sm font-bold text-white bg-gradient-primary transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/25"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
