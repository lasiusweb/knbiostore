'use client';

import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, getAllSegments, getAllCrops, getAllProblems } from '@/data/mock-products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Search,
    SlidersHorizontal,
    X,
    ChevronDown,
    Grid3X3,
    List,
    ShoppingCart
} from 'lucide-react';
import Link from 'next/link';
import { ProductFilters } from '@/lib/types/product-types';

export default function StorePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<ProductFilters>({});
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState<string>('name-asc');

    const segments = getAllSegments();
    const crops = getAllCrops();
    const problems = getAllProblems();

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let products = [...MOCK_PRODUCTS].filter(p => p.isActive);

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            products = products.filter(p =>
                p.productName.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            );
        }

        // Segment filter
        if (filters.segment) {
            products = products.filter(p => p.segment.toLowerCase() === filters.segment?.toLowerCase());
        }

        // Crop filter
        if (filters.crop) {
            products = products.filter(p =>
                p.targetCrops.some(c => c.toLowerCase() === filters.crop?.toLowerCase())
            );
        }

        // Problem filter
        if (filters.problem) {
            products = products.filter(p =>
                p.targetProblems.some(prob => prob.toLowerCase() === filters.problem?.toLowerCase())
            );
        }

        // Sort
        switch (sortBy) {
            case 'name-asc':
                products.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case 'name-desc':
                products.sort((a, b) => b.productName.localeCompare(a.productName));
                break;
            case 'price-asc':
                products.sort((a, b) => a.salePrice - b.salePrice);
                break;
            case 'price-desc':
                products.sort((a, b) => b.salePrice - a.salePrice);
                break;
        }

        return products;
    }, [searchQuery, filters, sortBy]);

    const clearFilters = () => {
        setFilters({});
        setSearchQuery('');
    };

    const activeFilterCount = Object.values(filters).filter(Boolean).length + (searchQuery ? 1 : 0);

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <section className="gradient-hero py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-gradient">Agricultural Microbes & Solutions</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Certified organic products trusted by 50,000+ farmers across India
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                type="search"
                                placeholder="Search products, crops, problems..."
                                className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:bg-white/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-8">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        {/* Filter Toggle */}
                        <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge className="ml-1 bg-primary text-primary-foreground">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>

                        {/* Results Count */}
                        <span className="text-sm text-muted-foreground">
                            {filteredProducts.length} products
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="name-asc">Name A-Z</option>
                                <option value="name-desc">Name Z-A</option>
                                <option value="price-asc">Price Low-High</option>
                                <option value="price-desc">Price High-Low</option>
                            </select>
                        </div>

                        {/* View Mode */}
                        <div className="hidden sm:flex items-center gap-1 border rounded-lg p-1">
                            <Button
                                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid3X3 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    {showFilters && (
                        <aside className="w-64 shrink-0 hidden lg:block">
                            <Card className="sticky top-24">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-semibold">Filters</h3>
                                        {activeFilterCount > 0 && (
                                            <Button variant="ghost" size="sm" onClick={clearFilters}>
                                                Clear all
                                            </Button>
                                        )}
                                    </div>

                                    {/* Segment Filter */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                                            Segment <ChevronDown className="w-4 h-4" />
                                        </h4>
                                        <div className="space-y-2">
                                            {segments.map((segment) => (
                                                <label key={segment} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="segment"
                                                        checked={filters.segment === segment}
                                                        onChange={() => setFilters({ ...filters, segment })}
                                                        className="accent-primary"
                                                    />
                                                    <span className="text-sm">{segment}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Crop Filter */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                                            Target Crop <ChevronDown className="w-4 h-4" />
                                        </h4>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {crops.map((crop) => (
                                                <label key={crop} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="crop"
                                                        checked={filters.crop === crop}
                                                        onChange={() => setFilters({ ...filters, crop })}
                                                        className="accent-primary"
                                                    />
                                                    <span className="text-sm">{crop}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Problem Filter */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
                                            Problem <ChevronDown className="w-4 h-4" />
                                        </h4>
                                        <div className="space-y-2">
                                            {problems.map((problem) => (
                                                <label key={problem} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="problem"
                                                        checked={filters.problem === problem}
                                                        onChange={() => setFilters({ ...filters, problem })}
                                                        className="accent-primary"
                                                    />
                                                    <span className="text-sm">{problem}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    )}

                    {/* Products Grid */}
                    <main className="flex-1">
                        {/* Active Filters */}
                        {activeFilterCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {searchQuery && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        Search: {searchQuery}
                                        <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                                    </Badge>
                                )}
                                {filters.segment && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        {filters.segment}
                                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, segment: undefined })} />
                                    </Badge>
                                )}
                                {filters.crop && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        {filters.crop}
                                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, crop: undefined })} />
                                    </Badge>
                                )}
                                {filters.problem && (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        {filters.problem}
                                        <X className="w-3 h-3 cursor-pointer" onClick={() => setFilters({ ...filters, problem: undefined })} />
                                    </Badge>
                                )}
                            </div>
                        )}

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground text-lg mb-4">No products found</p>
                                <Button onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1'
                                }`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

// Product Card Component
function ProductCard({ product, viewMode }: { product: typeof MOCK_PRODUCTS[0]; viewMode: 'grid' | 'list' }) {
    const discount = product.discount || Math.round(((product.mrp - product.salePrice) / product.mrp) * 100);

    if (viewMode === 'list') {
        return (
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 flex gap-6">
                    {/* Image */}
                    <Link href={`/store/${product.slug}`} className="shrink-0">
                        <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                            <span className="text-4xl">📦</span>
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
                    <span className="text-6xl">📦</span>
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