"use server"

import { createClient } from "@/lib/supabase/client";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";

export async function updateWarehouseStock(warehouseId: string, variantId: string, quantity: number) {
  const supabase = createClient();
  
  try {
    const { error } = await supabase
      .from('warehouse_stock')
      .upsert({
        warehouse_id: warehouseId,
        variant_id: variantId,
        quantity: quantity,
        updated_at: new Date().toISOString()
      }, { onConflict: 'warehouse_id,variant_id' });

    if (error) throw error;

    revalidatePath('/admin/inventory');
    return { success: true, message: 'Stock updated successfully.' };
  } catch (error) {
    const pgError = error as PostgrestError;
    console.error('Failed to update warehouse stock:', pgError);
    return { success: false, error: pgError.message || 'Failed to update stock' };
  }
}

export async function getWarehouses() {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('warehouses')
      .select('*')
      .eq('is_active', true);
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    const pgError = error as PostgrestError;
    return { success: false, error: pgError.message || 'Failed to fetch warehouses' };
  }
}
