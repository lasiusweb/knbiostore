import { renderHook, waitFor, act } from '@testing-library/react';
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

  it('fetches products and lots on mount and saves to IndexedDB', async () => {
    const mockProducts = [{ id: 'p1', name: 'Product 1' }];
    const mockLots = [{ id: 'l1', lot_number: 'LOT1' }];
    
    mockSupabase.from.mockImplementation((table: string) => ({
      select: jest.fn().mockImplementation(() => {
        if (table === 'products') return Promise.resolve({ data: mockProducts, error: null });
        return {
          eq: jest.fn().mockResolvedValue({ data: mockLots, error: null })
        };
      })
    }));

    renderHook(() => useOfflineSync());
    
    await waitFor(() => {
      expect(db.products.bulkPut).toHaveBeenCalledWith(mockProducts);
      expect(db.inventory_lots.bulkPut).toHaveBeenCalledWith(mockLots);
    });
  });

  it('updates isSyncing state correctly', async () => {
    let resolveSync: (value: any) => void;
    const syncPromise = new Promise((resolve) => {
      resolveSync = resolve;
    });

    mockSupabase.from.mockImplementation(() => ({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue(syncPromise)
      })
    }));

    const { result } = renderHook(() => useOfflineSync());
    
    expect(result.current.isSyncing).toBe(true);

    await act(async () => {
      resolveSync!({ data: [], error: null });
    });

    await waitFor(() => {
      expect(result.current.isSyncing).toBe(false);
    });
  });
});
