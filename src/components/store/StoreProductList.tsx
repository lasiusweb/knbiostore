'use client';

import { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, getAllSegments, getAllCrops, getAllProblems } from '@/data/mock-products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  SlidersHorizontal,
  X,
  Grid3X3,
  List
} from 'lucide-react';
import { ProductFilters as ProductFiltersType } from '@/lib/types/product-types';
import { StoreHero } from './StoreHero';
import { StoreFilters } from './StoreFilters';
import { ProductGridCard } from './ProductGridCard';

export default function StoreProductList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const [showFilters, setShowFilters] = useState(true);
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
    <div className="w-full">
      <StoreHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-64 shrink-0">
              <StoreFilters
                filters={filters}
                setFilters={setFilters}
                segments={segments}
                crops={crops}
                problems={problems}
                clearFilters={clearFilters}
                activeFilterCount={activeFilterCount}
              />
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
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
                }`}>
                {filteredProducts.map((product) => (
                  <ProductGridCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}