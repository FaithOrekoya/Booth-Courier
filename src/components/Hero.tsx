import React from 'react';
import { ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onQuoteClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onQuoteClick, onExploreClick }) => {
  return (
    <section className="relative bg-gray-800 overflow-hidden min-h-[85vh] lg:min-h-[88vh] flex items-center border-b border-gray-700">
      {/* Background Video and Gradient Overlay - shifted right to create breathing room from left text */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-gray-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://res.cloudinary.com/byde2j9a/image/upload/v1793407986/08720a087bd6b90dfaf2b4587461a13a_q5avx2.jpg"
          className="w-full h-full object-cover object-right sm:object-[82%_center] lg:object-[90%_center] transform translate-x-4 sm:translate-x-12 lg:translate-x-28 xl:translate-x-40 scale-105 lg:scale-110 pointer-events-none"
        >
          <source
            src="https://res.cloudinary.com/byde2j9a/video/upload/v1793410260/Requesting_vehicle_moving_video_e1ea664f_ad2xg3.mp4"
            type="video/mp4"
          />
        </video>
        {/* Protective gradient ensuring left text container has crisp legibility and space */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/90 to-gray-900/35 lg:bg-gradient-to-r lg:from-gray-950 lg:from-44% lg:via-gray-950/80 lg:to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-center w-full pt-32 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32">
        
        {/* Left Column (7/12 width on desktop) - brought down with top spacing */}
        <div className="w-full lg:w-7/12 lg:pr-10 text-center lg:text-left relative z-20 pt-4 sm:pt-6 lg:pt-8">

          {/* Social Proof Row moved to the top of the heading */}
          <div className="mb-5 inline-flex items-center justify-center lg:justify-start space-x-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="flex -space-x-1.5">
              <img
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/25 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Shipper"
              />
              <img
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/25 object-cover"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
                alt="Shipper"
              />
              <img
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/25 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Shipper"
              />
            </div>
            <div className="text-[11px] sm:text-xs text-left leading-tight pr-1">
              <div className="flex text-yellow-400 gap-0.5 mb-0.5">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
              </div>
              <div>
                <span className="font-semibold text-white drop-shadow">4.9/5</span>{' '}
                <span className="text-gray-300 drop-shadow">from 2,000+ shippers</span>
              </div>
            </div>
          </div>

          {/* Headline with Yellow/Amber Gradient - Poppins 72px Bold (35px on mobile) */}
          <h1 className="hero-title font-['Poppins',sans-serif] tracking-tight text-white font-bold text-[35px] md:text-[72px] lg:text-[72px] leading-[1.1] mb-6 whitespace-nowrap">
            <span className="block whitespace-nowrap text-white">
              From Port to Rail
            </span>
            <span className="text-gradient block whitespace-nowrap">
              To Final Mile.
            </span>
          </h1>

          {/* Concise supporting copy */}
          <p className="mobile-desc text-lg text-gray-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
            Intermodal logistics and drayage coordination designed to help businesses move freight efficiently across ports, rail networks, distribution centers, and final destinations.
          </p>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={onQuoteClick}
              className="bg-gradient-primary text-white px-6 py-2.5 sm:px-8 sm:py-4 rounded-full font-bold text-sm sm:text-lg shadow-xl shadow-amber-600/30 flex items-center justify-center transition-all hover:shadow-amber-600/40 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <span>Request freight quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" />
            </button>

            <button
              type="button"
              onClick={onExploreClick}
              className="bg-gray-800/80 backdrop-blur hover:bg-gray-700 border border-gray-600 text-white px-6 py-2.5 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-lg flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-sm cursor-pointer"
            >
              <span>Explore our services</span>
            </button>
          </div>

        </div>

        {/* Right Column: TrackMyTire Floating Status Widgets (5/12 width) */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end items-end relative z-20 mt-16 lg:mt-0 hidden md:flex">
          <div className="flex flex-col items-end gap-4 w-full">
            {/* Tech Dispatching Widget */}
            <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 p-4 rounded-2xl shadow-2xl text-right transform translate-x-4 hover:translate-x-0 transition-transform">
              <div className="flex items-center justify-end space-x-2 text-xs font-semibold text-emerald-400 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="uppercase tracking-wider">TECH DISPATCHING</span>
              </div>
              <p className="text-lg font-bold text-white">Arriving in 12 mins</p>
              <p className="text-xs text-gray-400">Port of Long Beach → BNSF Ramp</p>
            </div>

            {/* Verified Service Badge matching TrackMyTire bg-gradient-primary */}
            <div className="bg-gradient-primary px-4 py-2 rounded-xl shadow-lg text-white font-bold text-sm flex items-center transform translate-x-2 hover:translate-x-0 transition-transform">
              <ShieldCheck className="w-4 h-4 mr-2" />
              <span>Verified Service</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
