import React from 'react';
import { render } from '@testing-library/react';
import ProductDetailSkeleton from '../ProductDetailSkeleton';

describe('ProductDetailSkeleton', () => {
  it('renders correctly with multiple skeleton sections', () => {
    const { container } = render(<ProductDetailSkeleton />);
    
    // Check for shimmer skeletons
    const skeletons = container.querySelectorAll('.animate-shimmer');
    // We expect a lot of skeletons for a high-fidelity detail page
    expect(skeletons.length).toBeGreaterThan(15);
    
    // Check for gallery section (large skeleton)
    const largeSkeleton = container.querySelector('.aspect-square');
    expect(largeSkeleton).toBeInTheDocument();
  });
});
