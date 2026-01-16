
import { createClient } from '@supabase/supabase-js';

// This is a placeholder for the actual Supabase client
const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>');

export const createCategory = async (category: { name: string }) => {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const getCategoryById = async (id: number) => {
    const { data, error } = await supabase
        .from('categories')
        .select()
        .eq('id', id);
    if (error) {
        throw new Error(error.message);
    }
    return data[0];
};
