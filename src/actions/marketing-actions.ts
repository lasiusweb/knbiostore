"use server"

import { createClient } from "@/lib/supabase/client";
import { validateCoupon } from "@/lib/coupon-engine";
import { Coupon } from "@/lib/types/commerce-types";

export async function applyCouponCode(code: string, cartTotal: number) {
  const supabase = createClient();
  
  try {
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !coupon) {
      return { success: false, error: 'Invalid coupon code' };
    }

    const typedCoupon: Coupon = {
      id: coupon.id,
      code: coupon.code,
      discountType: coupon.discount_type,
      discountValue: coupon.discount_value,
      minPurchase: coupon.min_purchase,
      maxDiscount: coupon.max_discount,
      startsAt: coupon.starts_at,
      expiresAt: coupon.expires_at,
      usageLimit: coupon.usage_limit,
      usedCount: coupon.used_count,
      isActive: coupon.is_active,
      createdAt: coupon.created_at
    };

    const result = validateCoupon(typedCoupon, cartTotal);
    
    if (result.isValid) {
      return { success: true, discountAmount: result.discountAmount };
    } else {
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.error('Failed to apply coupon:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
