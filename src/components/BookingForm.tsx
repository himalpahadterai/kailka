import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { BookingCategory, BookingRecord, RestaurantSettings } from '../types/index.ts';

interface BookingFormProps {
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
  preselectedCategory?: BookingCategory;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  settings,
  lang,
  preselectedCategory
}) => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<BookingCategory>(preselectedCategory || 'Restaurant Dining');
  const [preferredDate, setPreferredDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('19:00');
  const [guestCount, setGuestCount] = useState(4);
  const [specialRequests, setSpecialRequests] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  const categories: { value: BookingCategory; labelEn: string; labelNe: string }[] = [
    { value: 'Restaurant Dining', labelEn: 'Restaurant Dining (Table)', labelNe: 'रेस्टुरेन्ट भोजन (टेबुल)' },
    { value: 'Festival Feast', labelEn: 'Festival Feast (Thali)', labelNe: 'चाडपर्व विशेष थाली' },
    { value: 'Family Gathering', labelEn: 'Family Gathering / Celebration', labelNe: 'पारिवारिक उत्सव तथा जमघट' },
    { value: 'Banquet & Party', labelEn: 'Banquet & Group Party', labelNe: 'सामूहिक भोज तथा पार्टी' },
    ...(settings.accommodationEnabled ? [{ value: 'Room Accommodation' as BookingCategory, labelEn: 'Room Accommodation Enquiry', labelNe: 'कोठा आवास सोधपुछ' }] : [])
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!customerName.trim()) {
      setErrorMessage(lang === 'ne' ? 'कृपया आफ्नो पूरा नाम लेख्नुहोस्।' : 'Please provide your full name.');
      return;
    }

    if (!mobileNumber.trim() || mobileNumber.length < 8) {
      setErrorMessage(lang === 'ne' ? 'कृपया मान्य मोबाइल नम्बर लेख्नुहोस्।' : 'Please enter a valid mobile number.');
      return;
    }

    if (!preferredDate) {
      setErrorMessage(lang === 'ne' ? 'कृपया मिति चयन गर्नुहोस्।' : 'Please select your preferred date.');
      return;
    }

    if (!consentGiven) {
      setErrorMessage(lang === 'ne' ? 'कृपया नियम र सर्तहरू स्वीकार गर्नुहोस्।' : 'Please agree to allow Kalika staff to contact you for confirmation.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          mobileNumber: mobileNumber.trim(),
          email: email.trim() || undefined,
          category,
          preferredDate,
          preferredTime,
          guestCount,
          specialRequests: specialRequests.trim()
        })
      });

      const resData = await response.json();

      if (resData.success) {
        setConfirmedBooking(resData.data);
      } else {
        setErrorMessage(resData.error || 'Failed to submit reservation. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error. Please call +977 9801650550.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setMobileNumber('');
    setEmail('');
    setSpecialRequests('');
    setConsentGiven(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
      {/* Top Banner with Brand Logo */}
      <div className="bg-[#FAF8F5] border-b border-stone-200 px-6 py-6 sm:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-white p-1 border border-stone-200 shadow-xs flex items-center justify-center shrink-0">
            <img
              src={settings.logoUrl || '/assets/logo.svg'}
              alt="Kalika Official Logo"
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900">
              {lang === 'ne' ? 'टेबुल तथा उत्सव आरक्षण' : 'Table & Event Reservation'}
            </h3>
            <p className="text-xs text-[#E13F60] font-semibold">
              {lang === 'ne' ? 'कालिका होटल तथा रेस्टुरेन्ट, जनकपुर' : 'Kalika Hotel & Restaurant · Janakpurdham'}
            </p>
          </div>
        </div>

        <a
          href={`tel:${settings.contactNumber}`}
          className="hidden sm:flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#E13F60] bg-white border border-stone-200 px-3 py-2 rounded-lg"
        >
          <Phone className="w-3.5 h-3.5 text-[#E13F60]" />
          <span>{settings.contactNumber}</span>
        </a>
      </div>

      <div className="p-6 sm:p-8">
        {confirmedBooking ? (
          /* Booking Acknowledgement State */
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-rose-50 text-[#E13F60] rounded-full mx-auto flex items-center justify-center border border-rose-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#E13F60]">
                {lang === 'ne' ? 'आरक्षण अनुरोध प्राप्त भयो' : 'Reservation Request Logged'}
              </span>
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                {lang === 'ne' ? 'धन्यवाद, ' : 'Thank You, '} {confirmedBooking.customerName}!
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                {lang === 'ne'
                  ? 'तपाईंको आरक्षण अनुरोध सफलतापूर्वक दर्ता भएको छ। हाम्रो व्यवस्थापकले चाँडै फोन गरेर सिट निश्चित गर्नेछन्।'
                  : 'Your booking enquiry has been recorded in our system. As per our policy, reservations are verified by our restaurant staff before final table assignment.'}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-5 text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <span className="text-xs text-stone-500 font-medium">Booking Reference</span>
                <span className="text-sm font-mono font-bold text-[#E13F60]">{confirmedBooking.referenceCode}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-500 block">Category:</span>
                  <span className="font-medium text-stone-900">{confirmedBooking.category}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Status:</span>
                  <span className="inline-flex items-center text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded text-[11px] border border-amber-200">
                    {confirmedBooking.status} (Awaiting Verification)
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block">Date &amp; Time:</span>
                  <span className="font-medium text-stone-900">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Guests:</span>
                  <span className="font-medium text-stone-900">{confirmedBooking.guestCount} Persons</span>
                </div>
                <div className="col-span-2">
                  <span className="text-stone-500 block">Contact:</span>
                  <span className="font-medium text-stone-900">{confirmedBooking.mobileNumber}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Namaste%20Kalika%20Hotel,%20my%20booking%20reference%20is%20${confirmedBooking.referenceCode}.%20Please%20confirm%20my%20table.`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        ) : (
          /* Active Reservation Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'ne' ? 'पूरा नाम' : 'Full Name'} <span className="text-[#E13F60]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rameshwar Jha"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'ne' ? 'मोबाइल नम्बर' : 'Mobile Number'} <span className="text-[#E13F60]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., +977 9801650550"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'ne' ? 'इमेल ठेगाना (ऐच्छिक)' : 'Email Address (Optional)'}
                </label>
                <input
                  type="email"
                  placeholder="e.g., name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                />
              </div>

              {/* Booking Category */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  {lang === 'ne' ? 'आरक्षण वर्ग' : 'Booking Category'} <span className="text-[#E13F60]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BookingCategory)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {lang === 'ne' ? c.labelNe : c.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date, Time, and Guest Count */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  <span>{lang === 'ne' ? 'मिति' : 'Preferred Date'}</span> <span className="text-[#E13F60]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>{lang === 'ne' ? 'समय' : 'Preferred Time'}</span> <span className="text-[#E13F60]">*</span>
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                >
                  <option value="08:00">08:00 AM (Breakfast)</option>
                  <option value="11:30">11:30 AM (Early Lunch)</option>
                  <option value="12:30">12:30 PM (Lunch Rush)</option>
                  <option value="13:30">01:30 PM (Afternoon)</option>
                  <option value="18:30">06:30 PM (Early Dinner)</option>
                  <option value="19:30">07:30 PM (Prime Dinner)</option>
                  <option value="20:30">08:30 PM (Late Dinner)</option>
                  <option value="21:30">09:30 PM (Night Service)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-500" />
                  <span>{lang === 'ne' ? 'व्यक्ति संख्या' : 'Guest Count'}</span> <span className="text-[#E13F60]">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  required
                  value={guestCount}
                  onChange={(e) => setGuestCount(parseInt(e.target.value || '1', 10))}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                {lang === 'ne' ? 'विशेष अनुरोध वा परिकार रोजाइ (ऐच्छिक)' : 'Special Requests & Dietary Preferences (Optional)'}
              </label>
              <textarea
                rows={3}
                placeholder={lang === 'ne' ? 'उदा: शुद्ध सात्विक भोजन, कम पिरो, वा पारिवारिक निजी सिट व्यवस्था...' : 'e.g., Satvik fasting meal for pilgrims, quiet corner table for family, high chair for infant...'}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-stone-300 focus:border-[#E13F60] focus:ring-1 focus:ring-[#E13F60] outline-hidden bg-white text-stone-900"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600">
                <input
                  type="checkbox"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 rounded text-[#E13F60] focus:ring-[#E13F60] w-4 h-4 cursor-pointer"
                />
                <span>
                  {lang === 'ne'
                    ? 'म कालिका होटल तथा रेस्टुरेन्टका कर्मचारीहरूलाई मेरो आरक्षण निश्चित गर्न सम्पर्क गर्ने अनुमति दिन्छु।'
                    : 'I agree that Kalika Hotel & Restaurant staff may contact me via phone/SMS to confirm availability and table assignment.'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] active:bg-[#A81F3B] disabled:opacity-60 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="text-sm">Submitting Reservation...</span>
                ) : (
                  <span className="text-sm">
                    {lang === 'ne' ? 'अनुरोध पठाउनुहोस्' : 'Submit Reservation Request'}
                  </span>
                )}
              </button>
              <p className="text-[11px] text-stone-400 text-center mt-2">
                * Note: Instant booking references are generated immediately; table assignment is finalized by staff confirmation call.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
