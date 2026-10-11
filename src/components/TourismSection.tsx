import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink, Info } from 'lucide-react';
import { TourismDestination } from '../types/index.ts';

interface TourismSectionProps {
  destinations: TourismDestination[];
  lang: 'en' | 'ne';
}

export const TourismSection: React.FC<TourismSectionProps> = ({
  destinations,
  lang
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E13F60]">
            <Compass className="w-3.5 h-3.5" />
            <span>{lang === 'ne' ? 'पावन मिथिला तीर्थ' : 'Heritage & Pilgrimage Guide'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'जनकपुरधामका प्रमुख धार्मिक स्थलहरू' : 'Explore Nearby Janakpur'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {lang === 'ne'
              ? 'जनकपुरधामको पवित्र यात्रामा जानकी मन्दिर, राजदेवी मन्दिर र गङ्गासागरको दर्शन गर्नुहोस् र कालिकामा स्वादिष्ट भोजन लिनुहोस्।'
              : 'Discover the sanctified heritage of Mithilanchal. Visit world-renowned temples and holy lakes located within the Janakpur cultural corridor.'}
          </p>
        </div>

        {/* Tourist Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl font-bold leading-tight drop-shadow-sm">
                    {lang === 'ne' ? dest.nepaliName : dest.name}
                  </h3>
                  <p className="text-xs text-rose-200 font-medium">
                    {dest.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                  <p>{dest.description}</p>
                  
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <div>
                      <span className="font-semibold text-stone-800 block mb-0.5">
                        Cultural &amp; Spiritual Importance:
                      </span>
                      <span>{dest.culturalSignificance}</span>
                    </div>

                    <div className="flex items-start gap-1.5 text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                      <Info className="w-3.5 h-3.5 text-[#E13F60] shrink-0 mt-0.5" />
                      <span>{dest.travelNote}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <a
                    href={dest.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-semibold text-stone-800 hover:text-white bg-stone-100 hover:bg-[#E13F60] rounded-lg transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Google Maps Directions</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Note */}
        <div className="mt-12 bg-white rounded-xl border border-stone-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-50 text-[#E13F60] rounded-lg shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-stone-900 text-sm">
                Visiting Janakpur for Temple Darshan?
              </p>
              <p>
                Kalika Hotel &amp; Restaurant is conveniently located to refresh, dine, and relax with family before and after temple visits.
              </p>
            </div>
          </div>
          <a
            href="tel:+9779801650550"
            className="px-4 py-2 bg-stone-900 text-white font-medium rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap"
          >
            Call for Directions (+977 9801650550)
          </a>
        </div>

      </div>
    </section>
  );
};
