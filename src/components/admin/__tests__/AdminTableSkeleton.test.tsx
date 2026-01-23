import React from 'react';
import { render } from '@testing-library/react';
import AdminTableSkeleton from '../AdminTableSkeleton';

describe('AdminTableSkeleton', () => {
  it('renders table structure with 5 skeleton rows', () => {
    const { container } = render(<AdminTableSkeleton />);
    
    const rows = container.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
    
    const skeletons = container.querySelectorAll('.animate-shimmer');
    // Each row has: 1 (name) + 1 (sku) + 1 (price) + 2 (tags) + 1 (desc) = 6 skeletons
    // Total = 6 * 5 = 30
    expect(skeletons.length).toBe(30);
  });
});
