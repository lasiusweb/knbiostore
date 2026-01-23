import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BulkProductTable } from '../BulkProductTable';

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Desc 1',
    tags: ['tag1'],
    product_variants: [{ sku: 'SKU1', price: 100 }]
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Desc 2',
    tags: [],
    product_variants: [{ sku: 'SKU2', price: 200 }]
  }
];

describe('BulkProductTable', () => {
  it('renders checkboxes for each product', () => {
    render(<BulkProductTable products={mockProducts} />);
    const checkboxes = screen.getAllByRole('checkbox');
    // 1 for header (select all) + 2 for products = 3
    expect(checkboxes.length).toBe(3);
  });

  it('updates selected count when a checkbox is clicked', () => {
    render(<BulkProductTable products={mockProducts} />);
    const checkboxes = screen.getAllByRole('checkbox');
    
    fireEvent.click(checkboxes[1]); // Select first product
    expect(screen.getByText('1 products selected')).toBeInTheDocument();
    
    fireEvent.click(checkboxes[2]); // Select second product
    expect(screen.getByText('2 products selected')).toBeInTheDocument();
  });
});
