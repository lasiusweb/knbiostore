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

  it('should be able to add and get an order', async () => {
    const now = new Date();
    const order: any = {
      id: 'o1',
      created_at: now,
      status: 'PENDING_SYNC',
      total_amount: 1500
    };
    await db.orders.add(order);
    const retrieved = await db.orders.get('o1');
    expect(retrieved?.id).toBe(order.id);
    expect(retrieved?.status).toBe(order.status);
    expect(retrieved?.total_amount).toBe(order.total_amount);
    // Handle both Date object and ISO string for flexibility in tests
    const retrievedDate = retrieved?.created_at instanceof Date 
      ? retrieved.created_at.toISOString() 
      : retrieved?.created_at;
    expect(retrievedDate).toBe(now.toISOString());
  });

  it('should be able to add and get an order item', async () => {
    const item = {
      id: 'oi1',
      order_id: 'o1',
      lot_id: 'l1',
      quantity: 2,
      price_at_sale: 750
    };
    await db.order_items.add(item);
    const retrieved = await db.order_items.get('oi1');
    expect(retrieved).toEqual(item);
  });

  it('should be able to add and get a customer', async () => {
    const customer = {
      id: 'c1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890'
    };
    await db.customers.add(customer);
    const retrieved = await db.customers.get('c1');
    expect(retrieved).toEqual(customer);
  });
});
