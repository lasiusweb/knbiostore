'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Warehouse,
    Package,
    ArrowUpRight,
    AlertTriangle,
    Layers,
    BoxSelect
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function InventorySummary() {
    const segments = [
        { label: 'Agriculture', units: 4500, value: '₹12.4L', progress: 45, color: 'bg-primary' },
        { label: 'Aquaculture', units: 2100, value: '₹8.6L', progress: 21, color: 'bg-blue-500' },
        { label: 'Poultry', units: 1800, value: '₹3.2L', progress: 18, color: 'bg-amber-500' },
        { label: 'Bioremediation', units: 1200, value: '₹1.8L', progress: 12, color: 'bg-purple-500' }
    ];

    return (
        <Card className="h-full border-border/50 shadow-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Warehouse className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Inventory Summary</CardTitle>
                            <CardDescription>Stock across all segments</CardDescription>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <Badge variant="outline" className="text-[10px] h-5 border-blue-200 text-blue-600 bg-blue-50">Main Hub</Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Items</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black">124</span>
                            <span className="text-xs text-muted-foreground">SKUs</span>
                        </div>
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Stock Value</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black">₹26L</span>
                            <Badge className="bg-green-500/10 text-green-600 border-0 h-4 text-[10px]">+ 2.4%</Badge>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        <span>Segment Distribution</span>
                        <span>Value</span>
                    </div>

                    <div className="space-y-4">
                        {segments.map((seg) => (
                            <div key={seg.label} className="space-y-1.5 group/item">
                                <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${seg.color}`} />
                                        <span className="font-medium group-hover/item:text-primary transition-colors">{seg.label}</span>
                                        <span className="text-[10px] text-muted-foreground">({seg.units} units)</span>
                                    </div>
                                    <span className="font-bold text-foreground">{seg.value}</span>
                                </div>
                                <Progress value={seg.progress} className={`h-1.5 ${seg.color.replace('bg-', 'bg-muted-')}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-dashed space-y-3">
                    <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg border border-destructive/10 group/alert cursor-pointer hover:bg-destructive/10 transition-colors">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
                            <div className="text-xs">
                                <p className="font-bold text-destructive underline underline-offset-2">Batch Expiry Warning</p>
                                <p className="text-muted-foreground">3 items expiring <span className="font-bold">within 15 days</span></p>
                            </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-destructive opacity-0 group-hover/alert:opacity-100 transition-opacity" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
