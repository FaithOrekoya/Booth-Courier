import React from 'react';
import { ArrowRight, Anchor, Train, Truck, Radio } from 'lucide-react';
import { SERVICES_DATA } from '../data/logisticsData.ts';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceType: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'port-drayage':
        return Anchor;
      case 'intermodal-rail':
        return Train;
      case 'first-last-mile':
        return Truck;
      default:
        return Radio;
    }
  };

  return (
    <section id="services" className="py-24 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Header - Shortened to 2 clean lines */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-slate-950 tracking-tight leading-tight sm:whitespace-nowrap">
            Expert Freight, <br className="sm:hidden" />
            Zero Hassle.
          </h2>
        </div>

        {/* 4 Clean Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service, index) => {
            const Icon = getIcon(service.id);
            const isPopular = index === 0;

            return (
              <div
                key={service.id}
                className="group relative bg-slate-50/70 rounded-3xl p-7 border border-slate-200/90 hover:border-amber-500/50 hover:bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Popular Ribbon Tag */}
                {isPopular && (
                  <div className="absolute top-0 right-7 -translate-y-1/2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#d97706] text-white shadow-md">
                      Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Square Warm Amber Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-[#d97706] text-white flex items-center justify-center mb-6 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950 mb-3 group-hover:text-amber-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectServiceForQuote(service.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                  >
                    <span>Request quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                    {service.typicalTransit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
