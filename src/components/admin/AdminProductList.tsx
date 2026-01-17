// src/components/admin/AdminProductList.tsx
import React from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Admin Product List</h1>
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg">No products found. Click here to add a new product.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price (INR)</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {product.product_variants?.[0]?.sku || 'N/A'}
                </TableCell>
                <TableCell>
                  {product.product_variants?.[0]?.price || 'N/A'}
                </TableCell>
                <TableCell>
                  {product.tags?.join(', ') || 'No Tags'}
                </TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminProductList;
