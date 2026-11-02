import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { HeroStatsCounter } from './components/HeroStatsCounter.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { CompanyIntro } from './components/CompanyIntro.tsx';
import { HowItWorks } from './components/HowItWorks.tsx';
import { IndustriesSection } from './components/IndustriesSection.tsx';
import { WhyChooseBooth } from './components/WhyChooseBooth.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { CtaBanner } from './components/CtaBanner.tsx';
import { FreightQuoteSection } from './components/FreightQuoteSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Search, X, MapPin, Truck, Clock } from 'lucide-react';

export default function App() {
  const [selectedFreightType, setSelectedFreightType] = useState<string>('port-drayage');
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingRefInput, setTrackingRefInput] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  const scrollToQuote = (freightType?: string) => {
    if (freightType) {
      setSelectedFreightType(freightType);
    }
    const el = document.getElementById('quote-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingRefInput.trim()) return;

    setTrackingLoading(true);
    setTrackingError(null);
    setTrackingResult(null);

    try {
      const res = await fetch(`/api/quote/${encodeURIComponent(trackingRefInput.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Reference ID not found.');
      }
      setTrackingResult(data.quote);
    } catch (err: any) {
      setTrackingError(err.message || 'Unable to locate reference. Please check your reference code.');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      {/* 1. Header with clean white navbar & amber CTA */}
      <Header
        onOpenQuote={() => scrollToQuote()}
        onOpenTrack={() => setTrackingModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onQuoteClick={() => scrollToQuote()}
          onExploreClick={scrollToServices}
        />

        {/* 2.5 Hero Stats Counter */}
        <HeroStatsCounter />

        {/* 3. Services Section (TrackMyTire 4-card grid) */}
        <ServicesSection onSelectServiceForQuote={(type) => scrollToQuote(type)} />

        {/* 5. Company Intro / Feature Banner */}
        <CompanyIntro onQuoteClick={() => scrollToQuote()} />

        {/* 6. How It Works Timeline */}
        <HowItWorks onStartQuote={() => scrollToQuote()} />

        {/* 7. Industries Grid */}
        <IndustriesSection onSelectIndustryForQuote={() => scrollToQuote()} />

        {/* 8. Why Choose Booth */}
        <WhyChooseBooth />

        {/* 9. Testimonials (TrackMyTire 3-card review grid) */}
        <TestimonialsSection />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Freight Quote Form (Separate section before CTA) */}
        <FreightQuoteSection initialFreightType={selectedFreightType} />

        {/* 12. Call to Action Banner */}
        <CtaBanner onQuoteClick={() => scrollToQuote()} />
      </main>

      {/* 13. Footer */}
      <Footer />

      {/* Floating Track Status Button */}
      <aside aria-label="Tracking Portal" className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setTrackingModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111927] text-white text-xs font-bold border border-slate-700 shadow-xl hover:border-amber-500 transition-all cursor-pointer hover:scale-105"
        >
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span>Track Quote</span>
        </button>
      </aside>

      {/* Tracking Modal */}
      {trackingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tracking-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setTrackingModalOpen(false)}
        >
          <div
            className="bg-[#111927] border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setTrackingModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close tracking modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block mb-1">
              Dispatch Portal
            </span>

            <h3 id="tracking-modal-title" className="text-xl sm:text-2xl font-bold mb-2">
              Look Up Shipment Reference
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Enter your quote reference code (e.g. <code className="text-amber-400 font-mono">BCS-Q-7721A</code>) to check status.
            </p>

            <form onSubmit={handleTrackSubmit} className="space-y-4 mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={trackingRefInput}
                  onChange={(e) => setTrackingRefInput(e.target.value)}
                  placeholder="BCS-Q-..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono uppercase"
                />
                <button
                  type="submit"
                  disabled={trackingLoading || !trackingRefInput.trim()}
                  className="px-6 py-2.5 rounded-full bg-gradient-primary text-white text-sm font-bold transition-all shadow-md shadow-amber-600/25 active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {trackingLoading ? 'Checking...' : 'Search'}
                </button>
              </div>
            </form>

            {trackingError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 mb-4">
                {trackingError}
              </div>
            )}

            {trackingResult && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-mono text-amber-400 font-bold">
                    {trackingResult.referenceId}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Status: {trackingResult.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>
                      {trackingResult.data.originLocation} → {trackingResult.data.destinationLocation}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{trackingResult.data.freightType}</span>
                  </div>
                  {trackingResult.estimate && (
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {trackingResult.estimate.estimatedTransitDaysMin}-{trackingResult.estimate.estimatedTransitDaysMax} days est. transit
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
