import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import InventoryLotForm from '../InventoryLotForm';
import { createClient } from '@/lib/supabase/client';
import { act } from 'react';

// Mock Supabase
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

describe('InventoryLotForm', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('renders the form title', async () => {
    await act(async () => {
      render(<InventoryLotForm />);
    });
    expect(screen.getByText(/Add New Inventory Lot/i)).toBeInTheDocument();
  });

  it('fetches product variants on mount', async () => {
    await act(async () => {
      render(<InventoryLotForm />);
    });
    expect(mockSupabase.from).toHaveBeenCalledWith('product_variants');
    expect(mockSupabase.select).toHaveBeenCalledWith('*, products(name)');
  });
});
