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

interface Order {
  id: string;
  created_at: Date;
  status: 'PENDING_SYNC' | 'COMPLETED' | 'CANCELLED';
  total_amount: number;
}

interface OrderItem {
  id: string;
  order_id: string;
  lot_id: string;
  quantity: number;
  price_at_sale: number;
}

interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface CartItem {
  id?: number;
  variant_id: string;
  quantity: number;
  price_at_addition: number;
}

export class KnBioStoreDB extends Dexie {
  products!: EntityTable<Product, 'id'>;
  inventory_lots!: EntityTable<InventoryLot, 'id'>;
  orders!: EntityTable<Order, 'id'>;
  order_items!: EntityTable<OrderItem, 'id'>;
  customers!: EntityTable<Customer, 'id'>;
  cart!: EntityTable<CartItem, 'id'>;

  constructor() {
    super('knbiostore_pos');
    this.version(3).stores({
      products: 'id, name, is_active',
      inventory_lots: 'id, lot_number, expiry_date, available_quantity, variant_id',
      orders: 'id, created_at, status, total_amount',
      order_items: 'id, order_id, lot_id, quantity, price_at_sale',
      customers: 'id, name, email, phone',
      cart: '++id, variant_id, quantity, price_at_addition'
    });
  }
}

export const db = new KnBioStoreDB();