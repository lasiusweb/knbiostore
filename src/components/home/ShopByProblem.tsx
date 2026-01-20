import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export function ShopByProblem() {
  const { shopByProblem } = MOCK_HOME_DATA;

  const getSeverityStyles = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-destructive bg-destructive/5 hover:bg-destructive/10';
      case 'medium':
        return 'border-l-amber-500 bg-amber-500/5 hover:bg-amber-500/10';
      default:
        return 'border-l-primary bg-primary/5 hover:bg-primary/10';
    }
  };

  const getSeverityIconColor = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'text-destructive bg-destructive/10';
      case 'medium':
        return 'text-amber-500 bg-amber-500/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <section className="py-16 md:py-20 section-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="text-sm font-medium text-destructive">Common Pest & Deficiency Solutions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {shopByProblem.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find targeted solutions for the most common problems affecting your crops
          </p>
        </div>

        {/* Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {shopByProblem.items.map((item) => (
            <Link key={item.id} href={item.link}>
              <Card
                className={`group h-full border-l-4 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${getSeverityStyles(item.severity)}`}
              >
                <CardContent className="flex items-center justify-between p-6 h-full">
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-full ${getSeverityIconColor(item.severity)} transition-colors duration-300`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>

                    {/* Text */}
                    <div>
                      <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </span>
                      {item.severity === 'high' && (
                        <span className="block text-xs text-destructive font-medium mt-1">
                          High Impact
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
