'use client';

import { useState, useEffect } from 'react';
import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';

export function CouponBanner() {
  const { banner } = MOCK_HOME_DATA;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem('couponBannerDismissed');
    if (!dismissed && banner.isVisible) {
      setIsVisible(true);
    }
  }, [banner.isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('couponBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="gradient-primary text-white text-center py-2.5 px-4 text-sm font-medium relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer opacity-30" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2 max-w-4xl mx-auto">
        <span className="animate-pulse">🎉</span>
        <span>{banner.text}</span>
        {banner.link && (
          <Link
            href={banner.link}
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-white/90 font-semibold ml-1"
          >
            Shop Now
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors duration-200"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
