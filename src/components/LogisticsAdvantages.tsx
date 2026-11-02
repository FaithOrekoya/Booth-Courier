import React from 'react';
import { GitMerge, Compass, Radio, Headphones, ArrowRight } from 'lucide-react';

export const LogisticsAdvantages: React.FC = () => {
  const advantages = [
    {
      id: 'integrated',
      title: 'Integrated Freight Coordination',
      icon: GitMerge,
      desc: 'Seamless transfers linking ocean ports, rail yards, and highway cartage into one coordinated route.',
    },
    {
      id: 'flexible',
      title: 'Flexible Transportation Options',
      icon: Compass,
      desc: 'Adaptive multi-modal routing tailored to your cargo urgency, container size, and budget.',
    },
    {
      id: 'communication',
      title: 'Clear Shipment Communication',
      icon: Radio,
      desc: 'Automated milestone notifications and real-time gate scans without manual follow-up required.',
    },
    {
      id: 'support',
      title: 'Customer-Focused Support',
      icon: Headphones,
      desc: 'Direct phone line to dedicated freight coordinators who know your lanes, not a call center.',
    },
  ];

  return (
    <section id="advantages" className="py-20 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/70 px-3 py-1 rounded-full mb-3">
            Core Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Built for Speed and Predictability.
          </h2>
          <p className="text-base text-slate-600 mt-2">
            Why enterprise shippers trust Booth Courier Service LLC with critical container movements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-amber-500/60 transition-all hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0a1128] text-amber-400 flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono text-slate-400 mb-1">0{idx + 1}</div>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-200/80 flex items-center text-xs font-bold text-amber-600">
                  <span>Explore Advantage</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
