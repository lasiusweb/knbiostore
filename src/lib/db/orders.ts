
import { createClient } from '@supabase/supabase-js';

// This is a placeholder for the actual Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Safe mock for build environment
const supabaseMock = {
  from: () => ({
    insert: () => ({ select: () => ({ data: [], error: null }) }),
    select: () => ({ eq: () => ({ single: () => ({ data: null, error: null }), eq: () => ({}) }), single: () => ({ data: null, error: null }) }),
    update: () => ({ eq: () => ({ select: () => ({ data: [], error: null }) }) }),
  })
} as any;

const supabase = (supabaseUrl.includes('placeholder') || supabaseKey.includes('placeholder'))
  ? supabaseMock
  : createClient(supabaseUrl, supabaseKey);

export const createOrder = async (
  userId: number,
  cartId: number,
  totalAmount: number,
  shippingAddress: string,
  paymentStatus: string,
  b2bData?: {
    businessName?: string;
    gstNumber?: string;
    pincode?: string;
    billingAddress?: string;
    shippingMethod?: string;
    isHomeDelivery?: boolean;
    shippingCharges?: number;
    taxAmount?: number;
    discountAmount?: number;
    subtotalAmount?: number;
    contactDetails?: any;
  }
) => {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      cart_id: cartId,
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: 'pending',
      payment_status: paymentStatus,
      business_name: b2bData?.businessName,
      gst_number: b2bData?.gstNumber,
      pincode: b2bData?.pincode,
      billing_address: b2bData?.billingAddress,
      shipping_method: b2bData?.shippingMethod,
      is_home_delivery: b2bData?.isHomeDelivery,
      shipping_charges: b2bData?.shippingCharges,
      tax_amount: b2bData?.taxAmount,
      discount_amount: b2bData?.discountAmount,
      subtotal_amount: b2bData?.subtotalAmount,
      notes: b2bData?.contactDetails ? JSON.stringify(b2bData.contactDetails) : null
    })
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
