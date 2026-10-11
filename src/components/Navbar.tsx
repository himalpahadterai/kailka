import React, { useState } from 'react';
import { Phone, MessageCircle, Menu as MenuIcon, X, Shield, Globe } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
  onToggleLang: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  settings,
  lang,
  onToggleLang,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelNe: 'गृहपृष्ठ' },
    { id: 'about', labelEn: 'About Us', labelNe: 'हाम्रो बारेमा' },
    { id: 'menu', labelEn: 'Menu & Dining', labelNe: 'मेनु तथा परिकार' },
    { id: 'festivals', labelEn: 'Festival Specials', labelNe: 'चाडपर्व विशेष' },
    { id: 'tourism', labelEn: 'Explore Janakpur', labelNe: 'जनकपुर भ्रमण' },
    { id: 'gallery', labelEn: 'Gallery', labelNe: 'तस्बिरहरू' },
    ...(settings.accommodationEnabled ? [{ id: 'accommodation', labelEn: 'Rooms', labelNe: 'कोठाहरू' }] : []),
    { id: 'contact', labelEn: 'Contact', labelNe: 'सम्पर्क' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Bar Contract: 3 Zones with gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Official Brand Logo & Wordmark (Single visual unit) */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3.5 text-left group focus:outline-hidden cursor-pointer shrink-0"
          aria-label="Kalika Hotel & Restaurant Home"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-1 border border-stone-200 shadow-xs flex items-center justify-center shrink-0">
            <img
              src={settings.logoUrl || '/assets/logo.svg'}
              alt="Kalika Hotel & Restaurant Official Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-[#E13F60] transition-colors leading-none">
              Kalika
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#E13F60] font-semibold mt-1">
              Hotel &amp; Restaurant
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 Clean Nav Links (Single line, text with subtle hover) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700 shrink-0">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer py-1 ${
                  isActive
                    ? 'text-[#E13F60] font-semibold border-b-2 border-[#E13F60]'
                    : 'hover:text-stone-900 text-stone-600'
                }`}
              >
                {lang === 'ne' ? link.labelNe : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Quick Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
            title="Toggle English / Nepali"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span className="font-medium">{lang === 'en' ? 'नेपाली' : 'English'}</span>
          </button>

          {/* Direct Call Button (Desktop) */}
          <a
            href={`tel:${settings.contactNumber}`}
            className="hidden xl:inline-flex items-center gap-2 text-xs font-semibold text-stone-800 hover:text-[#E13F60] transition-colors whitespace-nowrap px-2"
          >
            <Phone className="w-3.5 h-3.5 text-[#E13F60]" />
            <span>{settings.contactNumber}</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={() => onNavigate('booking')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] active:bg-[#A81F3B] rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
          >
            {lang === 'ne' ? 'टेबुल रिजर्भ गर्नुहोस्' : 'Book a Table'}
          </button>

          {/* Staff Login Icon Button */}
          <button
            onClick={onOpenAdmin}
            className="p-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            title="Admin & Staff Portal"
            aria-label="Staff Portal"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentView === link.id
                    ? 'bg-[#E13F60]/10 text-[#E13F60] font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {lang === 'ne' ? link.labelNe : link.labelEn}
              </button>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <a
              href={`tel:${settings.contactNumber}`}
              className="flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-lg shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#E13F60]" />
              <span>Call {settings.contactNumber}</span>
            </a>

            {settings.whatsappNumber && (
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Kalika%20Hotel%20Janakpur,%20I%20would%20like%20to%20enquire%20about%20a%20table%20reservation`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
