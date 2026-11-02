import React from 'react';
import { ShieldCheck, Eye, UserCheck, Train } from 'lucide-react';

export const WhyChooseBooth: React.FC = () => {
  return (
    <section id="why-booth" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-slate-950 tracking-tight leading-tight">
            Why Businesses Choose Booth.
          </h2>
        </div>

        {/* Transit-style 4-Card Flanking Center Image Composition */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left 2 Cards */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0a1128] text-amber-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950 mb-1">
                  Demurrage Mitigation
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Pre-cleared terminal gate reservations protect against dock storage fees.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0a1128] text-amber-400 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950 mb-1">
                  Real-Time Visibility
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Automated milestone updates from pier berth to delivery dock.
                </p>
              </div>
            </div>

            {/* Center Visual Video */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden h-80 sm:h-96 shadow-md bg-slate-950">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pointer-events-none"
              >
                <source
                  src="https://res.cloudinary.com/byde2j9a/video/upload/v1793410639/Moving_train_front_view_a64fbc2b_t0-2.7_ldvhor.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0a1128]/90 text-white border border-slate-700 backdrop-blur-md">
                  Dedicated Intermodal Logistics Network
                </span>
              </div>
            </div>

            {/* Right 2 Cards */}
            <div className="lg:col-span-3 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0a1128] text-amber-400 flex items-center justify-center mb-4">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950 mb-1">
                  Dedicated Coordinator
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Direct phone access to a dedicated logistics specialist who manages your lanes.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#0a1128] text-amber-400 flex items-center justify-center mb-4">
                  <Train className="w-5 h-5" />
                </div>
                <h3 className="text-[16px] font-bold font-['Poppins',sans-serif] text-slate-950 mb-1">
                  Rail Cost Synergies
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Class I rail intermodal corridors saving up to 30% on 500+ mile lanes.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
