import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface QuickContactFloatingProps {
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
}

export const QuickContactFloating: React.FC<QuickContactFloatingProps> = ({
  settings,
  lang
}) => {
  const whatsappDigits = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '9779801650550';

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
      {/* WhatsApp Action */}
      <a
        href={`https://wa.me/${whatsappDigits}?text=Namaste%20Kalika%20Hotel,%20I%20would%20like%20to%20enquire%20about%20dining%20and%20reservations.`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Kalika on WhatsApp"
        className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all cursor-pointer group"
        title="WhatsApp Enquiry"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </a>

      {/* Direct Phone Call Action */}
      <a
        href={`tel:${settings.contactNumber}`}
        aria-label="Call Kalika Hotel & Restaurant"
        className="w-12 h-12 rounded-full bg-[#E13F60] hover:bg-[#C52949] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all cursor-pointer group"
        title={`Call ${settings.contactNumber}`}
      >
        <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
