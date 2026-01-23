import { PriceListItem } from './types/commerce-types';

interface PriceParams {
  variant: {
    id: string;
    salePrice: number;
  };
  priceListItems: PriceListItem[];
  userRole?: string;
  quantity: number;
}

const ROLE_DISCOUNTS: Record<string, number> = {
  'Distributor': 0.25, // 25% off
  'Dealer': 0.15,      // 15% off
};

const VOLUME_TIERS = [
  { minQuantity: 100, discount: 0.20 }, // 20% off for 100+
  { minQuantity: 50, discount: 0.10 },  // 10% off for 50+
];

export function calculatePrice({ variant, priceListItems, userRole, quantity }: PriceParams): number {
  // 1. Check for specific Price List override (Highest Priority)
  const priceListItem = priceListItems.find(item => item.variantId === variant.id);
  if (priceListItem) {
    return priceListItem.price;
  }

  // 2. Check for Role-based Discount
  if (userRole && ROLE_DISCOUNTS[userRole]) {
    return variant.salePrice * (1 - ROLE_DISCOUNTS[userRole]);
  }

  // 3. Check for Volume-based Tier
  const tier = VOLUME_TIERS.find(t => quantity >= t.minQuantity);
  if (tier) {
    return variant.salePrice * (1 - tier.discount);
  }

  // 4. Default to standard sale price
  return variant.salePrice;
}
