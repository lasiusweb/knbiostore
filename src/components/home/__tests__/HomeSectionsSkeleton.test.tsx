import React from 'react';
import { render } from '@testing-library/react';
import { 
  ShopBySegmentSkeleton, 
  ShopByCropSkeleton, 
  ShopByProblemSkeleton 
} from '../HomeSectionsSkeleton';

describe('HomeSectionsSkeletons', () => {
  it('ShopBySegmentSkeleton renders 10 items', () => {
    const { container } = render(<ShopBySegmentSkeleton />);
    const cards = container.querySelectorAll('.rounded-xl'); // Using rounded-xl from Card component
    expect(cards.length).toBe(10);
  });

  it('ShopByCropSkeleton renders 10 items', () => {
    const { container } = render(<ShopByCropSkeleton />);
    const cards = container.querySelectorAll('.rounded-xl');
    expect(cards.length).toBe(10);
  });

  it('ShopByProblemSkeleton renders 6 items', () => {
    const { container } = render(<ShopByProblemSkeleton />);
    const cards = container.querySelectorAll('.rounded-xl');
    expect(cards.length).toBe(6);
  });
});
