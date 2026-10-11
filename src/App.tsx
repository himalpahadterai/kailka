/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { HeroSlider } from './components/HeroSlider.tsx';
import { BookingForm } from './components/BookingForm.tsx';
import { MenuSection } from './components/MenuSection.tsx';
import { FestivalSection } from './components/FestivalSection.tsx';
import { TourismSection } from './components/TourismSection.tsx';
import { AboutView } from './components/AboutView.tsx';
import { GalleryView } from './components/GalleryView.tsx';
import { AccommodationView } from './components/AccommodationView.tsx';
import { ContactView } from './components/ContactView.tsx';
import { LegalViews } from './components/LegalViews.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { QuickContactFloating } from './components/QuickContactFloating.tsx';
import {
  RestaurantSettings, HeroSlide, MenuCategory, MenuItem, FestivalOffer,
  TourismDestination, GalleryItem, RoomItem, BookingCategory
} from './types/index.ts';
import { Phone, MapPin, Calendar, ArrowRight, Utensils, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [lang, setLang] = useState<'en' | 'ne'>('en');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [bookingCategorySelected, setBookingCategorySelected] = useState<BookingCategory | undefined>(undefined);

  // Dynamic Data States
  const [settings, setSettings] = useState<RestaurantSettings>({
    businessName: "Kalika Hotel & Restaurant",
    tagline: "Celebrate Janakpur with Kalika.",
    taglineNepali: "कालिकासँग जनकपुर मनाउनुहोस्।",
    contactNumber: "+977 9801650550",
    whatsappNumber: "+977 9801650550",
    email: "info@kalikahotel.com.np",
    address: "Hospital Road Area, Janakpurdham",
    addressNepali: "अस्पताल रोड, जनकपुरधाम, मधेश प्रदेश, नेपाल",
    city: "Janakpurdham",
    province: "Madhesh Province",
    openingHours: "07:00 AM – 10:30 PM (Daily)",
    openingHoursNepali: "बिहान ७:०० – बेलुका १०:३० (दैनिक)",
    logoUrl: "/assets/logo.svg",
    accommodationEnabled: false,
    socialLinks: {
      facebook: "https://facebook.com/kalikahoteljanakpur",
      whatsapp: "https://wa.me/9779801650550",
      maps: "https://maps.google.com/?q=Janakpurdham+Nepal"
    },
    seo: {
      metaTitle: "Kalika Hotel & Restaurant | Celebrate Janakpur, Nepal",
      metaDescription: "Celebrate Janakpur with Kalika. Authentic Mithila cuisine, festival family dining, and premier hospitality in Janakpur, Nepal. Call +977 9801650550.",
      keywords: "Kalika Hotel Janakpur, Kalika Hotel and Restaurant, Restaurant in Janakpur, Food in Janakpur, Mithila thali, Janakpur restaurant",
      ogImage: "/assets/logo.svg"
    }
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [festivals, setFestivals] = useState<FestivalOffer[]>([]);
  const [tourism, setTourism] = useState<TourismDestination[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load All Application Data from Backend REST APIs
  const loadAppData = async () => {
    try {
      const [settRes, heroRes, menuRes, festRes, tourRes, galRes, roomRes] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/hero'),
        fetch('/api/menu'),
        fetch('/api/festivals'),
        fetch('/api/tourism'),
        fetch('/api/gallery'),
        fetch('/api/rooms')
      ]);

      const [sData, hData, mData, fData, tData, gData, rData] = await Promise.all([
        settRes.json(),
        heroRes.json(),
        menuRes.json(),
        festRes.json(),
        tourRes.json(),
        galRes.json(),
        roomRes.json()
      ]);

      if (sData.success) setSettings(sData.data);
      if (hData.success) setHeroSlides(hData.data);
      if (mData.success) {
        setMenuCategories(mData.data.categories);
        setMenuItems(mData.data.items);
      }
      if (fData.success) setFestivals(fData.data);
      if (tData.success) setTourism(tData.data);
      if (gData.success) setGallery(gData.data);
      if (rData.success) setRooms(rData.data);
    } catch (err) {
      console.error("Error loading app data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAppData();
  }, []);

  const handleUpdateSettings = async (newSettings: Partial<RestaurantSettings>) => {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    });
    const data = await res.json();
    if (data.success) {
      setSettings(data.data);
    }
  };

  const handleBookDish = (dishName: string) => {
    setBookingCategorySelected('Restaurant Dining');
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookFestival = (festivalName: string) => {
    setBookingCategorySelected('Festival Feast');
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookRoom = (roomName: string) => {
    setBookingCategorySelected('Room Accommodation');
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#E13F60] selection:text-white font-sans">
      
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        settings={settings}
        lang={lang}
        onToggleLang={() => setLang(lang === 'en' ? 'ne' : 'en')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {currentView === 'home' && (
          <div>
            {/* Cinematic Hero Slider */}
            <HeroSlider
              slides={heroSlides}
              settings={settings}
              lang={lang}
              onNavigate={handleNavigate}
            />

            {/* Mithila Hospitality Welcome Split */}
            <section className="py-16 sm:py-20 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  
                  {/* Left Column: Authentic Brand Identity */}
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white p-1 border border-stone-200 shadow-xs flex items-center justify-center shrink-0">
                        <img
                          src={settings.logoUrl || '/assets/logo.svg'}
                          alt="Kalika Hotel & Restaurant"
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-widest font-semibold text-[#E13F60] block">
                          {lang === 'ne' ? 'हाम्रो प्रतिबद्धता' : 'Warm Hospitality in Janakpur'}
                        </span>
                        <span className="text-xs text-stone-500">Established 2023 · Janakpurdham</span>
                      </div>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                      {lang === 'ne'
                        ? 'पवित्र जानकी मन्दिरको भूमिमा प्रामाणिक मैथिली भोजन र आतिथ्य'
                        : 'Authentic Maithil Dining & Hospitality in the Sacred Heart of Janakpur'}
                    </h2>

                    <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                      At <strong>Kalika Hotel &amp; Restaurant</strong>, we celebrate the rich cultural heritage and culinary brilliance of Mithilanchal. From fragrant festival thalis to delicate taruwa crisps, traditional river carp curry, and rich sweets, every preparation honors age-old traditions with pristine modern hygiene.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                        <span className="font-serif text-xl font-bold text-[#E13F60] block">Fresh</span>
                        <span className="text-xs text-stone-600">Local river fish &amp; seasonal produce</span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                        <span className="font-serif text-xl font-bold text-[#E13F60] block">Satvik</span>
                        <span className="text-xs text-stone-600">Pure pilgrim &amp; fasting dining</span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                        <span className="font-serif text-xl font-bold text-[#E13F60] block">Family</span>
                        <span className="text-xs text-stone-600">Spacious banquet &amp; private tables</span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-4">
                      <button
                        onClick={() => handleNavigate('menu')}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        Explore Complete Menu
                      </button>
                      <button
                        onClick={() => handleNavigate('about')}
                        className="px-5 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Our Heritage Story
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Visual Splendor */}
                  <div className="relative">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
                      <img
                        src="/images/dish_mithila_thali_1791710483088.jpg"
                        alt="Authentic Maithil Special Thali at Kalika"
                        className="w-full h-full object-cover aspect-4/3 hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Floating Trust Card */}
                    <div className="absolute -bottom-6 -left-6 hidden sm:block bg-white p-4 rounded-xl border border-stone-200 shadow-lg max-w-xs">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-50 text-[#E13F60] rounded-lg">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900">Celebrate Janakpur with Kalika</p>
                          <p className="text-[11px] text-stone-500">Call +977 9801650550 for reservations</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Restaurant Menu Preview */}
            <MenuSection
              categories={menuCategories}
              items={menuItems.slice(0, 6)}
              lang={lang}
              onBookItem={handleBookDish}
            />

            {/* Festival Showcase Section */}
            <FestivalSection
              festivals={festivals}
              lang={lang}
              onBookFestival={handleBookFestival}
            />

            {/* Explore Nearby Janakpur (Janaki Mandir, Rajdevi Mandir, Ganga Sagar) */}
            <TourismSection
              destinations={tourism}
              lang={lang}
            />

            {/* Direct Booking Section on Homepage */}
            <section id="reservation-strip" className="py-16 sm:py-20 bg-stone-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#E13F60]">
                    Direct Reservations
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
                    Reserve Your Table at Kalika
                  </h2>
                  <p className="text-sm text-stone-600">
                    Enjoy memorable dining with family, friends, or pilgrim groups in Janakpurdham.
                  </p>
                </div>

                <BookingForm
                  settings={settings}
                  lang={lang}
                  preselectedCategory={bookingCategorySelected}
                />
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: ABOUT US */}
        {currentView === 'about' && (
          <AboutView
            settings={settings}
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {/* VIEW 3: FULL MENU */}
        {currentView === 'menu' && (
          <MenuSection
            categories={menuCategories}
            items={menuItems}
            lang={lang}
            onBookItem={handleBookDish}
          />
        )}

        {/* VIEW 4: FESTIVAL SPECIALS */}
        {currentView === 'festivals' && (
          <FestivalSection
            festivals={festivals}
            lang={lang}
            onBookFestival={handleBookFestival}
          />
        )}

        {/* VIEW 5: EXPLORE JANAKPUR */}
        {currentView === 'tourism' && (
          <TourismSection
            destinations={tourism}
            lang={lang}
          />
        )}

        {/* VIEW 6: GALLERY */}
        {currentView === 'gallery' && (
          <GalleryView
            gallery={gallery}
            lang={lang}
          />
        )}

        {/* VIEW 7: ACCOMMODATION */}
        {currentView === 'accommodation' && (
          <AccommodationView
            rooms={rooms}
            settings={settings}
            lang={lang}
            onBookRoom={handleBookRoom}
          />
        )}

        {/* VIEW 8: BOOKING & RESERVATION */}
        {currentView === 'booking' && (
          <div className="py-16 sm:py-20 bg-[#FAF8F5]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BookingForm
                settings={settings}
                lang={lang}
                preselectedCategory={bookingCategorySelected}
              />
            </div>
          </div>
        )}

        {/* VIEW 9: CONTACT US */}
        {currentView === 'contact' && (
          <ContactView
            settings={settings}
            lang={lang}
          />
        )}

        {/* VIEW 10: LEGAL PRIVACY & TERMS */}
        {currentView === 'privacy' && (
          <LegalViews
            type="privacy"
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'terms' && (
          <LegalViews
            type="terms"
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

      </main>

      {/* Floating Action Controls for WhatsApp and Quick Phone Calling */}
      <QuickContactFloating
        settings={settings}
        lang={lang}
      />

      {/* Official Quiet Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
        lang={lang}
      />

      {/* Full Admin Control Panel Modal */}
      {isAdminOpen && (
        <AdminDashboard
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

    </div>
  );
}
