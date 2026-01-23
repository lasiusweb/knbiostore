'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tags,
    Users,
    TrendingDown,
    Lock,
    Unlock,
    Info,
    CheckCircle2,
    Briefcase
} from 'lucide-react';

interface PriceListTier {
    id: string;
    name: string;
    description: string;
    multiplier: number; // e.g. 0.8 for 20% discount
    moq: number;
    isActive: boolean;
}

export function B2BPriceListEngine() {
    const [activeTier, setActiveTier] = useState<string>('RETAIL');

    const tiers: PriceListTier[] = [
        { id: 'RETAIL', name: 'Retail Farmer', description: 'Standard MSRP with seasonal discounts', multiplier: 1.0, moq: 1, isActive: true },
        { id: 'DEALER', name: 'Authorized Dealer', description: 'Bulk pricing for authorized retail partners', multiplier: 0.8, moq: 50, isActive: true },
        { id: 'ESTATE', name: 'Large Estate', description: 'Wholesale pricing for 500+ acre farms', multiplier: 0.7, moq: 200, isActive: false }
    ];

    return (
        <Card className="border-border/50 shadow-sm">
            <CardHeader className="border-b bg-muted/20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                            <Tags className="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle>Wholesale Price Lists</CardTitle>
                            <CardDescription>Manage differentiated pricing for B2B segments</CardDescription>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 font-bold text-[10px] uppercase">
                        Add New Tier
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y divide-border">
                    {tiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`p-4 transition-all cursor-pointer group hover:bg-muted/30 ${activeTier === tier.id ? 'bg-primary/5' : ''}`}
                            onClick={() => setActiveTier(tier.id)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-black text-sm uppercase tracking-tight">{tier.name}</h4>
                                        {!tier.isActive && (
                                            <Badge variant="outline" className="h-4 text-[8px] uppercase tracking-widest text-muted-foreground border-dashed">
                                                Inactive
                                            </Badge>
                                        )}
                                        {activeTier === tier.id && (
                                            <Badge className="h-4 text-[8px] font-black uppercase tracking-widest bg-primary text-white border-0">
                                                Active Session
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{tier.description}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-primary font-black text-sm">
                                        <TrendingDown className="w-4 h-4" />
                                        {Math.round((1 - tier.multiplier) * 100)}% DISCOUNT
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
                                        MIN ORDER: {tier.moq} UNITS
                                    </p>
                                </div>
                            </div>

                            {activeTier === tier.id && (
                                <div className="mt-4 p-3 bg-background rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-2">
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground tracking-widest mb-2">
                                        <span>Tier Logic Applied</span>
                                        <div className="flex items-center gap-1 text-green-600">
                                            <CheckCircle2 className="w-3 h-3" />
                                            System Encrypted
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1 border-r pr-4">
                                            <p className="text-[9px] text-muted-foreground uppercase font-black">Dealer Price Access</p>
                                            <div className="flex items-center gap-2">
                                                <Unlock className="w-3 h-3 text-green-500" />
                                                <span className="text-xs font-bold font-mono">ENABLED</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] text-muted-foreground uppercase font-black">Credit Eligibility</p>
                                            <div className="flex items-center gap-2">
                                                <Lock className="w-3 h-3 text-amber-500" />
                                                <span className="text-xs font-bold font-mono">KYC PENDING</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-muted/20 border-t flex items-center justify-between font-bold text-[10px] text-muted-foreground tracking-tighter uppercase">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        84 Registered Distributors
                    </div>
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        Next Revision: 01 Feb 2026
                        <Info className="w-3 h-3 text-primary cursor-help" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
