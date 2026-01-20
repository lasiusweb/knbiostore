'use client';

import { MOCK_PRODUCTS } from '@/data/mock-products';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedProductsProps {
    currentProductId: string;
    segment: string;
    targetCrops: string[];
}

export function RelatedProducts({ currentProductId, segment, targetCrops }: RelatedProductsProps) {
    // Find related products by segment or target crops, excluding current product
    const relatedProducts = MOCK_PRODUCTS
        .filter(p => {
            if (p.id === currentProductId) return false;
            if (!p.isActive) return false;

            // Match by segment
            if (p.segment === segment) return true;

            // Match by target crops
            if (targetCrops.some(crop => p.targetCrops.includes(crop))) return true;

            return false;
        })
        .slice(0, 4);

    if (relatedProducts.length === 0) return null;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Related Products</h2>
                <Button variant="ghost" asChild>
                    <Link href={`/store?segment=${encodeURIComponent(segment)}`} className="flex items-center gap-1">
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => {
                    const discount = product.discount || Math.round(((product.mrp - product.salePrice) / product.mrp) * 100);

                    return (
                        <Card key={product.id} className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            {/* Image */}
                            <Link href={`/store/${product.slug}`} className="relative">
                                <div className="aspect-square bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                                    <span className="text-6xl">📦</span>
                                </div>
                                {discount > 0 && (
                                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                                        {discount}% OFF
                                    </Badge>
                                )}
                            </Link>

                            <CardContent className="p-4 flex flex-col flex-1">
                                {/* Segment */}
                                <Badge variant="outline" className="w-fit mb-2 text-xs">{product.segment}</Badge>

                                {/* Name */}
                                <Link href={`/store/${product.slug}`}>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                        {product.productName}
                                    </h3>
                                </Link>

                                {/* Price */}
                                <div className="mt-auto">
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-xl font-bold text-primary">₹{product.salePrice}</span>
                                        {product.mrp > product.salePrice && (
                                            <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
                                        )}
                                    </div>

                                    {/* Add to Cart */}
                                    <Button
                                        className="w-full gradient-primary border-0 text-white"
                                        size="sm"
                                        disabled={!product.inStock}
                                    >
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
