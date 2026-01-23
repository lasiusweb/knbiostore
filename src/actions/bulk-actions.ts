"use server"

import { createClient } from "@/lib/supabase/client";
import { validateProductCSV } from "@/lib/csv-utils";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";

export async function importProductsFromCSV(csvContent: string) {
  const validation = validateProductCSV(csvContent);
  if (!validation.success || !validation.data) {
    return { success: false, error: validation.error };
  }

  const supabase = createClient();
  const products = validation.data;

  try {
    for (const item of products) {
      // 1. Upsert product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .upsert({ 
          name: item.product_name, 
          description: item.description 
        }, { onConflict: 'name' })
        .select()
        .single();

      if (productError) throw productError;

      // 2. Upsert variant
      const { error: variantError } = await supabase
        .from('product_variants')
        .upsert({
          product_id: productData.id,
          sku: item.sku,
          price: item.sale_price,
          mrp: item.mrp,
          in_stock: item.in_stock
        }, { onConflict: 'sku' });

      if (variantError) throw variantError;
    }

    revalidatePath('/admin/products');
    return { success: true, message: `Successfully imported ${products.length} products.` };
  } catch (error) {
    const pgError = error as PostgrestError;
    console.error('Bulk import failed:', pgError);
    return { success: false, error: pgError.message || 'Failed to import products' };
  }
}

interface ProductWithVariants {
  id: string;
  name: string;
  description: string;
  product_variants: Array<{
    sku: string;
    price: number;
    mrp?: number;
    in_stock?: boolean;
  }>;
}

export async function exportProductsToCSV() {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*)');

    if (error) throw error;

    if (!data || data.length === 0) {
      return { success: false, error: 'No products found to export' };
    }

    const products = data as unknown as ProductWithVariants[];
    const headers = ['sku', 'product_name', 'sale_price', 'mrp', 'in_stock', 'description'];
    const rows = products.flatMap((product) => 
      product.product_variants.map((variant) => [
        variant.sku,
        product.name,
        variant.price,
        variant.mrp || variant.price,
        variant.in_stock ?? true,
        product.description
      ].join(','))
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    return { success: true, data: csvContent };
  } catch (error) {
    const pgError = error as PostgrestError;
    console.error('Export failed:', pgError);
    return { success: false, error: pgError.message || 'Failed to export products' };
  }
}

export async function batchUpdateProducts(ids: string[], updates: { price?: number; in_stock?: boolean }) {
  const supabase = createClient();
  
  try {
    if (updates.price !== undefined) {
      const { error } = await supabase
        .from('product_variants')
        .update({ price: updates.price })
        .in('product_id', ids);
      
      if (error) throw error;
    }

    if (updates.in_stock !== undefined) {
      const { error } = await supabase
        .from('product_variants')
        .update({ in_stock: updates.in_stock })
        .in('product_id', ids);
      
      if (error) throw error;
    }

    revalidatePath('/admin/products');
    return { success: true, message: `Successfully updated ${ids.length} products.` };
  } catch (error) {
    const pgError = error as PostgrestError;
    console.error('Batch update failed:', pgError);
    return { success: false, error: pgError.message || 'Failed to update products' };
  }
}
