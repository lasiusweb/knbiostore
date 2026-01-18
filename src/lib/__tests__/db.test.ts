import { db } from '../db';

describe('Local Database', () => {
  it('should have all required tables', () => {
    const tableNames = db.tables.map(t => t.name);
    expect(tableNames).toContain('products');
    expect(tableNames).toContain('inventory_lots');
    expect(tableNames).toContain('orders');
    expect(tableNames).toContain('order_items');
    expect(tableNames).toContain('customers');
  });

  it('should initialize with the correct database name', () => {
    expect(db.name).toBe('knbiostore_pos');
  });

  it('should be able to add and get a product', async () => {
    const product = { id: 'p1', name: 'Test Product', is_active: true };
    await db.products.add(product);
    const retrieved = await db.products.get('p1');
    expect(retrieved).toEqual(product);
  });

  it('should be able to add and get an inventory lot', async () => {
    const lot = {
      id: 'l1',
      lot_number: 'LOT001',
      expiry_date: '2026-12-31',
      available_quantity: 50,
      variant_id: 'v1'
    };
    await db.inventory_lots.add(lot);
    const retrieved = await db.inventory_lots.get('l1');
    expect(retrieved).toEqual(lot);
  });
});
