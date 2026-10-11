import React, { useState } from 'react';
import { Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { RestaurantSettings } from '../types/index.ts';

interface ContactViewProps {
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
}

export const ContactView: React.FC<ContactViewProps> = ({
  settings,
  lang
}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Dining Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !mobileNumber.trim() || !message.trim()) {
      setErrorMsg('Please fill in your name, mobile number, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobileNumber: mobileNumber.trim(),
          email: email.trim() || undefined,
          subject,
          message: message.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#E13F60]">
            {lang === 'ne' ? 'हामीलाई भेट्नुहोस्' : 'Visit & Contact Us'}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            {lang === 'ne' ? 'सम्पर्क तथा ठेगाना' : 'Get in Touch with Kalika'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {lang === 'ne'
              ? 'टेबुल रिजर्भेसन, विशेष भोज, तीर्थयात्री समूह भोजन, वा कुनै पनि जानकारीका लागि हामीलाई सिधै सम्पर्क गर्नुहोस्।'
              : 'For table reservations, catering enquiries, pilgrimage groups, or general questions, call or visit us.'}
          </p>
        </div>

        {/* Content Split: Details & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Contact Details Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                {settings.businessName}
              </h3>
              <p className="text-xs text-[#E13F60] font-semibold uppercase tracking-wider">
                {lang === 'ne' ? settings.taglineNepali : settings.tagline}
              </p>
            </div>

            <div className="space-y-6 text-sm text-stone-700">
              {/* Phone Calling */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 text-[#E13F60] rounded-xl shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wide block">
                    Direct Phone Calls
                  </span>
                  <a
                    href={`tel:${settings.contactNumber}`}
                    className="text-base font-bold text-stone-900 hover:text-[#E13F60] transition-colors"
                  >
                    {settings.contactNumber}
                  </a>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Immediate assistance for reservations and dining enquiries
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              {settings.whatsappNumber && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 font-semibold uppercase tracking-wide block">
                      Dedicated WhatsApp Line
                    </span>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      {settings.whatsappNumber}
                    </a>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Chat directly with our manager for fast confirmation
                    </p>
                  </div>
                </div>
              )}

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 text-[#E13F60] rounded-xl shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wide block">
                    Restaurant Location
                  </span>
                  <p className="text-sm font-semibold text-stone-900">
                    {lang === 'ne' ? settings.addressNepali : settings.address}
                  </p>
                  <p className="text-xs text-stone-500">
                    {settings.city}, {settings.province}, Nepal
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 text-[#E13F60] rounded-xl shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-semibold uppercase tracking-wide block">
                    Operating Hours
                  </span>
                  <p className="text-sm font-semibold text-stone-900">
                    {lang === 'ne' ? settings.openingHoursNepali : settings.openingHours}
                  </p>
                  <p className="text-xs text-stone-500">
                    Open seven days a week including festival public holidays
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-3">
              <a
                href={`tel:${settings.contactNumber}`}
                className="flex-1 py-3 px-4 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-xl text-center shadow-xs transition-colors"
              >
                Call +977 9801650550
              </a>

              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-center transition-colors"
                >
                  WhatsApp Chat
                </a>
              )}
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-xs">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              Send an Enquiry
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Our team responds to all questions within a few hours.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg font-bold text-stone-900">Message Received!</h4>
                <p className="text-xs text-stone-600">
                  Thank you, {name}. Our staff has received your message and will reach out to {mobileNumber} shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMessage(''); }}
                  className="mt-2 text-xs font-semibold text-[#E13F60] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-800 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name <span className="text-[#E13F60]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Rameshwar Jha"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:border-[#E13F60] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile Number <span className="text-[#E13F60]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:border-[#E13F60] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:border-[#E13F60] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 outline-hidden"
                  >
                    <option value="General Dining Enquiry">General Dining Enquiry</option>
                    <option value="Festival Family Booking">Festival Family Booking</option>
                    <option value="Pilgrim Group Catering">Pilgrim Group Catering</option>
                    <option value="Private Banquet Hall">Private Banquet Hall</option>
                    <option value="Room Accommodation Enquiry">Room Accommodation Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Message <span className="text-[#E13F60]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist your visit to Kalika Hotel & Restaurant?"
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-stone-300 focus:border-[#E13F60] outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 text-xs font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps Interactive Card */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Interactive Map &amp; Directions
              </h3>
              <p className="text-xs text-stone-500">
                Hospital Road Area, Janakpurdham, Madhesh Province, Nepal
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Janakpurdham+Nepal"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-[#E13F60] hover:bg-rose-50 border border-[#E13F60] rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center"
            >
              Open in Google Maps App
            </a>
          </div>

          <div className="h-80 w-full bg-stone-100 relative">
            <iframe
              title="Janakpurdham Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114000!2d85.91!3d26.728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec4000300a892b%3A0xc3415cf7209e7350!2sJanakpur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
