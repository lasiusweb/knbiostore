import { NextRequest, NextResponse } from 'next/server';
import { getCartByUserId, createCart, addCartItem, getCartItems } from '@/lib/db/carts';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  let cart = await getCartByUserId(parseInt(userId, 10));

  if (!cart) {
    // If no cart exists, create one (this might need to be more robust for guest carts)
    cart = await createCart(parseInt(userId, 10));
  }

  const cartItems = await getCartItems(cart.id);
  return NextResponse.json(cartItems);
}

export async function POST(request: NextRequest) {
  const { userId, productId, variantId, quantity, priceAtAddition } = await request.json();

  if (!userId || !productId || !variantId || !quantity || !priceAtAddition) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  let cart = await getCartByUserId(userId);
  if (!cart) {
    cart = await createCart(userId);
  }

  const newCartItem = await addCartItem(cart.id, productId, variantId, quantity, priceAtAddition);
  return NextResponse.json(newCartItem, { status: 201 });
}
