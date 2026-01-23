import { WarehouseStock } from './types/commerce-types';

/**
 * Simplified inventory routing logic.
 * Finds the first warehouse that has enough stock for the requested quantity.
 */
export function findOptimalWarehouse(
  variantId: string, 
  quantity: number, 
  allStocks: WarehouseStock[]
): string | null {
  const relevantStocks = allStocks.filter(s => s.variantId === variantId);
  
  for (const stock of relevantStocks) {
    if (stock.quantity >= quantity) {
      return stock.warehouseId;
    }
  }

  return null;
}
