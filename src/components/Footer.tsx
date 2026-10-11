import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Shield } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface FooterProps {
  settings: RestaurantSettings;
  onNavigate: (view: string) => void;
  onOpenAdmin: () => void;
  lang: 'en' | 'ne';
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenAdmin,
  lang
}) => {
  return (
    <footer className="bg-[#1C1618] text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Identity Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-white p-1 border border-stone-700 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                <img
                  src={settings.logoUrl || '/assets/logo.svg'}
                  alt="Kalika Hotel & Restaurant Official Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                  Kalika
                </h3>
                <p className="text-xs text-[#E13F60] font-semibold uppercase tracking-wider">
                  Hotel &amp; Restaurant
                </p>
              </div>
            </div>
            
            <p className="text-sm text-stone-400 leading-relaxed">
              {lang === 'ne' ? settings.taglineNepali : settings.tagline}
            </p>
            <p className="text-xs text-stone-400">
              {lang === 'ne'
                ? 'जनकपुरधामको सांस्कृतिक केन्द्रमा प्रामाणिक मिथिला भोजन, पारिवारिक जमघट र अविस्मरणीय आतिथ्य।'
                : 'Experience authentic Mithila cuisine, warm hospitality, and memorable family dining in the cultural heart of Janakpur, Nepal.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {lang === 'ne' ? 'छिटो नेभिगेसन' : 'Explore'}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'ne' ? 'गृहपृष्ठ' : 'Home'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'ne' ? 'हाम्रो बारेमा' : 'About Us'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'ne' ? 'मेनु तथा भोजन' : 'Restaurant Menu'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('festivals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'ne' ? 'चाडपर्व विशेष' : 'Festival Specials (Dashain, Tihar, Chhath)'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tourism')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'ne' ? 'जनकपुर दर्शन (जानकी मन्दिर)' : 'Janakpur Tourism & Heritage'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {lang === 'ne' ? 'फोटो ग्यालरी' : 'Photo Gallery'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location Details */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {lang === 'ne' ? 'सम्पर्क र ठेगाना' : 'Contact & Visit'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E13F60] shrink-0 mt-0.5" />
                <span>
                  {lang === 'ne' ? settings.addressNepali : settings.address}, {settings.city}, {settings.province}, Nepal
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E13F60] shrink-0" />
                <a
                  href={`tel:${settings.contactNumber}`}
                  className="hover:text-white transition-colors font-medium text-white"
                >
                  {settings.contactNumber}
                </a>
              </li>
              {settings.whatsappNumber && (
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors text-emerald-300"
                  >
                    WhatsApp: {settings.whatsappNumber}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E13F60] shrink-0 mt-0.5" />
                <span>
                  {lang === 'ne' ? settings.openingHoursNepali : settings.openingHours}
                </span>
              </li>
            </ul>
          </div>

          {/* Table Booking & Staff Portal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-2">
              {lang === 'ne' ? 'आरक्षण तथा सोधपुछ' : 'Reservations'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {lang === 'ne'
                ? 'पारिवारिक जमघट, भोज तथा चाडपर्वका लागि अग्रिम टेबुल बुकिङ गर्नुहोस्।'
                : 'Secure your dining table for family dinners, festival celebrations, and private banquets.'}
            </p>
            <button
              onClick={() => onNavigate('booking')}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-lg transition-colors cursor-pointer text-center block shadow-xs"
            >
              {lang === 'ne' ? 'अनलाइन रिजर्भ गर्नुहोस्' : 'Online Table Reservation'}
            </button>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-300 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-stone-500" />
                <span>Authorized Staff Portal</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            &copy; {new Date().getFullYear()} {settings.businessName}. All rights reserved. Janakpur, Nepal.
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
