import React, { useState } from 'react';
import { FAQ_DATA } from '../data/logisticsData.ts';
import { ChevronDown, PhoneCall } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-slate-950 tracking-tight leading-tight">
            Frequently Asked Questions.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Quick answers about our port drayage, rail corridors, and quotes.
          </p>
        </div>

        {/* Clean Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            const contentId = `faq-content-${faq.id}`;
            const headerId = `faq-header-${faq.id}`;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'border-amber-500/60 bg-white shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold font-['Poppins',sans-serif] text-[16px] text-slate-950 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60"
                  >
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Dispatch Help */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm font-bold">Need custom rate coordination?</div>
            <div className="text-xs text-slate-400">Speak directly with our senior dispatch coordinator.</div>
          </div>
          <a
            href="tel:18005552668"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>(800) 555-BOOTH</span>
          </a>
        </div>

      </div>
    </section>
  );
};
