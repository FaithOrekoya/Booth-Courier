import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CtaBannerProps {
  onQuoteClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onQuoteClick }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111927] via-[#1a2638] to-[#111927] p-10 sm:p-16 text-center text-white shadow-2xl border border-slate-800">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-white tracking-tight leading-tight mb-4">
              Ready to move your freight?
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Submit your shipment in seconds. Get locked rate confirmation and equipment availability in minutes.
            </p>
            <button
              type="button"
              onClick={onQuoteClick}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full text-base font-bold text-white bg-gradient-primary shadow-xl shadow-amber-600/30 hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get started now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
