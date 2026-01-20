import { MOCK_HOME_DATA } from '@/data/mock-home';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
    const { ctaCards } = MOCK_HOME_DATA;

    const getColorStyles = (color?: string) => {
        switch (color) {
            case 'primary':
                return {
                    card: 'from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40',
                    icon: 'bg-primary/20',
                    button: 'bg-primary hover:bg-primary/90'
                };
            case 'accent':
                return {
                    card: 'from-accent/10 to-accent/5 border-accent/20 hover:border-accent/40',
                    icon: 'bg-accent/20',
                    button: 'bg-accent hover:bg-accent/90'
                };
            case 'secondary':
                return {
                    card: 'from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/40',
                    icon: 'bg-secondary/20',
                    button: 'bg-secondary hover:bg-secondary/90'
                };
            default:
                return {
                    card: 'from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40',
                    icon: 'bg-primary/20',
                    button: 'bg-primary hover:bg-primary/90'
                };
        }
    };

    return (
        <section className="py-16 md:py-20 section-muted">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Become Part of India&apos;s Agri-Revolution
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Join our network of partners, dealers, and collaborators driving innovation in Indian agriculture
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {ctaCards.map((item) => {
                        const styles = getColorStyles(item.color);
                        return (
                            <Card
                                key={item.id}
                                className={`group h-full bg-gradient-to-br ${styles.card} border transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                            >
                                <CardContent className="p-6 flex flex-col h-full">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl ${styles.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-3xl">{item.icon}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground mb-6 flex-1">
                                        {item.description}
                                    </p>

                                    {/* CTA Button */}
                                    <Button
                                        asChild
                                        className={`w-full ${styles.button} text-white font-semibold group`}
                                    >
                                        <Link href={item.ctaLink} className="flex items-center justify-center gap-2">
                                            {item.ctaText}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
