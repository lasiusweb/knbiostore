import { MOCK_HOME_DATA } from '@/data/mock-home';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function BrandStory() {
    const { brandStory } = MOCK_HOME_DATA;

    return (
        <section id="brand-story" className="py-20 md:py-28 section-light overflow-hidden">
            <div className="container mx-auto px-4">

                {/* Headline */}
                <div className="text-center max-w-5xl mx-auto mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                        <span className="text-gradient">{brandStory.headline}</span>
                    </h2>
                    {brandStory.subheadline && (
                        <p className="text-lg md:text-xl text-muted-foreground">
                            {brandStory.subheadline}
                        </p>
                    )}
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-8" />
                </div>

                {/* Founder Section */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 bg-muted/50 rounded-3xl p-8 md:p-12 border border-border/50">
                    {/* Founder Image Placeholder */}
                    <div className="w-full lg:w-1/3 shrink-0">
                        <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden relative shadow-xl border border-border/50">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <span className="text-5xl">👩‍🔬</span>
                                </div>
                                <span className="text-lg font-semibold text-foreground">{brandStory.founder.name}</span>
                                <span className="text-sm text-primary font-medium">{brandStory.founder.title}</span>
                            </div>
                        </div>
                    </div>

                    {/* Founder Info */}
                    <div className="w-full lg:w-2/3">
                        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                            Founder&apos;s Story
                        </Badge>
                        <h3 className="text-3xl font-bold mb-2 text-foreground">{brandStory.founder.name}</h3>
                        <p className="text-primary font-bold text-lg mb-6 uppercase tracking-wide">{brandStory.founder.title}</p>
                        <blockquote className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-primary pl-6 py-2 bg-background/50 rounded-r-lg">
                            &ldquo;{brandStory.founder.bio}&rdquo;
                        </blockquote>

                        {/* Achievements */}
                        {brandStory.founder.achievements && (
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {brandStory.founder.achievements.map((achievement, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="text-primary shrink-0">✓</span>
                                        <span>{achievement}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Journey & Stats */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Journey */}
                    <Card className="h-full bg-card border-border/50 shadow-sm">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-primary">📜</span> Our Journey
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                                {brandStory.journey.text}
                            </p>

                            {/* Timeline */}
                            {brandStory.journey.milestones && (
                                <div className="space-y-4 border-l-2 border-primary/30 pl-6">
                                    {brandStory.journey.milestones.map((milestone, i) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />
                                            <div className="text-sm">
                                                <span className="font-bold text-primary">{milestone.year}</span>
                                                <span className="mx-2 text-muted-foreground">·</span>
                                                <span className="font-semibold text-foreground">{milestone.title}</span>
                                                <p className="text-muted-foreground mt-1">{milestone.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="gradient-primary text-white shadow-lg hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{brandStory.stats.farmers}</div>
                                <div className="text-sm font-medium opacity-90">Farmers Trusted</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card border-border/50 shadow-md hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{brandStory.stats.states}</div>
                                <div className="text-sm text-muted-foreground font-medium">States Covered</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card border-border/50 shadow-md hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{brandStory.stats.villages}</div>
                                <div className="text-sm text-muted-foreground font-medium">Villages Reached</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-accent/10 border-accent/20 shadow-md hover:-translate-y-1 transition-transform duration-300">
                            <CardContent className="p-6 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{brandStory.stats.womenEmpowered}</div>
                                <div className="text-sm text-muted-foreground font-medium">Women Empowered</div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Initiatives */}
                {brandStory.initiatives && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
                            <span className="text-primary">❤️</span> Growing India, One Farmer at a Time
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {brandStory.initiatives.map((initiative, i) => (
                                <Card key={i} className="bg-card border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                                    <CardContent className="p-6 text-center">
                                        <span className="text-3xl mb-3 block">{initiative.icon}</span>
                                        <h4 className="font-semibold text-foreground mb-2">{initiative.title}</h4>
                                        <p className="text-sm text-muted-foreground">{initiative.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                <div className="border-t border-border pt-12 text-center">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
                        Recognized & Certified By
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {brandStory.certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="px-6 py-3 bg-card shadow-sm rounded-full text-sm font-bold text-foreground border border-border/50 flex items-center gap-2 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                            >
                                <span className="text-lg">{cert.icon}</span>
                                <span>{cert.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
