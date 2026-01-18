import React from 'react';
import { render, screen } from '@testing-library/react';
import { addDays } from 'date-fns';
import ExpiryMonitor from '../ExpiryMonitor';

// Mock the createClient for server components if needed
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  })),
}));

describe('ExpiryMonitor', () => {
  it('fetches expiring lots on mount', async () => {
    const mockFrom = jest.fn().mockReturnThis();
    const mockSelect = jest.fn().mockReturnThis();
    const mockGte = jest.fn().mockReturnThis();
    const mockLte = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockResolvedValue({ data: [], error: null });

    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: mockFrom,
      select: mockSelect,
      gte: mockGte,
      lte: mockLte,
      eq: mockEq,
    });

    await ExpiryMonitor();

    expect(mockFrom).toHaveBeenCalledWith('inventory_lots');
    expect(mockSelect).toHaveBeenCalledWith('*, product_variants(*, products(*))');
    expect(mockEq).toHaveBeenCalledWith('status', 'available');
  });

  it('renders table headers correctly', async () => {
    const mockLots = [
      {
        id: '1',
        lot_number: 'LOT123',
        expiry_date: new Date().toISOString(),
        available_quantity: 100,
        product_variants: {
          sku: 'SKU123',
          products: { name: 'Product 1' }
        }
      }
    ];

    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: mockLots, error: null }),
    });

    const Component = await ExpiryMonitor();
    render(Component);
    
    expect(screen.getByText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SKU/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Lot Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Expiry Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Available Qty/i)).toBeInTheDocument();
    expect(screen.getByText(/Days Left/i)).toBeInTheDocument();
  });

  it('calculates days left correctly', async () => {
    const today = new Date();
    const mockLots = [
      {
        id: '1',
        lot_number: 'LOT1',
        expiry_date: addDays(today, 5).toISOString(),
        available_quantity: 10,
        product_variants: { sku: 'S1', products: { name: 'P1' } }
      },
      {
        id: '2',
        lot_number: 'LOT2',
        expiry_date: addDays(today, -1).toISOString(),
        available_quantity: 10,
        product_variants: { sku: 'S2', products: { name: 'P2' } }
      }
    ];

    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: mockLots, error: null }),
    });

    const Component = await ExpiryMonitor();
    render(Component);

    expect(screen.getByText(/5 days/i)).toBeInTheDocument();
    expect(screen.getByText(/Expired/i)).toBeInTheDocument();
  });

  it('applies correct badge variants based on days left', async () => {
    const today = new Date();
    const mockLots = [
      {
        id: '1',
        lot_number: 'LOT1',
        expiry_date: addDays(today, 5).toISOString(),
        available_quantity: 10,
        product_variants: { sku: 'S1', products: { name: 'P1' } }
      },
      {
        id: '2',
        lot_number: 'LOT2',
        expiry_date: addDays(today, 10).toISOString(),
        available_quantity: 10,
        product_variants: { sku: 'S2', products: { name: 'P2' } }
      },
      {
        id: '3',
        lot_number: 'LOT3',
        expiry_date: addDays(today, 20).toISOString(),
        available_quantity: 10,
        product_variants: { sku: 'S3', products: { name: 'P3' } }
      }
    ];

    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: mockLots, error: null }),
    });

    const Component = await ExpiryMonitor();
    render(Component);

    // Filter out the header "Days Left"
    const badges = screen.getAllByText(/days$/i);
    
    // 5 days -> destructive
    expect(badges[0]).toHaveClass('bg-destructive');
    // 10 days -> secondary
    expect(badges[1]).toHaveClass('bg-secondary');
    // 20 days -> default (primary in shadcn usually)
    expect(badges[2]).toHaveClass('bg-primary');
  });

  it('renders empty state when no items expiring soon', async () => {
    const { createClient } = require('@/lib/supabase/client');
    createClient.mockReturnValue({
      from: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      gte: jest.fn().mockReturnThis(),
      lte: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({ data: [], error: null }),
    });

    const Component = await ExpiryMonitor();
    render(Component);

    expect(screen.getByText(/No items expiring soon/i)).toBeInTheDocument();
  });
});
