'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    ArrowUpRight,
    ArrowDownRight,
    ShoppingCart,
    CircleDollarSign,
    TrendingUp,
    History,
    Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SalesActivity() {
    const router = useRouter();
    const comparisons = [
        {
            label: 'Today',
            sales: '₹42,000',
            orders: 24,
            avg: '₹1,750',
            trend: '+12%',
            isUp: true
        },
        {
            label: 'Yesterday',
            sales: '₹38,500',
            orders: 19,
            avg: '₹2,026',
            trend: '-5%',
            isUp: false
        }
    ];

    return (
        <Card
            className="border-border/50 shadow-sm relative overflow-hidden h-full cursor-pointer hover:border-primary/30 transition-all"
            onClick={() => router.push('/pos?tab=sales')}
        >
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Sales Activity</CardTitle>
                            <CardDescription>Real-time performance metrics</CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-muted-foreground">
                        Live Updates
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
                {comparisons.map((item, idx) => (
                    <div key={item.label} className={`relative p-4 rounded-xl border ${idx === 0 ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-muted/30 border-border/50'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className={`text-sm font-bold uppercase tracking-wider ${idx === 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                                {item.label}
                            </h4>
                            <div className={`flex items-center gap-1 text-xs font-bold ${item.isUp ? 'text-green-600' : 'text-destructive'}`}>
                                {item.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {item.trend}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Sales</span>
                                <p className="text-lg font-black font-mono">{item.sales}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Orders</span>
                                <p className="text-lg font-black font-mono">{item.orders}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Avg. Val</span>
                                <p className="text-lg font-black font-mono">{item.avg}</p>
                            </div>
                        </div>

                        {idx === 1 && (
                            <div className="absolute inset-x-0 -bottom-3 flex justify-center opacity-30 pointer-events-none">
                                <History className="w-8 h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                ))}

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">Highest performing hour: <span className="text-foreground font-bold">11:00 AM</span></span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function Badge({ children, variant, className }: any) {
    return (
        <div className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${className}`}>
            {children}
        </div>
    );
}
