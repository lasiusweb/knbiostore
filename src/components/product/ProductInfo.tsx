'use client';

import { useState } from 'react';
import { Product } from '@/lib/types/product-types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    ShoppingCart,
    Heart,
    Share2,
    Check,
    Truck,
    Shield,
    Phone,
    Minus,
    Plus
} from 'lucide-react';

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const [quantity, setQuantity] = useState(1);

    const discount = product.discount || Math.round(((product.mrp - product.salePrice) / product.mrp) * 100);

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    return (
        <div className="space-y-6">
            {/* Brand & Tags */}
            <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-primary border-primary">
                    {product.brandName}
                </Badge>
                <Badge variant="secondary">{product.segment}</Badge>
                {product.tags.includes('npop-certified') && (
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                        🌿 NPOP Certified
                    </Badge>
                )}
                {product.tags.includes('bestseller') && (
                    <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        ⭐ Bestseller
                    </Badge>
                )}
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                {product.productName}
            </h1>

            {/* Short Description */}
            <p className="text-muted-foreground text-lg">
                {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">
                    ₹{selectedVariant?.salePrice || product.salePrice}
                </span>
                {(selectedVariant?.mrp || product.mrp) > (selectedVariant?.salePrice || product.salePrice) && (
                    <>
                        <span className="text-xl text-muted-foreground line-through">
                            ₹{selectedVariant?.mrp || product.mrp}
                        </span>
                        <Badge className="bg-destructive text-destructive-foreground">
                            {discount}% OFF
                        </Badge>
                    </>
                )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
                {product.inStock ? (
                    <>
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-green-600 font-medium">In Stock</span>
                    </>
                ) : (
                    <span className="text-destructive font-medium">Out of Stock</span>
                )}
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
                <div>
                    <h3 className="text-sm font-medium mb-3">Select Size / Pack</h3>
                    <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedVariant?.id === variant.id
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border hover:border-primary/50'
                                    }`}
                            >
                                {variant.netWeight || variant.netContent} - ₹{variant.salePrice}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border rounded-lg">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-r-none"
                        onClick={decrementQuantity}
                    >
                        <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-l-none"
                        onClick={incrementQuantity}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                {/* Add to Cart */}
                <Button
                    size="lg"
                    className="flex-1 h-12 gradient-primary border-0 text-white font-semibold"
                    disabled={!product.inStock}
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                </Button>

                {/* Wishlist */}
                <Button variant="outline" size="icon" className="h-12 w-12">
                    <Heart className="w-5 h-5" />
                </Button>

                {/* Share */}
                <Button variant="outline" size="icon" className="h-12 w-12">
                    <Share2 className="w-5 h-5" />
                </Button>
            </div>

            {/* Key Specs */}
            <Card className="bg-muted/50 border-border/50">
                <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {product.netWeight && (
                            <div>
                                <span className="text-muted-foreground">Net Weight</span>
                                <p className="font-medium">{selectedVariant?.netWeight || product.netWeight}</p>
                            </div>
                        )}
                        {product.netContent && (
                            <div>
                                <span className="text-muted-foreground">Net Content</span>
                                <p className="font-medium">{selectedVariant?.netContent || product.netContent}</p>
                            </div>
                        )}
                        <div>
                            <span className="text-muted-foreground">Shelf Life</span>
                            <p className="font-medium">{product.shelfLife}</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Country of Origin</span>
                            <p className="font-medium">{product.countryOfOrigin}</p>
                        </div>
                        {product.gtin && (
                            <div>
                                <span className="text-muted-foreground">GTIN/EAN</span>
                                <p className="font-medium font-mono text-xs">{selectedVariant?.gtin || product.gtin}</p>
                            </div>
                        )}
                        {product.sku && (
                            <div>
                                <span className="text-muted-foreground">SKU</span>
                                <p className="font-medium font-mono text-xs">{selectedVariant?.sku || product.sku}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                    <p className="text-xs font-medium">Above ₹999</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Quality</p>
                    <p className="text-xs font-medium">ISO Certified</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                    <Phone className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Expert</p>
                    <p className="text-xs font-medium">Support</p>
                </div>
            </div>
        </div>
    );
}
