
import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/db/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || undefined;
  const category = searchParams.get('category') || undefined;

  const products = await getProducts(search, category);
  return NextResponse.json(products);
}

