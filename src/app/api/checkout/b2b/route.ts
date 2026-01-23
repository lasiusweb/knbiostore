import { NextRequest, NextResponse } from 'next/server';
import { getCartByUserId, getCartItems, removeCartItem } from '@/lib/db/carts';
import { createOrder, addOrderItem } from '@/lib/db/orders';

export async function POST(request: NextRequest) {
  const { 
    userId, 
    shippingAddress, 
    paymentType,
    businessName,
    gstNumber,
    pincode,
    billingAddress,
    shippingMethod,
    isHomeDelivery,
    shippingCharges,
    taxAmount,
    discountAmount,
    subtotalAmount,
    contactDetails
  } = await request.json();

  if (!userId || !shippingAddress || !paymentType) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const cart = await getCartByUserId(userId);
  if (!cart) return NextResponse.json({ error: 'Cart not found' }, { status: 404 });

  const cartItems = await getCartItems(cart.id);
  if (cartItems.length === 0) return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });

  const calculatedSubtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price_at_addition,
    0
  );

  // Use subtotalAmount from client if provided, or calculated one
  const subtotal = subtotalAmount || calculatedSubtotal;
  const totalAmount = subtotal + (shippingCharges || 0) + (taxAmount || 0) - (discountAmount || 0);

  let amountPaid = totalAmount;
  let paymentStatus = 'paid';

  if (paymentType === 'partial') {
    // 30% mandatory deposit for B2B partial payments
    amountPaid = totalAmount * 0.3;
    paymentStatus = 'partially_paid';
  }

  // Create order with partial payment support and B2B fields
  const order = await createOrder(
    userId, 
    cart.id, 
    totalAmount, 
    shippingAddress, 
    paymentStatus,
    {
      businessName,
      gstNumber,
      pincode,
      billingAddress,
      shippingMethod,
      isHomeDelivery,
      shippingCharges,
      tax_amount: taxAmount,
      discount_amount: discountAmount,
      subtotalAmount: subtotal,
      contactDetails
    }
  );

  // Add order items and clear cart
  for (const item of cartItems) {
    await addOrderItem(
      order.id,
      item.product_id,
      item.variant_id,
      item.quantity,
      item.price_at_addition
    );
    await removeCartItem(item.id);
  }

  return NextResponse.json({ 
    orderId: order.id, 
    totalAmount, 
    amountPaid, 
    balanceDue: totalAmount - amountPaid 
  }, { status: 201 });
}
