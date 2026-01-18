import Dexie, { type EntityTable } from 'dexie';

interface Product {
  id: string;
  name: string;
  is_active: boolean;
}

interface InventoryLot {
  id: string;
  lot_number: string;
  expiry_date: string;
  available_quantity: number;
  variant_id: string;
}

export class KnBioStoreDB extends Dexie {
  products!: EntityTable<Product, 'id'>;
  inventory_lots!: EntityTable<InventoryLot, 'id'>;

  constructor() {
    super('knbiostore_pos');
    this.version(1).stores({
      products: 'id, name, is_active',
      inventory_lots: 'id, lot_number, expiry_date, available_quantity, variant_id'
    });
  }
}

export const db = new KnBioStoreDB();
