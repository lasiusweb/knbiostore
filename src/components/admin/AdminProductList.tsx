// src/components/admin/AdminProductList.tsx
import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { BulkProductTable, BulkProduct } from './BulkProductTable';
import { BulkActionsHeader } from './BulkActionsHeader';
import { PostgrestError } from '@supabase/supabase-js';

const AdminProductList = async () => {
  const supabase = createClient();
  let products: BulkProduct[] = [];
  let error: PostgrestError | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*, product_variants(*)');

    products = (data as unknown as BulkProduct[]) || [];
    error = fetchError;
  } catch (err) {
    console.error('Error fetching products:', err);
    error = err as PostgrestError;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Product List</h1>
        <BulkActionsHeader />
      </div>
      
      {products.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-xl">
          <p className="text-lg text-muted-foreground">No products found. Click &apos;Import&apos; or add a new product.</p>
        </div>
      ) : (
        <BulkProductTable products={products} />
      )}
    </div>
  );
};

export default AdminProductList;