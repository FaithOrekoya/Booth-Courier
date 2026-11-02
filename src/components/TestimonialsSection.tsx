import React from 'react';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      initial: 'R',
      author: 'Robert Vance',
      role: 'Director of Inbound Logistics',
      quote:
        'Booth eliminated our recurring port demurrage fees at Long Beach. Containers are out-gated hours after vessel discharge. Absolute lifesaver for our supply chain.',
    },
    {
      id: 'rev-2',
      initial: 'E',
      author: 'Elena Rostova',
      role: 'VP of Transportation',
      quote:
        'Moving our cross-country freight via Booth saved us 28% compared to solo truckload. The tracking alerts kept our DC managers completely informed.',
    },
    {
      id: 'rev-3',
      initial: 'M',
      author: 'Marcus Holloway',
      role: 'Verified Enterprise Shipper',
      quote:
        'As an importer of refrigerated cargo, this coordination has streamlined everything. Pre-allocated chassis and GenSet readiness before the vessel docks.',
    },
  ];

  const slideImages = [
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412012/IMG_0931_vlggvi.jpg',
      alt: 'Booth Intermodal Logistics Fleet Operations',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412012/IMG_2604_to3bxq.jpg',
      alt: 'Booth Heavy Haul & Drayage Transport',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412012/IMG_0930_svvst6.jpg',
      alt: 'Harbor Gate & Terminal Staging',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412012/IMG_2502_mrjzcl.jpg',
      alt: 'Intermodal Container Transport on Highway',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412012/IMG_2494_klgqp8.jpg',
      alt: 'Terminal Ramp Coordination',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412006/IMG_2503_mmcc32.jpg',
      alt: 'Dedicated Truckload & Final Mile Delivery',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412008/IMG_2905_rrr91m.jpg',
      alt: 'Booth Heavy Commercial Equipment Fleet',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412004/IMG_2605_jirt77.jpg',
      alt: 'Port Berthing & Container Handling',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412002/IMG_2433_cjwbtb.jpg',
      alt: 'Intermodal Rail & Railhead Dispatch',
    },
    {
      url: 'https://res.cloudinary.com/byde2j9a/image/upload/v1793412002/IMG_3324_zsgtzv.jpg',
      alt: 'Certified Fleet Operators on Route',
    },
  ];

  return (
    <section id="reviews" className="py-24 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-100/80 px-3 py-1 rounded-full mb-3">
            Reviews & Experiences
          </span>
          <h2 className="text-3xl sm:text-[40px] font-bold font-['Poppins',sans-serif] text-slate-950 tracking-tight leading-tight">
            Trusted by Shippers <br />
            Across the Nation.
          </h2>
        </div>

        {/* 3 Clean Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-slate-50/70 rounded-3xl p-8 border border-slate-200/90 shadow-xs hover:shadow-lg hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Gold Stars */}
                <div className="flex text-amber-500 gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-8">
                  "{r.quote}"
                </p>
              </div>

              {/* Author Row with Initial Badge */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full bg-[#d97706] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {r.initial}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-950">{r.author}</h4>
                  <p className="text-xs text-amber-700 font-semibold">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width continuous left-sliding track touching the edge of the section */}
      <div className="w-full overflow-hidden mt-16 sm:mt-20 py-2">
        <div className="animate-marquee-left flex gap-5">
          {[...slideImages, ...slideImages].map((img, idx) => (
            <div
              key={`${img.url}-${idx}`}
              className="h-80 sm:h-96 md:h-[420px] aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-900 shrink-0 group relative cursor-pointer"
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover aspect-[3/4] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md border border-slate-700/60 font-sans">
                  {img.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
