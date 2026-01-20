'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { heroSlides } = MOCK_HOME_DATA;

  return (
    <section className="w-full relative">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[500px] w-full bg-slate-900 flex items-center justify-center">
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
                 
                 {/* Content */}
                 <div className="relative z-20 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">{slide.title}</h1>
                    {slide.subtitle && <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">{slide.subtitle}</p>}
                    {slide.ctaText && slide.ctaLink && (
                        <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">
                            <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                        </Button>
                    )}
                 </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-30" />
        <CarouselNext className="right-4 z-30" />
      </Carousel>
    </section>
  );
}
