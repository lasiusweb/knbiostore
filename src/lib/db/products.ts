
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
