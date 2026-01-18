import { db } from '../db';

describe('Local Database', () => {
  it('should have products and inventory_lots tables', () => {
    expect(db.tables.map(t => t.name)).toContain('products');
    expect(db.tables.map(t => t.name)).toContain('inventory_lots');
  });

  it('should initialize with the correct database name', () => {
    expect(db.name).toBe('knbiostore_pos');
  });
});
