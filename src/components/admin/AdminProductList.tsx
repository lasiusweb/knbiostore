// src/components/admin/AdminProductList.tsx
import React from 'react';
import { createClient } from '@/lib/supabase/client';

const AdminProductList = async () => {
  const supabase = createClient();
  let products = [];
  let error = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*, product_variants(*)');

    products = data || [];
    error = fetchError;
  } catch (err) {
    console.error('Error fetching products:', err);
    error = err;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div>
      <h1>Admin Product List</h1>
      {/* Product list will be rendered here */}
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
};

export default AdminProductList;
