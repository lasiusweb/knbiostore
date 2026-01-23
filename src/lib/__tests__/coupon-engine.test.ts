import { validateCoupon } from '../coupon-engine';
import { Coupon } from '../types/commerce-types';

describe('Coupon Engine - validateCoupon', () => {
  const mockCoupon: Coupon = {
    id: 'c1',
    code: 'SAVE10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 100,
    isActive: true,
    usedCount: 0,
    startsAt: '2020-01-01',
    createdAt: '',
  };

  it('validates a correct percentage coupon', () => {
    const result = validateCoupon(mockCoupon, 150);
    expect(result.isValid).toBe(true);
    expect(result.discountAmount).toBe(15);
  });

  it('fails if minimum purchase is not met', () => {
    const result = validateCoupon(mockCoupon, 50);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Minimum purchase');
  });

  it('handles fixed amount coupons', () => {
    const fixedCoupon: Coupon = { 
      ...mockCoupon, 
      discountType: 'fixed', 
      discountValue: 50 
    };
    const result = validateCoupon(fixedCoupon, 200);
    expect(result.isValid).toBe(true);
    expect(result.discountAmount).toBe(50);
  });

  it('fails if coupon is expired', () => {
    const expiredCoupon: Coupon = { 
      ...mockCoupon, 
      expiresAt: '2021-01-01' 
    };
    const result = validateCoupon(expiredCoupon, 200);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Coupon has expired');
  });

  it('fails if usage limit is reached', () => {
    const limitedCoupon: Coupon = { 
      ...mockCoupon, 
      usageLimit: 5, 
      usedCount: 5 
    };
    const result = validateCoupon(limitedCoupon, 200);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe('Coupon usage limit reached');
  });
});
