import { Coupon } from './types/commerce-types';

export interface CouponValidationResult {
  isValid: boolean;
  discountAmount: number;
  error?: string;
}

export function validateCoupon(coupon: Coupon, cartTotal: number): CouponValidationResult {
  const now = new Date();

  // 1. Basic status check
  if (!coupon.isActive) {
    return { isValid: false, discountAmount: 0, error: 'Coupon is inactive' };
  }

  // 2. Date validation
  const startsAt = new Date(coupon.startsAt);
  if (now < startsAt) {
    return { isValid: false, discountAmount: 0, error: 'Coupon is not yet active' };
  }

  if (coupon.expiresAt) {
    const expiresAt = new Date(coupon.expiresAt);
    if (now > expiresAt) {
      return { isValid: false, discountAmount: 0, error: 'Coupon has expired' };
    }
  }

  // 3. Usage limits
  if (coupon.usageLimit !== undefined && coupon.usedCount >= coupon.usageLimit) {
    return { isValid: false, discountAmount: 0, error: 'Coupon usage limit reached' };
  }

  // 4. Minimum purchase
  if (cartTotal < coupon.minPurchase) {
    return { isValid: false, discountAmount: 0, error: `Minimum purchase of ₹${coupon.minPurchase} required` };
  }

  // 5. Calculate discount
  let discountAmount = 0;

  switch (coupon.discountType) {
    case 'percentage':
      discountAmount = (cartTotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
      break;
    case 'fixed':
      discountAmount = coupon.discountValue;
      break;
    case 'bogo':
      // Simplified BOGO: 50% off if BOGO applies, usually requires specific items
      // For global cart context, we'll treat it as a placeholder for item-specific logic
      discountAmount = 0; 
      break;
  }

  // Cap discount at cart total
  discountAmount = Math.min(discountAmount, cartTotal);

  return { isValid: true, discountAmount };
}
