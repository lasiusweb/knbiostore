'use client';

import { Product } from '@/lib/types/product-types';
import { Badge } from '@/components/ui/badge';
import {
    CheckCircle2,
    Map,
    Target,
    Lightbulb,
    ExternalLink
} from 'lucide-react';

interface ProductUsageProps {
    product: Product;
}

export function ProductUsage({ product }: ProductUsageProps) {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Target Segments */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
                        <Target className="w-5 h-5" />
                        Target Crops & Plants
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {product.targetCrops.map((crop, i) => (
                            <Badge key={i} variant="secondary" className="bg-background border-primary/20 text-primary py-1.5 px-3">
                                {crop}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-accent-foreground">
                        <Lightbulb className="w-5 h-5" />
                        Common Problems Solved
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {product.targetProblems.map((prob, i) => (
                            <Badge key={i} variant="outline" className="border-accent/40 text-accent-foreground py-1.5 px-3">
                                {prob}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {/* Directions of Use */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                    <Map className="w-6 h-6 text-primary" />
                    Directions for Expert Application
                </h3>

                <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed bg-muted/20 p-6 rounded-2xl border">
                    <p className="whitespace-pre-line">{product.directionsOfUse}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            Standard Instructions
                        </h4>
                        <div className="text-sm p-4 bg-background border border-border/50 rounded-xl italic text-muted-foreground">
                            {product.standardInstructions}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-bold flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-primary" />
                            Special Recommendations
                        </h4>
                        <div className="text-sm p-4 bg-primary/5 border border-primary/10 rounded-xl text-primary-foreground/80">
                            {product.recommendations}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
