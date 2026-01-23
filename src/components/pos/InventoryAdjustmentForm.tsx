'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Package,
    ArrowUp,
    ArrowDown,
    AlertCircle,
    CheckCircle2,
    Calendar,
    User,
    Search,
    Plus,
    Minus
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mock-products';

const REASON_CODES = [
    { value: 'DAMAGED', label: 'Damaged Goods' },
    { value: 'EXPIRED', label: 'Expired Product' },
    { value: 'RE-STOCK', label: 'Standard Restock' },
    { value: 'CORRECTION', label: 'Stock Correction' },
    { value: 'SAMPLE', label: 'Free Sample Dist.' }
];

export function InventoryAdjustmentForm() {
    const [selectedProductId, setSelectedProductId] = useState(MOCK_PRODUCTS[0]?.id || '');
    const [type, setType] = useState<'INCREMENT' | 'DECREMENT'>('INCREMENT');
    const [quantity, setQuantity] = useState(1);
    const [reason, setReason] = useState('RE-STOCK');
    const [notes, setNotes] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const selectedProduct = MOCK_PRODUCTS.find(p => p.id === selectedProductId);

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Stock Adjustment:', {
            productId: selectedProductId,
            type,
            quantity,
            reason,
            notes,
            date: new Date().toISOString(),
            user: 'Admin-01'
        });

        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card className="border-border/50 shadow-lg overflow-hidden">
                <CardHeader className="border-b bg-muted/20">
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${type === 'INCREMENT' ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'}`}>
                            <Package className="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle>Inventory Adjustment</CardTitle>
                            <CardDescription>Update stock levels with Zoho-standard reason codes</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6 text-sm">
                        {/* Product Search Selection */}
                        <div className="space-y-3">
                            <label className="text-sm font-semibold flex items-center gap-2">
                                <Search className="w-4 h-4 text-primary" />
                                Search Product SKU
                            </label>
                            <div className="relative">
                                <Input
                                    placeholder="Type SKU or Name (e.g., VAM, RHIZ)..."
                                    className="h-11 pl-4 rounded-xl border-border/50 bg-background"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Package className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            </div>

                            {searchQuery && (
                                <div className="p-2 border rounded-xl bg-background shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2">
                                    {filteredProducts.length > 0 ? filteredProducts.map(p => (
                                        <div
                                            key={p.id}
                                            className={`flex items-center justify-between p-3 rounded-lg border transition-all group ${selectedProductId === p.id ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-muted/50'}`}
                                        >
                                            <div className="cursor-pointer flex-1" onClick={() => setSelectedProductId(p.id)}>
                                                <h4 className="font-bold text-xs">{p.productName}</h4>
                                                <p className="text-[10px] text-muted-foreground font-mono">{p.sku}</p>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 border-green-200 text-green-600 hover:bg-green-50"
                                                    onClick={() => {
                                                        setSelectedProductId(p.id);
                                                        setType('INCREMENT');
                                                        setQuantity(1);
                                                        setReason('CORRECTION');
                                                    }}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-7 w-7 border-destructive/20 text-destructive hover:bg-destructive/5"
                                                    onClick={() => {
                                                        setSelectedProductId(p.id);
                                                        setType('DECREMENT');
                                                        setQuantity(1);
                                                        setReason('DAMAGED');
                                                    }}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-4 text-center text-[10px] text-muted-foreground uppercase font-black">No SKU Matches</div>
                                    )}
                                </div>
                            )}

                            {selectedProduct && (
                                <div className="flex items-center justify-between px-2 text-xs py-2 bg-muted/20 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <span className="font-bold uppercase text-[9px]">Selected:</span>
                                        <span className="font-bold text-foreground truncate max-w-[200px]">{selectedProduct.productName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                        <span className="text-muted-foreground font-bold">CURRENT STOCK:</span>
                                        <Badge variant="secondary" className="h-5 font-black text-primary">42 Units</Badge>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Adjustment Type */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${type === 'INCREMENT'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border grayscale hover:grayscale-0'
                                    }`}
                                onClick={() => setType('INCREMENT')}
                            >
                                <ArrowUp className="w-5 h-5" />
                                <span className="font-bold">Add Stock</span>
                            </button>
                            <button
                                type="button"
                                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${type === 'DECREMENT'
                                    ? 'border-destructive bg-destructive/5 text-destructive'
                                    : 'border-border grayscale hover:grayscale-0'
                                    }`}
                                onClick={() => setType('DECREMENT')}
                            >
                                <ArrowDown className="w-5 h-5" />
                                <span className="font-bold">Remove Stock</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="font-semibold">Quantity</label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="h-11 font-bold text-center text-lg"
                                />
                            </div>

                            {/* Reason Code */}
                            <div className="space-y-2">
                                <label className="font-semibold">Reason Code</label>
                                <select
                                    className="w-full h-11 px-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    {REASON_CODES.map(r => (
                                        <option key={r.value} value={r.value}>{r.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="font-semibold">Remarks & Observations</label>
                            <textarea
                                className="w-full p-3 bg-background border border-input rounded-lg h-24 focus:ring-2 focus:ring-primary outline-none resize-none"
                                placeholder="Required for auditing purposes..."
                                required={type === 'DECREMENT'}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        {/* Audit Info */}
                        <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
                            <div className="flex items-center gap-2">
                                <User className="w-3 h-3" />
                                Performed By: Admin-01
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                Log Date: {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="bg-muted/10 border-t p-6">
                        <Button
                            type="submit"
                            className={`w-full h-12 font-bold transition-all ${isSuccess ? 'bg-green-600' : type === 'INCREMENT' ? 'gradient-primary border-0 text-white' : 'bg-destructive hover:bg-destructive/90 text-white'
                                }`}
                        >
                            {isSuccess ? (
                                <span className="flex items-center gap-2 animate-fade-in shadow-xl shadow-green-500/20">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Adjustment Logged Successfully!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    Record Inventory Adjustment
                                </span>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            {/* Disclaimer */}
            <div className="mt-4 flex gap-2 text-[10px] text-muted-foreground bg-muted/30 p-4 rounded-xl border border-dashed">
                <AlertCircle className="w-3 h-3 shrink-0 text-primary" />
                <p>This action will be recorded in the terminal logs and synced across all nodes. Regulatory compliance (NPOP/ISO) requirements specify reason codes for stock corrections.</p>
            </div>
        </div>
    );
}
