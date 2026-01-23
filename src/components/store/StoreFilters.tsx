'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ProductFilters as ProductFiltersType } from '@/lib/types/product-types';

interface StoreFiltersProps {
    filters: ProductFiltersType;
    setFilters: (filters: ProductFiltersType) => void;
    segments: string[];
    crops: string[];
    problems: string[];
    clearFilters: () => void;
    activeFilterCount: number;
}

export function StoreFilters({
    filters,
    setFilters,
    segments,
    crops,
    problems,
    clearFilters,
    activeFilterCount
}: StoreFiltersProps) {
    return (
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
    );
}
