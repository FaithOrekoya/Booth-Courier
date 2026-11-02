import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '../data/logisticsData.ts';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface IndustriesSectionProps {
  onSelectIndustryForQuote: () => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustryForQuote }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeIndustry = INDUSTRIES_DATA[activeIdx];

  return (
    <section id="industries" className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-slate-950 tracking-tight leading-tight">
            We Work Across Every <br />
            Major Industry.
          </h2>
        </div>

        {/* Transit-style Split Accordion Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left: Dynamic Image of Active Industry - Matching height with the container beside it */}
          <div className="lg:col-span-6 flex">
            <div className="relative rounded-3xl overflow-hidden shadow-xl h-80 sm:h-96 lg:h-full w-full bg-slate-900 border border-slate-200">
              <img
                src={activeIndustry.imageUrl}
                alt={activeIndustry.title}
                key={activeIndustry.imageUrl}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block font-sans">
                    {activeIndustry.tag}
                  </span>
                  <span className="text-base font-extrabold text-slate-950 font-['Poppins',sans-serif]">
                    {activeIndustry.title}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-slate-900 text-white shrink-0 ml-3">
                  {activeIndustry.keyMetric}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Clean Clickable Industry List */}
          <div className="lg:col-span-6 space-y-3">
            {INDUSTRIES_DATA.map((ind, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={ind.id}
                  className={`rounded-2xl border transition-all cursor-pointer ${
                    isOpen
                      ? 'bg-slate-50 border-amber-500/60 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setActiveIdx(idx)}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                      <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950">
                        {ind.title}
                      </h3>
                    </div>

                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 border-t border-slate-200/60 animate-fadeIn">
                      <p className="leading-relaxed mb-4 font-sans">{ind.description}</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectIndustryForQuote();
                        }}
                        className="inline-flex items-center gap-2 text-xs font-bold text-white bg-gradient-primary px-5 py-2.5 rounded-full shadow-md shadow-amber-600/25 active:scale-[0.98] transition-all cursor-pointer font-sans"
                      >
                        <span>Quote {ind.title}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
