import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, ChevronRight } from 'lucide-react';

export function ChampionSelector() {
  const { farmingSegment } = MOCK_HOME_DATA;

  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'emerald':
        return 'from-emerald-500/20 to-emerald-600/20 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30';
      case 'blue':
        return 'from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30';
      case 'amber':
        return 'from-amber-500/20 to-amber-600/20 group-hover:from-amber-500/30 group-hover:to-amber-600/30';
      case 'green':
        return 'from-green-500/20 to-green-600/20 group-hover:from-green-500/30 group-hover:to-green-600/30';
      default:
        return 'from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30';
    }
  };

  return (
    <section className="py-16 md:py-24 section-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 border border-primary/20">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-primary-foreground">Choose Your Path</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">{farmingSegment.title}</span>
          </h2>
          {farmingSegment.subtitle && (
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {farmingSegment.subtitle}
            </p>
          )}
        </div>

        {/* Grid - 4 columns on large desktop, 2 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmingSegment.items.map((item, index) => (
            <Link key={item.id} href={item.link}>
              <Card
                className={`group h-full bg-gradient-to-br ${getColorClasses(item.color)} border border-white/10 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-2">
                  {/* Icon */}
                  <div className="mx-auto mb-4 relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/10">
                      <span className="text-4xl">{item.icon}</span>
                    </div>
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  {item.description && (
                    <p className="text-sm text-gray-400 mb-4">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-1 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
