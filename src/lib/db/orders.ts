
import { createClient } from '@supabase/supabase-js';

// This is a placeholder for the actual Supabase client
const supabase = createClient('https://<project>.supabase.co', '<your-anon-key>');

export const createOrder = async (
  userId: number,
  cartId: number,
  totalAmount: number,
  shippingAddress: string,
  paymentStatus: string // Added paymentStatus
) => {
  const { data, error } = await supabase
    .from('orders')
    .insert({ user_id: userId, cart_id: cartId, total_amount: totalAmount, shipping_address: shippingAddress, status: 'pending', payment_status: paymentStatus }) // Default status to 'pending'
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const getOrderById = async (orderId: number) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();
  if (error && error.code !== 'PGRST116') {
    throw new Error(error.message);
  }
  return data;
};

export const getOrdersByUserId = async (userId: number) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addOrderItem = async (
  orderId: number,
  productId: number,
  variantId: number,
  quantity: number,
  priceAtPurchase: number
) => {
  const { data, error } = await supabase
    .from('order_items')
    .insert({ order_id: orderId, product_id: productId, variant_id: variantId, quantity, price_at_purchase: priceAtPurchase })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};
