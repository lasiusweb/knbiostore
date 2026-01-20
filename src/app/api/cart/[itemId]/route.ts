import { NextRequest, NextResponse } from 'next/server';
import { updateCartItemQuantity, removeCartItem } from '@/lib/db/carts';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const id = parseInt(itemId, 10);
  const { quantity } = await request.json();

  if (isNaN(id) || !quantity) {
    return NextResponse.json({ error: 'Invalid item ID or quantity' }, { status: 400 });
  }

  const updatedItem = await updateCartItemQuantity(id, quantity);
  return NextResponse.json(updatedItem);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = await params;
  const id = parseInt(itemId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid item ID' }, { status: 400 });
  }

  await removeCartItem(id);
  return new NextResponse(null, { status: 204 });
}
