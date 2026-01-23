'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Package,
    Search,
    Trash2,
    Plus,
    ArrowRight,
    TrendingDown,
    Info,
    CheckCircle2
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mock-products';
import { CompositeItem } from '@/lib/types/pos-types';

export function BundleDesigner() {
    const [selectedItems, setSelectedItems] = useState<typeof MOCK_PRODUCTS>([]);
    const [bundleName, setBundleName] = useState('');
    const [discount, setDiscount] = useState(15);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedItems.find(item => item.id === p.id)
    );

    const addItem = (product: typeof MOCK_PRODUCTS[0]) => {
        setSelectedItems([...selectedItems, product]);
    };

    const removeItem = (id: string) => {
        setSelectedItems(selectedItems.filter(p => p.id !== id));
    };

    const totalMrp = selectedItems.reduce((sum, p) => sum + p.mrp, 0);
    const bundlePrice = totalMrp * (1 - discount / 100);

    return (
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left: Component Selection */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Bundle Designer</h2>
                    <p className="text-muted-foreground">Combine products into high-value Total Farm Solutions</p>
                </div>

                <Card className="border-border/50 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Select Bundle Components</CardTitle>
                        <div className="relative pt-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search bio-fertilizers, probiotics..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group cursor-pointer"
                                onClick={() => addItem(product)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                        <span className="text-xl">📦</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">{product.productName}</h4>
                                        <span className="text-xs text-muted-foreground">{product.segment}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold">₹{product.mrp}</span>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 bg-primary/20 text-primary">
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div className="text-sm text-primary-foreground/80">
                        <p className="font-semibold text-primary">Optimization Tip</p>
                        <p className="text-muted-foreground">Bundling a Bio-Fertilizer with a Soil Conditioner often yields a 20% higher conversion rate for Paddy farmers.</p>
                    </div>
                </div>
            </div>

            {/* Right: Bundle Configuration */}
            <div className="space-y-6">
                <Card className="border-primary/20 shadow-lg relative overflow-hidden h-full flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-primary" />
                            <Badge variant="outline" className="text-primary border-primary">New Bundle</Badge>
                        </div>
                        <Input
                            placeholder="e.g., Paddy Productivity Kit 2026"
                            className="text-xl font-bold h-12 border-0 bg-transparent px-0 focus-visible:ring-0 placeholder:text-muted-foreground/30"
                            value={bundleName}
                            onChange={(e) => setBundleName(e.target.value)}
                        />
                    </CardHeader>

                    <CardContent className="flex-1 space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Bundle Contents</h3>
                            {selectedItems.length === 0 ? (
                                <div className="h-32 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground text-sm">
                                    Add items from the search panel
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {selectedItems.map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-3 bg-card border rounded-lg shadow-sm animate-fade-in">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                <span className="text-sm font-medium">{item.productName}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm text-muted-foreground line-through">₹{item.mrp}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedItems.length > 0 && (
                            <div className="space-y-4 pt-6 mt-6 border-t border-border/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingDown className="w-5 h-5 text-primary" />
                                        <span className="font-semibold">Bulk Discount</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            className="w-16 h-8 text-center font-bold"
                                            value={discount}
                                            onChange={(e) => setDiscount(Number(e.target.value))}
                                        />
                                        <span className="font-bold">%</span>
                                    </div>
                                </div>

                                <div className="bg-muted p-4 rounded-xl space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Original Total MRP</span>
                                        <span className="line-through">₹{totalMrp.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-primary font-medium">
                                        <span>Bundle Savings</span>
                                        <span>- ₹{(totalMrp - bundlePrice).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-2 border-t border-border/50">
                                        <span className="text-foreground font-bold italic">Special Bundle Price</span>
                                        <span className="text-2xl font-black text-primary">₹{bundlePrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="pt-4">
                        <Button
                            className="w-full h-12 gradient-primary border-0 text-white font-bold group"
                            disabled={selectedItems.length < 2 || !bundleName}
                        >
                            <Plus className="w-5 h-5 mr-1" />
                            Create Total Farm Solution
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
