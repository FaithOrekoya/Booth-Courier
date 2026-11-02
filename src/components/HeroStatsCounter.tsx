import React, { useEffect, useState, useRef } from 'react';
import { Clock, Truck, Headphones } from 'lucide-react';

export const HeroStatsCounter: React.FC = () => {
  const [pickupCount, setPickupCount] = useState(0);
  const [loadsCount, setLoadsCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate 0 -> 98 (%)
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setPickupCount(Math.round(easeProgress * 98));
            setLoadsCount(Math.round(easeProgress * 5000));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={counterRef}
      className="relative z-30 bg-[#0a1128] border-b border-slate-800 text-white shadow-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
          
          {/* Stat 1: 98% on-time pickup */}
          <div className="flex items-center justify-center gap-4 px-4 py-2 md:py-0">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight flex items-baseline">
                <span className="text-amber-400 font-num">{pickupCount}</span>
                <span className="text-amber-400 text-2xl sm:text-3xl ml-0.5">%</span>
              </div>
              <div className="text-sm font-bold text-slate-200 uppercase tracking-wider mt-0.5 font-sans">
                On-Time Pickup
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Guaranteed gate appointment accuracy
              </div>
            </div>
          </div>

          {/* Stat 2: 5000+ Loads delivered */}
          <div className="flex items-center justify-center gap-4 px-4 py-4 md:py-0">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight flex items-baseline">
                <span className="text-amber-400 font-num">{loadsCount.toLocaleString()}</span>
                <span className="text-amber-400 text-2xl sm:text-3xl ml-0.5">+</span>
              </div>
              <div className="text-sm font-bold text-slate-200 uppercase tracking-wider mt-0.5 font-sans">
                Loads Delivered
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Intermodal & drayage shipments completed
              </div>
            </div>
          </div>

          {/* Stat 3: 24/7 Customer Support */}
          <div className="flex items-center justify-center gap-4 px-4 py-4 md:py-0">
            <div className="w-13 h-13 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400 font-heading tracking-tight flex items-center gap-2">
                <span className="font-num">24/7</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <div className="text-sm font-bold text-slate-200 uppercase tracking-wider mt-0.5 font-sans">
                Customer Support
              </div>
              <div className="text-xs text-slate-400 font-sans">
                Direct dispatch coordinator on duty
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
