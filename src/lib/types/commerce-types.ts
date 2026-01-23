/**
 * Commerce Types for Core Commerce & B2B Expansion
 */

export type DiscountType = 'fixed' | 'percentage' | 'bogo';

export interface PriceList {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PriceListItem {
  id: string;
  priceListId: string;
  variantId: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserPriceListMap {
  id: string;
  userId: string;
  priceListId: string;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  location?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseStock {
  id: string;
  warehouseId: string;
  variantId: string;
  quantity: number;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  startsAt: string;
  expiresAt?: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}
