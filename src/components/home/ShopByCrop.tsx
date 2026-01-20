import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function ShopByCrop() {
  const { shopByCrop } = MOCK_HOME_DATA;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">{shopByCrop.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {shopByCrop.items.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card className="hover:shadow-md transition-all cursor-pointer h-full hover:-translate-y-1">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mb-4 flex items-center justify-center text-primary text-2xl font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
