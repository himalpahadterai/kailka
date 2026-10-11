import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSlide, RestaurantSettings } from '../types/index.ts';

interface HeroSliderProps {
  slides: HeroSlide[];
  settings: RestaurantSettings;
  lang: 'en' | 'ne';
  onNavigate: (view: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides,
  settings,
  lang,
  onNavigate
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentIdx];

  const handleCtaClick = (link: string) => {
    if (link.startsWith('#')) {
      const target = link.substring(1);
      onNavigate(target);
    } else {
      onNavigate(link);
    }
  };

  return (
    <div
      className="relative w-full h-[580px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-stone-950 text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover scale-105 animate-subtleZoom"
            referrerPolicy="no-referrer"
          />
          {/* Measured cinematic scrim gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/40" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6">
          
          {/* Official Brand Badge Kicker with Logo */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
            <img
              src={settings.logoUrl || '/assets/logo.svg'}
              alt="Kalika Hotel & Restaurant Logo"
              className="w-6 h-6 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs uppercase tracking-widest font-semibold text-rose-200">
              Janakpurdham, Nepal · Est. 2023
            </span>
          </div>

          {/* Marquee Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-md text-balance">
            {lang === 'ne' ? currentSlide.titleNepali : currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-200 max-w-2xl font-light leading-relaxed drop-shadow-sm">
            {lang === 'ne' ? currentSlide.subtitleNepali : currentSlide.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleCtaClick(currentSlide.ctaLink)}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#E13F60] hover:bg-[#C52949] active:bg-[#A81F3B] rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
            >
              {lang === 'ne' && currentSlide.id === 'slide-1' ? 'टेबुल रिजर्भ गर्नुहोस्' : currentSlide.ctaText}
            </button>

            <button
              onClick={() => handleCtaClick(currentSlide.secondaryCtaLink)}
              className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/15 hover:bg-white/25 active:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg transition-all cursor-pointer whitespace-nowrap"
            >
              {lang === 'ne' && currentSlide.id === 'slide-1' ? 'मेनु हेर्नुहोस्' : currentSlide.secondaryCtaText}
            </button>
          </div>
        </div>
      </div>

      {/* Prev / Next Slider Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/40 hover:bg-stone-900/80 text-white backdrop-blur-xs border border-white/15 transition-colors cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-900/40 hover:bg-stone-900/80 text-white backdrop-blur-xs border border-white/15 transition-colors cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === currentIdx ? 'w-8 bg-[#E13F60]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
