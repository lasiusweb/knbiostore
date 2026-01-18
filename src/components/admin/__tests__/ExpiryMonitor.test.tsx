import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
