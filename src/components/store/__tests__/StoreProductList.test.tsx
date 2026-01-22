import React from 'react';
import { render, screen } from '@testing-library/react';
import StoreProductList from '../StoreProductList';

// Mock the createClient for server components
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  })),
}));

describe('StoreProductList', () => {
  it('fetches products on mount', async () => {
    const mockFrom = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockResolvedValue({ data: [], error: null });

    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: mockFrom,
      select: mockSelect,
    });

    // Since it's an async server component, we await it
    await StoreProductList();

    expect(mockFrom).toHaveBeenCalledWith('products');
    expect(mockSelect).toHaveBeenCalledWith('*, product_variants(*)');
  });

  it('renders products correctly', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Test Product 1',
        description: 'Description 1',
        product_variants: [
          { sku: 'SKU1', price: 100 }
        ]
      },
      {
        id: '2',
        name: 'Test Product 2',
        description: 'Description 2',
        product_variants: [
          { sku: 'SKU2', price: 200 }
        ]
      }
    ];

    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: mockProducts, error: null }),
    });

    const Component = await StoreProductList();
    render(Component);

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    expect(screen.getByText('Starting from ₹100')).toBeInTheDocument();
    expect(screen.getByText('Starting from ₹200')).toBeInTheDocument();
  });

  it('renders empty state when no products', async () => {
    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    });

    const Component = await StoreProductList();
    render(Component);

    expect(screen.getByText(/No products found/i)).toBeInTheDocument();
  });
});
