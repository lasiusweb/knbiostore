import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function ShopBySegment() {
  const { shopBySegment } = MOCK_HOME_DATA;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">{shopBySegment.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopBySegment.items.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-t-4 border-t-transparent hover:border-t-primary">
                <CardContent className="flex items-center justify-center p-8 text-center h-full">
                  <span className="text-xl font-semibold text-foreground">{item.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
