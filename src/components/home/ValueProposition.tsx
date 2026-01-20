import { MOCK_HOME_DATA } from '@/data/mock-home';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function ValueProposition() {
    const { valueProposition } = MOCK_HOME_DATA;

    return (
        <section className="py-16 md:py-20 section-light">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {valueProposition.title}
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
                    {valueProposition.subtitle && (
                        <p className="text-lg text-muted-foreground">
                            {valueProposition.subtitle}
                        </p>
                    )}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {valueProposition.items.map((item, index) => (
                        <Card
                            key={item.id}
                            className="group h-full bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className="shrink-0">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                            <span className="text-2xl">{item.icon}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                                            {item.title}
                                            <CheckCircle className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
