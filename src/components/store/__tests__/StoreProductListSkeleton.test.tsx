import React from 'react';
import { render, screen } from '@testing-library/react';
import StoreProductListSkeleton from '../StoreProductListSkeleton';

describe('StoreProductListSkeleton', () => {
  it('renders the grid with 6 product skeletons', () => {
    const { container } = render(<StoreProductListSkeleton />);
    
    // Each skeleton is a Card, let's find them
    // Based on the implementation, there are 6 cards
    const cards = container.querySelectorAll('.bg-card');
    expect(cards.length).toBe(6);
  });

  it('renders skeletons for card elements', () => {
    const { container } = render(<StoreProductListSkeleton />);
    
    // Check if we have the skeletons with brand colors
    const skeletons = container.querySelectorAll('.animate-shimmer');
    // Each card has: 1 (header) + 1 (image) + 3 (description) + 2 (footer) = 7 skeletons
    // Total = 7 * 6 = 42
    expect(skeletons.length).toBe(42);
  });
});
