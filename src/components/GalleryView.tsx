import React, { useState } from 'react';
import { Image, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types/index.ts';

interface GalleryViewProps {
  gallery: GalleryItem[];
  lang: 'en' | 'ne';
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  gallery,
  lang
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Photos', labelNe: 'सबै तस्बिर' },
    { id: 'dining', labelEn: 'Dining & Ambiance', labelNe: 'रेस्टुरेन्ट तथा वातावरण' },
    { id: 'food', labelEn: 'Mithila Food & Thali', labelNe: 'भोजन तथा परिकार' },
    { id: 'festivals', labelEn: 'Festivals & Celebrations', labelNe: 'चाडपर्व तथा उत्सव' },
    { id: 'heritage', labelEn: 'Janakpur Heritage', labelNe: 'जनकपुर सम्पदा' }
  ];

  const filteredItems = gallery.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <div className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E13F60]">
            <Image className="w-3.5 h-3.5" />
            <span>{lang === 'ne' ? 'तस्बिर संग्रह' : 'Visual Highlights'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'कालिका फोटो ग्यालरी' : 'Kalika Visual Gallery'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {lang === 'ne'
              ? 'हाम्रो रेस्टुरेन्ट, स्वादिष्ट मिथिला भोजन, र जनकपुरका पावन चाडपर्वका सुन्दर क्षणहरू।'
              : 'Glimpses of authentic dining hospitality, heritage thalis, and festive gatherings at Kalika.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeCategory === c.id
                  ? 'bg-[#E13F60] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {lang === 'ne' ? c.labelNe : c.labelEn}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative h-72 rounded-xl overflow-hidden bg-stone-200 shadow-xs cursor-pointer border border-stone-200"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] uppercase tracking-wider text-rose-200 font-semibold block mb-0.5">
                  {item.category}
                </span>
                <h3 className="font-serif text-lg font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-950/70 text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={filteredItems[activeLightboxIndex].imageUrl}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] w-auto object-contain mx-auto"
              referrerPolicy="no-referrer"
            />

            <div className="p-4 bg-stone-900 border-t border-stone-800 text-white flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold">
                  {filteredItems[activeLightboxIndex].title}
                </h3>
                <p className="text-xs text-stone-400">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveLightboxIndex(
                      (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
                    )
                  }
                  className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length)
                  }
                  className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
