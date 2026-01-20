
import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/db/products';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);
  if (isNaN(id)) {
    return new NextResponse('Invalid product ID', { status: 400 });
  }

  const product = await getProductById(id);

  if (!product) {
    return new NextResponse('Product not found', { status: 404 });
  }

  return NextResponse.json(product);
}
