import React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from '../skeleton';

describe('Skeleton Component', () => {
  it('applies the brand-aligned shimmer animation and background', () => {
    const { container } = render(<Skeleton className="w-[100px] h-[20px]" />);
    const skeleton = container.firstChild as HTMLElement;
    
    expect(skeleton).toHaveClass('animate-shimmer');
    expect(skeleton).toHaveClass('bg-skeleton');
    // Ensure it doesn't have the old classes if we are replacing them
    expect(skeleton).not.toHaveClass('animate-pulse');
    expect(skeleton).not.toHaveClass('bg-muted');
  });

  it('allows custom classes to be passed', () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('custom-class');
  });
});
