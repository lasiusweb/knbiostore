'use client';

import { useState } from 'react';
import { Product } from '@/lib/types/product-types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    FileText,
    Settings,
    Leaf,
    AlertTriangle,
    Shield
} from 'lucide-react';

// Specialized Sub-components
import { ProductSpecs } from './ProductSpecs';
import { ProductUsage } from './ProductUsage';
import { ProductSafety } from './ProductSafety';
import { ProductRegulatory } from './ProductRegulatory';

interface ProductTabsProps {
    product: Product;
}

type TabId = 'description' | 'specifications' | 'usage' | 'safety' | 'regulatory';

export function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<TabId>('description');

    const tabs = [
        { id: 'description' as const, label: 'Description', icon: FileText },
        { id: 'specifications' as const, label: 'Specifications', icon: Settings },
        { id: 'usage' as const, label: 'Usage & Directions', icon: Leaf },
        { id: 'safety' as const, label: 'Safety', icon: AlertTriangle },
        { id: 'regulatory' as const, label: 'Regulatory', icon: Shield },
    ];

    return (
        <Card className="border-border/50 shadow-sm overflow-hidden bg-card">
            {/* Tab Headers */}
            <div className="border-b border-border bg-muted/20 overflow-x-auto no-scrollbar">
                <div className="flex min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-8 py-5 text-sm font-bold border-b-2 transition-all duration-300 relative ${isActive
                                        ? 'border-primary text-primary bg-background'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-background/50'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'animate-pulse' : ''}`} />
                                {tab.label}
                                {isActive && (
                                    <div className="absolute inset-x-0 -bottom-[2px] h-[3px] bg-primary rounded-t-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <CardContent className="p-8">
                <div className="animate-in fade-in duration-500">
                    {activeTab === 'description' && (
                        <div className="prose prose-sm max-w-none space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Product Overview
                                </h3>
                                <div className="leading-relaxed text-muted-foreground text-base whitespace-pre-line bg-muted/20 p-6 rounded-2xl border">
                                    {product.description}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Quick Stats Section */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Optimization Index</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border bg-background text-center space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground">Regional Fit</p>
                                            <p className="text-xl font-black text-primary">High</p>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-background text-center space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground">Certified</p>
                                            <p className="text-xl font-black text-primary">NPOP</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Application Focus */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Target Focus</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {product.targetProblems.map((prob, i) => (
                                            <Badge key={i} variant="outline" className="border-primary/20 text-primary bg-primary/5">
                                                {prob}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'specifications' && <ProductSpecs product={product} />}
                    {activeTab === 'usage' && <ProductUsage product={product} />}
                    {activeTab === 'safety' && <ProductSafety product={product} />}
                    {activeTab === 'regulatory' && <ProductRegulatory product={product} />}
                </div>
            </CardContent>
        </Card>
    );
}
