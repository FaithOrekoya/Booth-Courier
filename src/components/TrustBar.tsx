import React from 'react';
import { ShieldCheck, Truck, Anchor, Train } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6">
          Trusted by commercial shippers and carriers across North America
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-700">
          <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight hover:text-slate-950 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>SafeFreight</span>
          </div>

          <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight hover:text-slate-950 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Train className="w-4 h-4" />
            </div>
            <span>RailPro</span>
          </div>

          <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight hover:text-slate-950 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Anchor className="w-4 h-4" />
            </div>
            <span>PortDirect</span>
          </div>

          <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base tracking-tight hover:text-slate-950 transition-colors">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Truck className="w-4 h-4" />
            </div>
            <span>TransFleet</span>
          </div>
        </div>
      </div>
    </section>
  );
};
