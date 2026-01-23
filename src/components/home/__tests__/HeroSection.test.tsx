import React from 'react';
import { render, act } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

// Mock the carousel component parts
jest.mock('@/components/ui/carousel', () => ({
  Carousel: jest.fn(({ children, setApi }: any) => {
    React.useEffect(() => {
      setApi({
        on: jest.fn(),
        scrollTo: jest.fn(),
        canScrollNext: jest.fn(() => true),
        scrollNext: jest.fn(),
        selectedScrollSnap: jest.fn(() => 0),
      });
    }, [setApi]);
    return <div>{children}</div>;
  }),
  CarouselContent: ({ children }: any) => <div>{children}</div>,
  CarouselItem: ({ children }: any) => <div>{children}</div>,
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Prev</button>,
}));

// Mock data
jest.mock('@/data/mock-home', () => ({
  MOCK_HOME_DATA: {
    heroSlides: [
      { id: '1', title: 'Slide 1', subtitle: 'Sub 1', ctaText: 'CTA 1', ctaLink: '/' },
    ],
  },
}));

describe('HeroSection Carousel Safety', () => {
  it('does not crash if api.selectedScrollSnap is missing', async () => {
    // This test verifies that the component doesn't throw when selectedScrollSnap is undefined
    const { Carousel } = require('@/components/ui/carousel');
    
    // Override the mock for this specific test case
    (Carousel as jest.Mock).mockImplementation(({ children, setApi }: any) => {
      React.useEffect(() => {
        setApi({
          // Missing selectedScrollSnap
          on: jest.fn(),
          scrollTo: jest.fn(),
        });
      }, [setApi]);
      return <div>{children}</div>;
    });

    expect(() => {
      render(<HeroSection />);
    }).not.toThrow();
  });
});
