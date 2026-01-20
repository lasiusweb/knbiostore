import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

export function ChampionSelector() {
  const { farmingSegment } = MOCK_HOME_DATA;

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{farmingSegment.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmingSegment.items.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card className="hover:scale-105 transition-transform cursor-pointer h-full bg-primary-foreground/10 border-none text-primary-foreground hover:bg-primary-foreground/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-white/20 p-4 rounded-full w-fit mb-4">
                        <Trophy className="h-8 w-8 text-yellow-300" />
                    </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-sm opacity-90">Find specialized solutions.</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
