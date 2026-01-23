'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export function HeroSection() {
  const { heroSlides } = MOCK_HOME_DATA;
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    if (typeof api.selectedScrollSnap === 'function') {
      setCurrent(api.selectedScrollSnap());
    }

    if (typeof api.on === 'function') {
      api.on('select', () => {
        if (typeof api.selectedScrollSnap === 'function') {
          setCurrent(api.selectedScrollSnap());
        }
      });
    }

    // Auto-play
    const autoPlay = setInterval(() => {
      if (typeof api.canScrollNext === 'function' && api.canScrollNext()) {
        if (typeof api.scrollNext === 'function') {
          api.scrollNext();
        }
      } else if (typeof api.scrollTo === 'function') {
        api.scrollTo(0);
      }
    }, 6000);

    return () => clearInterval(autoPlay);
  }, [api]);

  return (
    <section className="w-full relative overflow-hidden">
      <Carousel className="w-full" opts={{ loop: true }} setApi={setApi}>
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full gradient-hero flex items-center justify-center overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
                  <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40 z-10" />

                {/* Mesh Pattern */}
                <div className="absolute inset-0 opacity-20 z-5" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />

                {/* Content */}
                <div
                  className={`relative z-20 text-center text-white px-4 max-w-5xl mx-auto ${current === index ? 'animate-slide-up' : 'opacity-0'
                    }`}
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                    <span className="text-gradient">{slide.title}</span>
                  </h1>
                  {slide.subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 font-light max-w-3xl mx-auto">
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <Button
                      asChild
                      size="lg"
                      className="text-base md:text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 gradient-primary border-0 animate-pulse-glow"
                    >
                      <Link href={slide.ctaLink} className="flex items-center gap-2">
                        {slide.ctaText}
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 z-30 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm h-12 w-12" />
        <CarouselNext className="right-4 z-30 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm h-12 w-12" />

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${current === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
