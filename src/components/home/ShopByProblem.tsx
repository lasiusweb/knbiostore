import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export function ShopByProblem() {
  const { shopByProblem } = MOCK_HOME_DATA;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">{shopByProblem.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopByProblem.items.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-l-4 border-l-destructive/50 hover:border-l-destructive">
                <CardContent className="flex items-center justify-start p-6 h-full space-x-4">
                   <div className="bg-destructive/10 p-3 rounded-full">
                      <AlertCircle className="text-destructive h-6 w-6" />
                   </div>
                  <span className="text-lg font-medium">{item.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
