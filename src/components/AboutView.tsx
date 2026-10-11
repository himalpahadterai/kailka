import React from 'react';
import { Utensils, Heart, Award, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface AboutViewProps {
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  settings,
  lang,
  onNavigate
}) => {
  return (
    <div className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header with Official Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-white p-2 border border-stone-200 shadow-sm mx-auto flex items-center justify-center">
            <img
              src={settings.logoUrl || '/assets/logo.svg'}
              alt="Kalika Official Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#E13F60]">
            {lang === 'ne' ? 'हाम्रो कथा र आतिथ्य परम्परा' : 'Heritage & Culinary Roots · Janakpurdham'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'कालिका होटल तथा रेस्टुरेन्ट' : 'About Kalika Hotel & Restaurant'}
          </h1>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light">
            {lang === 'ne' ? settings.taglineNepali : settings.tagline}
          </p>
        </div>

        {/* Story Section Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5 text-sm sm:text-base text-stone-700 leading-relaxed">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {lang === 'ne' ? 'पवित्र जनकपुरमा न्यानो स्वागत' : 'Celebrating Mithila Culinary Hospitality'}
            </h2>
            <p>
              Located in the heart of Janakpurdham, Madhesh Province, Nepal, <strong>Kalika Hotel &amp; Restaurant</strong> was established to provide an authentic, hygienic, and joyous dining destination for local families, travelers, and pilgrims visiting holy Mithila.
            </p>
            <p>
              Janakpur is renowned worldwide as the sacred city of King Janak and Goddess Sita. In Mithila culture, food is not merely sustenance — it is a holy blessing offered with warmth, respect, and love. Our kitchen pays homage to these timeless culinary arts, utilizing traditional cold-pressed mustard oils, freshly ground panch phoron, indigenous tilkor leaves, and fresh local river fish.
            </p>
            <p>
              Whether you are arriving for Janaki Mandir darshan, holy evening aarti at Ganga Sagar, or celebrating festivals like Dashain, Tihar, and Chhath, Kalika offers a serene sanctuary where every guest is honored like family.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('menu')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Explore Dining Menu
              </button>
              <button
                onClick={() => onNavigate('booking')}
                className="px-5 py-2.5 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-colors cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200">
            <img
              src="/images/hero_janakpur_dining_1791710464320.jpg"
              alt="Kalika Dining Ambiance"
              className="w-full h-full object-cover aspect-4/3"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* 4 Pillars of Kalika */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="p-2.5 bg-rose-50 text-[#E13F60] rounded-lg w-fit">
              <Utensils className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Authentic Flavors</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              True Maithil dishes including taruwa, mustard fish curry, and dal puri prepared by seasoned local cooks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="p-2.5 bg-rose-50 text-[#E13F60] rounded-lg w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Pristine Hygiene</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Strict sanitization, filtered water, fresh market produce, and clean kitchen protocol.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="p-2.5 bg-rose-50 text-[#E13F60] rounded-lg w-fit">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Family Hospitality</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Spacious seating accommodating large multi-generational family dinners and private celebrations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-2">
            <div className="p-2.5 bg-rose-50 text-[#E13F60] rounded-lg w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Festival Specialists</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Specialized culinary arrangements for Dashain, Tihar, pure Satvik Chhath meals, and holy pilgrimages.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
