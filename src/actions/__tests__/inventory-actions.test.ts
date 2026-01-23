import { updateWarehouseStock, getWarehouses } from '../inventory-actions';
import { createClient } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Inventory Actions', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
  });

  describe('updateWarehouseStock', () => {
    it('successfully updates warehouse stock and revalidates path', async () => {
      (mockSupabase.upsert as jest.Mock).mockResolvedValue({ error: null });

      const result = await updateWarehouseStock('w1', 'v1', 100);

      expect(mockSupabase.from).toHaveBeenCalledWith('warehouse_stock');
      expect(mockSupabase.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          warehouse_id: 'w1',
          variant_id: 'v1',
          quantity: 100,
        }),
        { onConflict: 'warehouse_id,variant_id' }
      );
      expect(revalidatePath).toHaveBeenCalledWith('/admin/inventory');
      expect(result).toEqual({ success: true, message: 'Stock updated successfully.' });
    });

    it('returns error if upsert fails', async () => {
      const mockError = { message: 'DB Error' };
      (mockSupabase.upsert as jest.Mock).mockResolvedValue({ error: mockError });

      const result = await updateWarehouseStock('w1', 'v1', 100);

      expect(result).toEqual({ success: false, error: 'DB Error' });
    });
  });

  describe('getWarehouses', () => {
    it('successfully fetches active warehouses', async () => {
      const mockData = [{ id: 'w1', name: 'Warehouse 1' }];
      (mockSupabase.eq as jest.Mock).mockResolvedValue({ data: mockData, error: null });

      const result = await getWarehouses();

      expect(mockSupabase.from).toHaveBeenCalledWith('warehouses');
      expect(mockSupabase.select).toHaveBeenCalledWith('*');
      expect(mockSupabase.eq).toHaveBeenCalledWith('is_active', true);
      expect(result).toEqual({ success: true, data: mockData });
    });

    it('returns error if fetch fails', async () => {
      const mockError = { message: 'Fetch Error' };
      (mockSupabase.eq as jest.Mock).mockResolvedValue({ data: null, error: mockError });

      const result = await getWarehouses();

      expect(result).toEqual({ success: false, error: 'Fetch Error' });
    });
  });
});
