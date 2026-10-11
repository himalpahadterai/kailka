import React from 'react';
import { Calendar, Sparkles, Check, ArrowRight } from 'lucide-react';
import { FestivalOffer } from '../types/index.ts';

interface FestivalSectionProps {
  festivals: FestivalOffer[];
  lang: 'en' | 'ne';
  onBookFestival: (festName: string) => void;
}

export const FestivalSection: React.FC<FestivalSectionProps> = ({
  festivals,
  lang,
  onBookFestival
}) => {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E13F60]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ne' ? 'पावन पर्व तथा उत्सव' : 'Holy Festivals of Janakpur'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'चाडपर्व विशेष आतिथ्य' : 'Festival Specials & Pilgrimage Dining'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {lang === 'ne'
              ? 'दशैंको पारिवारिक जमघट, तिहारको मिठास, र छठको पवित्र भक्ति — कालिकामा प्रत्येक चाड अविस्मरणीय बन्छ।'
              : 'Janakpur is defined by devotion and celebration. Celebrate Dashain, Tihar, Chhath Mahaparva, and sacred pilgrimage with Kalika.'}
          </p>
        </div>

        {/* Festival Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {festivals.map((fest) => (
            <div
              key={fest.id}
              className="bg-[#FAF8F5] rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={fest.imageUrl}
                  alt={fest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#E13F60] text-white text-xs font-semibold rounded-md shadow-xs uppercase tracking-wider">
                    {fest.badgeText}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-rose-200 font-semibold block mb-1">
                    {fest.festivalName}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                    {lang === 'ne' ? fest.titleNepali : fest.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-4">
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {lang === 'ne' ? fest.descriptionNepali : fest.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-stone-200">
                    <span className="text-xs font-semibold text-stone-800 uppercase tracking-wide block">
                      Festive Highlights:
                    </span>
                    <ul className="space-y-1.5">
                      {fest.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-stone-700">
                          <Check className="w-3.5 h-3.5 text-[#E13F60] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500 font-medium">
                    Advance booking advised
                  </span>
                  <button
                    onClick={() => onBookFestival(fest.festivalName)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Reserve for {fest.festivalName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
