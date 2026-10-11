import React, { useState } from 'react';
import { Sparkles, Utensils, Flame, Leaf, Search } from 'lucide-react';
import { MenuCategory, MenuItem } from '../types/index.ts';

interface MenuSectionProps {
  categories: MenuCategory[];
  items: MenuItem[];
  lang: 'en' | 'ne';
  onBookItem: (itemName: string) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  categories,
  items,
  lang,
  onBookItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nepaliName.includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVeg = !vegOnly || item.isVegetarian;
    return matchesCat && matchesSearch && matchesVeg;
  });

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E13F60]">
            <Utensils className="w-3.5 h-3.5" />
            <span>{lang === 'ne' ? 'स्वादिलो मिथिला भान्छा' : 'Culinary Heritage of Janakpur'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'हाम्रा विशेष परिकारहरू' : 'Restaurant & Dining Menu'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {lang === 'ne'
              ? 'ताजा स्थानीय मसला, परम्परागत विधि, र जनकपुरको पवित्र माटोको सुगन्ध भरिएका स्वादिष्ट परिकारहरू।'
              : 'Handcrafted with pristine local spices, heritage recipes, and genuine Maithil hospitality.'}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#E13F60] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {lang === 'ne' ? 'सबै परिकार' : 'All Dishes'}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#E13F60] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {lang === 'ne' ? cat.nepaliName : cat.name}
              </button>
            ))}
          </div>

          {/* Search & Vegetarian Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={lang === 'ne' ? 'परिकार खोज्नुहोस्...' : 'Search menu...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
              />
            </div>

            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap ${
                vegOnly
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'ne' ? 'शुद्ध शाकाहारी मात्र' : 'Veg Only'}</span>
            </button>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm">No dishes found matching your current filter.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setVegOnly(false); }}
              className="mt-3 text-xs text-[#E13F60] font-semibold hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Food Image */}
                <div className="relative h-48 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Dietary badge (Unboxed or subtle functional indicator) */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md shadow-xs ${
                        item.isVegetarian
                          ? 'bg-emerald-700 text-white'
                          : 'bg-stone-900 text-stone-100'
                      }`}
                    >
                      {item.isVegetarian ? <Leaf className="w-3 h-3" /> : null}
                      <span>{item.isVegetarian ? 'Vegetarian' : 'Non-Veg'}</span>
                    </span>
                    {item.isSpicy && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-1 text-[11px] font-semibold bg-rose-600 text-white rounded-md shadow-xs">
                        <Flame className="w-3 h-3" />
                        <span>Spicy</span>
                      </span>
                    )}
                  </div>

                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center">
                      <span className="text-xs font-bold text-white uppercase tracking-wider bg-rose-900/80 px-3 py-1 rounded">
                        Currently Unavailable
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#E13F60] transition-colors leading-snug">
                        {lang === 'ne' ? item.nepaliName : item.name}
                      </h3>
                      <span className="font-semibold text-base text-stone-900 whitespace-nowrap shrink-0">
                        रू {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex items-center gap-2 pt-1 text-[11px] text-stone-500">
                        {item.tags.map((tag, tIdx) => (
                          <React.Fragment key={tag}>
                            <span>{tag}</span>
                            {tIdx < (item.tags?.length || 0) - 1 && <span aria-hidden="true">·</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Enquiry & Table Action */}
                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-stone-500">
                      Janakpur Fresh
                    </span>
                    <button
                      onClick={() => onBookItem(item.name)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-[#E13F60] hover:text-white hover:bg-[#E13F60] border border-[#E13F60] rounded-lg transition-colors cursor-pointer"
                    >
                      Reserve with this Dish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
