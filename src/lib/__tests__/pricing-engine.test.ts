import { calculatePrice } from '../pricing-engine';
import { PriceListItem } from '../types/commerce-types';

describe('Pricing Engine - calculatePrice', () => {
  const mockVariant = {
    id: 'v1',
    salePrice: 100,
  };

  const mockPriceListItems: PriceListItem[] = [
    { id: 'pli1', priceListId: 'pl1', variantId: 'v1', price: 80, createdAt: '', updatedAt: '' }
  ];

  it('applies price list override if available', () => {
    const price = calculatePrice({
      variant: mockVariant,
      priceListItems: mockPriceListItems,
      userRole: 'user',
      quantity: 1
    });
    expect(price).toBe(80);
  });

  it('applies role-based discount if no price list item', () => {
    const price = calculatePrice({
      variant: mockVariant,
      priceListItems: [],
      userRole: 'Distributor',
      quantity: 1
    });
    // Assuming Distributor gets 25% off 100 = 75
    expect(price).toBe(75);
  });

  it('applies volume-based tier if quantity is high', () => {
    const price = calculatePrice({
      variant: mockVariant,
      priceListItems: [],
      userRole: 'user',
      quantity: 100
    });
    // Assuming 100+ units gets 20% off 100 = 80
    expect(price).toBe(80);
  });

  it('returns base sale price if no rules apply', () => {
    const price = calculatePrice({
      variant: mockVariant,
      priceListItems: [],
      userRole: 'user',
      quantity: 1
    });
    expect(price).toBe(100);
  });
});
