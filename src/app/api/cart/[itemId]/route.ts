import { NextRequest, NextResponse } from 'next/server';
import { updateCartItemQuantity, removeCartItem } from '@/lib/db/carts';

export async function PUT(request: NextRequest, { params }: { params: { itemId: string } }) {
  const itemId = parseInt(params.itemId, 10);
  const { quantity } = await request.json();

  if (isNaN(itemId) || !quantity) {
    return NextResponse.json({ error: 'Invalid item ID or quantity' }, { status: 400 });
  }

  const updatedItem = await updateCartItemQuantity(itemId, quantity);
  return NextResponse.json(updatedItem);
}

export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
  const itemId = parseInt(params.itemId, 10);

  if (isNaN(itemId)) {
    return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
  }

  await removeCartItem(itemId);
  return new NextResponse(null, { status: 204 });
}
