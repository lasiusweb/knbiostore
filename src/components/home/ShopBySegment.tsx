import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export function ShopBySegment() {
  const { shopBySegment } = MOCK_HOME_DATA;

  return (
    <section className="py-16 md:py-20 section-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {shopBySegment.title}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {shopBySegment.items.map((item, index) => (
            <Link key={item.id} href={item.link}>
              <Card
                className={`group h-full border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer card-hover overflow-hidden stagger-${(index % 5) + 1} animate-fade-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[160px] relative">
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon */}
                  <div className="relative z-10 text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>

                  {/* Name */}
                  <span className="relative z-10 text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.name}
                  </span>

                  {/* Description */}
                  {item.description && (
                    <span className="relative z-10 text-xs text-muted-foreground mt-1 hidden md:block">
                      {item.description}
                    </span>
                  )}

                  {/* Arrow */}
                  <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
