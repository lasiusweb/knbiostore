import { findOptimalWarehouse } from '../inventory-routing';
import { WarehouseStock } from '../types/commerce-types';

describe('Inventory Routing - findOptimalWarehouse', () => {
  const mockStocks: WarehouseStock[] = [
    { id: 's1', warehouseId: 'w1', variantId: 'v1', quantity: 10, updatedAt: '' },
    { id: 's2', warehouseId: 'w2', variantId: 'v1', quantity: 50, updatedAt: '' },
  ];

  it('finds the warehouse with sufficient stock', () => {
    const warehouseId = findOptimalWarehouse('v1', 20, mockStocks);
    expect(warehouseId).toBe('w2');
  });

  it('returns null if no warehouse has enough stock', () => {
    const warehouseId = findOptimalWarehouse('v1', 100, mockStocks);
    expect(warehouseId).toBeNull();
  });

  it('prefers the first warehouse if both have enough stock (simplified routing)', () => {
    const warehouseId = findOptimalWarehouse('v1', 5, mockStocks);
    expect(warehouseId).toBe('w1');
  });
});
