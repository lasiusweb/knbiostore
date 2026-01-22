import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function StoreProductList() {
  const supabase = createClient();
  
  const { data: products, error } = await supabase
    .from('products')
    .select('*, product_variants(*)');

  if (error) {
    console.error('Error fetching products:', error);
    return <div>Error loading products.</div>;
  }

  if (!products || products.length === 0) {
    return <div className="text-center py-12">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product: any) => {
        const firstVariant = product.product_variants?.[0];
        const price = firstVariant ? `Starting from ₹${firstVariant.price}` : 'Price not available';

        return (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-[300px] flex items-center justify-center mb-4 text-gray-500">
                Image Upload Coming Soon
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{product.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto">
              <span className="font-bold text-lg">{price}</span>
              <Button asChild>
                <Link href={`/store/${product.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}