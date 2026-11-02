import React from 'react';
import { ArrowRight, ClipboardList, Route, Truck, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onStartQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartQuote }) => {
  const steps = [
    {
      num: '01',
      title: 'Enter shipment details',
      desc: 'Submit your container specs, origin terminal or ramp, and delivery dock.',
      icon: ClipboardList,
    },
    {
      num: '02',
      title: 'Review rate options',
      desc: 'Receive transparent multi-modal routing and locked pricing within 60 minutes.',
      icon: Route,
    },
    {
      num: '03',
      title: 'Dispatch & coordinate',
      desc: 'We secure gate appointments, chassis allocations, and rail interchange.',
      icon: Truck,
    },
    {
      num: '04',
      title: 'Track to delivery',
      desc: 'Get automated gate milestone scans and digital Proof of Delivery.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-slate-950 tracking-tight leading-tight">
            Coordinated freight in <br />
            four simple steps.
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="flex flex-col items-start bg-white rounded-3xl p-7 border border-slate-200/90 hover:border-amber-500/50 transition-all shadow-xs hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#111927] text-amber-400 flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="text-xs font-mono font-bold text-[#d97706] mb-1">
                  STEP {step.num}
                </div>

                <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950 mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            onClick={onStartQuote}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-[#d97706] hover:bg-[#b45309] transition-all shadow-md shadow-amber-600/20 cursor-pointer"
          >
            <span>Start with Step 01</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
