
import { createClient } from '@supabase/supabase-js';

// This is a placeholder for the actual Supabase client
const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>');

export const createProduct = async (product: { name: string; price: number }) => {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const getProductById = async (id: number) => {
    const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', id);
    if (error) {
        throw new Error(error.message);
    }
    return data[0];
};

export const getProducts = async (search?: string, category?: string) => {
  // Dummy implementation for search and category filtering
  let products = [
    { id: 1, name: 'Product A', price: 100, category: 'Electronics', imageUrl: '' },
    { id: 2, name: 'Product B', price: 200, category: 'Books', imageUrl: '' },
    { id: 3, name: 'Product C', price: 150, category: 'Electronics', imageUrl: '' },
  ];

  if (search) {
    products = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (category) {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return products;
};

