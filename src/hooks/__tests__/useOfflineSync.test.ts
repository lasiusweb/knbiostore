import { renderHook, waitFor } from '@testing-library/react';
import { useOfflineSync } from '../useOfflineSync';
import { createClient } from '@/lib/supabase/client';
import { db } from '@/lib/db';

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

jest.mock('@/lib/db', () => ({
  db: {
    products: { bulkPut: jest.fn() },
    inventory_lots: { bulkPut: jest.fn() },
  },
}));

describe('useOfflineSync', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({ data: [], error: null }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  it('fetches products and lots on mount', async () => {
    renderHook(() => useOfflineSync());
    
    await waitFor(() => {
      expect(mockSupabase.from).toHaveBeenCalledWith('products');
      expect(mockSupabase.from).toHaveBeenCalledWith('inventory_lots');
    });
  });
});
