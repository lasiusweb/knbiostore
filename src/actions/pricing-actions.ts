"use server"

import { createClient } from "@/lib/supabase/client";
import { PriceListItem } from "@/lib/types/commerce-types";

export async function getCurrentUserPricingContext() {
  const supabase = createClient();
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { userRole: 'guest', priceListItems: [] };

    const userId = session.user.id;

    // 1. Get User Role from user metadata or profile (assuming metadata for now)
    const userRole = session.user.user_metadata?.role || 'user';

    // 2. Get Assigned Price List
    const { data: priceListMap } = await supabase
      .from('user_price_list_map')
      .select('price_list_id')
      .eq('user_id', userId)
      .single();

    let priceListItems: PriceListItem[] = [];

    if (priceListMap) {
      const { data: items } = await supabase
        .from('price_list_items')
        .select('*')
        .eq('price_list_id', priceListMap.price_list_id);
      
      if (items) {
        priceListItems = items.map(item => ({
          id: item.id,
          priceListId: item.price_list_id,
          variantId: item.variant_id,
          price: item.price,
          createdAt: item.created_at,
          updatedAt: item.updated_at
        }));
      }
    }

    return { userRole, priceListItems };
  } catch (error) {
    console.error('Failed to get pricing context:', error);
    return { userRole: 'user', priceListItems: [] };
  }
}
