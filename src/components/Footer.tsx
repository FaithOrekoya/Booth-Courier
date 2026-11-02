import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Ship, Train, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050b18] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 text-center md:text-left">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-4 flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-left">
              <div className="w-10 h-10 rounded-xl bg-[#d97706] flex items-center justify-center text-white shadow-md">
                <div className="relative w-6 h-6 flex items-center justify-center">
                  <Ship className="w-3.5 h-3.5 absolute -top-0.5 -left-0.5 text-white/90" />
                  <Train className="w-3.5 h-3.5 absolute -bottom-0.5 -right-0.5 text-white/90" />
                  <Truck className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-none">
                  BOOTH
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Courier Service LLC
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 max-w-sm mx-auto md:mx-0">
              Intermodal logistics and drayage coordination moving freight efficiently from port to rail to final mile.
            </p>

            <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Licensed & Bonded Freight Coordination</span>
            </div>
          </div>

          {/* Core Services */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Port & Drayage Services</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Intermodal Rail Transportation</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">First & Last Mile Delivery</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Visibility & Milestone Tracking</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#advantages" className="hover:text-amber-400 transition-colors">Advantages</a></li>
              <li><a href="#industries" className="hover:text-amber-400 transition-colors">Industries</a></li>
              <li><a href="#why-booth" className="hover:text-amber-400 transition-colors">Why Booth</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a></li>
              <li><a href="#quote-section" className="text-amber-400 font-bold hover:underline">Get a Quote</a></li>
            </ul>
          </div>

          {/* Dispatch Info */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-4">
              Dispatch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-white font-semibold">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>(800) 555-BOOTH</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>dispatch@boothcourierservice.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>48-State & Coastal Port Corridors</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © {currentYear} Booth Courier Service LLC. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
            <a href="#quote-section" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#quote-section" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#quote-section" className="hover:text-slate-400 transition-colors">Carrier Onboarding</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
