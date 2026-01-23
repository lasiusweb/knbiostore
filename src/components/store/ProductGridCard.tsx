'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types/product-types';

interface ProductGridCardProps {
    product: Product;
    viewMode: 'grid' | 'list';
}

export function ProductGridCard({ product, viewMode }: ProductGridCardProps) {
    const discount = product.discount || Math.round(((product.mrp - product.salePrice) / product.mrp) * 100);

    if (viewMode === 'list') {
        return (
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 flex gap-6">
                    {/* Image */}
                    <Link href={`/store/${product.slug}`} className="shrink-0">
                        <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="text-4xl">{product.segment === 'Agriculture' ? '🌾' : product.segment === 'Aquaculture' ? '🦐' : '📦'}</span>
                        </div>
                    </Link>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <Badge variant="outline" className="mb-2 text-xs">{product.segment}</Badge>
                                <Link href={`/store/${product.slug}`}>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                        {product.productName}
                                    </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {product.shortDescription}
                                </p>
                            </div>

                            <div className="text-right shrink-0">
                                <div className="text-2xl font-bold text-primary">₹{product.salePrice}</div>
                                {discount > 0 && (
                                    <div className="flex items-center gap-2 justify-end">
                                        <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
                                        <Badge className="bg-destructive/10 text-destructive border-0 text-xs">
                                            {discount}% OFF
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <Button size="sm" className="gradient-primary border-0 text-white">
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Add to Cart
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                                <Link href={`/store/${product.slug}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Image */}
            <Link href={`/store/${product.slug}`} className="relative">
                <div className="aspect-square bg-muted flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                    <span className="text-6xl">{product.segment === 'Agriculture' ? '🌾' : product.segment === 'Aquaculture' ? '🦐' : '📦'}</span>
                </div>
                {discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                        {discount}% OFF
                    </Badge>
                )}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                    </div>
                )}
            </Link>

            <CardContent className="p-4 flex flex-col flex-1">
                {/* Segment Badge */}
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
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
