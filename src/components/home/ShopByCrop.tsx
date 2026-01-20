import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function ShopByCrop() {
  const { shopByCrop } = MOCK_HOME_DATA;

  return (
    <section className="py-16 md:py-20 section-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {shopByCrop.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Grid - 5 columns on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {shopByCrop.items.map((item, index) => (
            <Link key={item.id} href={item.link}>
              <Card
                className="group h-full bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 text-center">
                  {/* Icon Circle */}
                  <div className="relative mb-3">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                      <span className="text-3xl md:text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Name */}
                  <span className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
