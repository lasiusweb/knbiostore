import { NextRequest, NextResponse } from 'next/server';
import { getCartByUserId, getCartItems, removeCartItem } from '@/lib/db/carts';
import { createOrder, addOrderItem } from '@/lib/db/orders';

export async function POST(request: NextRequest) {
  const { userId, shippingAddress, paymentInfo } = await request.json();

  if (!userId || !shippingAddress || !paymentInfo) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const cart = await getCartByUserId(userId);

  if (!cart) {
    return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
  }

  const cartItems = await getCartItems(cart.id);

  if (cartItems.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price_at_addition,
    0
  );

  // Simulate payment processing (replace with actual payment gateway integration)
  const paymentStatus = 'paid'; // Assume successful payment for now

  // Create order
  const order = await createOrder(userId, cart.id, totalAmount, shippingAddress, paymentStatus);

  // Add cart items to order items
  for (const item of cartItems) {
    await addOrderItem(
      order.id,
      item.variant_id,
      item.variant_id,
      item.quantity,
      item.price_at_addition
    );
    // Remove item from cart after adding to order
    await removeCartItem(item.id);
  }

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
