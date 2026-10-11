import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface LegalViewProps {
  type: 'privacy' | 'terms';
  settings: RestaurantSettings;
  onNavigate: (view: string) => void;
}

export const LegalViews: React.FC<LegalViewProps> = ({
  type,
  settings,
  onNavigate
}) => {
  if (type === 'privacy') {
    return (
      <div className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-xs">
          <div className="space-y-2 border-b border-stone-200 pb-6">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#E13F60]">Official Policy</span>
            <h1 className="font-serif text-3xl font-bold text-stone-900">Privacy Policy</h1>
            <p className="text-xs text-stone-500">Effective Date: October 2026 · {settings.businessName}</p>
          </div>

          <div className="space-y-6 text-sm text-stone-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900">1. Information We Collect</h2>
              <p>
                When you make a table reservation or submit an enquiry at <strong>{settings.businessName}</strong>, we collect your full name, mobile number, email address (optional), booking category, date, time, and special dining requests.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900">2. How We Use Your Information</h2>
              <p>
                We use your details strictly to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Verify and confirm table availability and dining assignments.</li>
                <li>Communicate dining status, festival schedule updates, or booking changes via phone call or SMS.</li>
                <li>Prepare kitchen arrangements according to your dietary needs.</li>
              </ul>
              <p>
                We never sell, rent, or distribute your private contact details to external marketing agencies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-stone-900">3. Contacting Management</h2>
              <p>
                For privacy inquiries, contact our operations office in Janakpurdham, Nepal at <strong>{settings.contactNumber}</strong>.
              </p>
            </section>
          </div>

          <div className="pt-4 border-t border-stone-200">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-semibold text-[#E13F60] hover:underline cursor-pointer"
            >
              &larr; Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-2xl border border-stone-200 shadow-xs">
        <div className="space-y-2 border-b border-stone-200 pb-6">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#E13F60]">Service Agreement</span>
          <h1 className="font-serif text-3xl font-bold text-stone-900">Terms &amp; Conditions</h1>
          <p className="text-xs text-stone-500">Effective Date: October 2026 · {settings.businessName}</p>
        </div>

        <div className="space-y-6 text-sm text-stone-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-stone-900">1. Reservation Policy</h2>
            <p>
              Submission of an online reservation enquiry generates a unique tracking reference code (e.g. <code>KLK-YYYYMMDD-XXXX</code>) and places the request into <strong>Pending</strong> status.
            </p>
            <p>
              Final table confirmation occurs only when authorized restaurant staff verifies table availability and contacts the guest. Kalika Hotel &amp; Restaurant guarantees fairness and priority for confirmed bookings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-stone-900">2. Festival &amp; Peak Hour Dining</h2>
            <p>
              During major festivals (Dashain, Tihar, Chhath Mahaparva, and Vivah Panchami), reservation hold times are strictly 15 minutes past the designated booking time, after which tables may be reassigned to waiting walk-in pilgrims.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-stone-900">3. Accurate Business Representation</h2>
            <p>
              All prices are listed in Nepali Rupees (NPR / रू). We do not implement fake payment gateways or fabricated accommodation availability.
            </p>
          </section>
        </div>

        <div className="pt-4 border-t border-stone-200">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-semibold text-[#E13F60] hover:underline cursor-pointer"
          >
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
