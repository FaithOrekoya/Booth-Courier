import React from 'react';
import { Clock, ShieldCheck, Tag, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface CompanyIntroProps {
  onQuoteClick?: () => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({ onQuoteClick }) => {
  const features = [
    {
      id: 'save-money',
      icon: Clock,
      title: 'SAVE TIME & MONEY',
      desc: 'Up to 30% savings via rail. No waiting at terminal gates.',
    },
    {
      id: 'stay-safe',
      icon: ShieldCheck,
      title: 'STAY ON TIME',
      desc: 'Pre-cleared port appointments prevent costly demurrage.',
    },
    {
      id: 'no-fees',
      icon: Tag,
      title: 'NO HIDDEN FEES',
      desc: 'Transparent locked rates with zero surprise accessorials.',
    },
    {
      id: 'top-rated',
      icon: ThumbsUp,
      title: 'TOP RATED',
      desc: 'Dedicated single coordinator who knows your freight lanes.',
    },
  ];

  return (
    <section className="relative py-24 bg-[#111927] text-white overflow-hidden">
      {/* Background imagery with subtle dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=2000&q=80"
          alt="Intermodal freight rail corridor"
          className="w-full h-full object-cover object-right opacity-25 filter grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111927] via-[#111927]/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Two-tone headline inspired by trackmytire.com */}
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-white tracking-tight leading-tight mb-4">
            Intermodal logistics <br />
            <span className="text-[#d97706] text-amber-500">
              That protects your margin.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-12">
            Skip terminal bottlenecks and chassis shortages. We coordinate certified drayage partners and Class I rail networks so your freight stays on schedule and on budget.
          </p>

          {/* 4 Circular Outline Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.id} className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-500 text-amber-400 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={onQuoteClick}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#d97706] hover:bg-[#b45309] transition-all shadow-lg shadow-amber-600/30 cursor-pointer"
            >
              Request quote now
            </button>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Fast. Reliable. Coordinated. Freight reimagined.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
