
import { createClient } from '@supabase/supabase-js';

// This is a placeholder for the actual Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabase = createClient(supabaseUrl, supabaseKey);

export const createCart = async (userId: number) => {
  const { data, error } = await supabase
    .from('carts')
    .insert({ user_id: userId })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const getCartByUserId = async (userId: number) => {
  const { data, error } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    throw new Error(error.message);
  }
  return data;
};

export const addCartItem = async (
  cartId: number,
  productId: number,
  variantId: number,
  quantity: number,
  priceAtAddition: number
) => {
  const { data, error } = await supabase
    .from('cart_items')
    .insert({ cart_id: cartId, product_id: productId, variant_id: variantId, quantity, price_at_addition: priceAtAddition })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const updateCartItemQuantity = async (itemId: number, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const removeCartItem = async (itemId: number) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId);
  if (error) {
    throw new Error(error.message);
  }
  return;
};

export const getCartItems = async (cartId: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cartId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
