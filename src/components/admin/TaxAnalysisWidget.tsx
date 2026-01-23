'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    PieChart,
    Wallet,
    ArrowUpRight,
    HelpCircle,
    ShieldCheck,
    Globe,
    Home
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function TaxAnalysisWidget() {
    const taxData = [
        { label: 'CGST (Intra-state)', amount: '₹12,450', percentage: 25, icon: <Home className="w-4 h-4" /> },
        { label: 'SGST (Intra-state)', amount: '₹12,450', percentage: 25, icon: <Home className="w-4 h-4" /> },
        { label: 'IGST (Inter-state)', amount: '₹24,900', percentage: 50, icon: <Globe className="w-4 h-4" /> }
    ];

    return (
        <Card className="h-full border-border/50 shadow-sm relative overflow-hidden group">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />

            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Wallet className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Tax Analysis</CardTitle>
                            <CardDescription>Estimated GST liability</CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold border-green-200 text-green-600 bg-green-50">
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Verified
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Total Display */}
                <div className="flex items-end justify-between pt-4">
                    <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider font-bold">Total Liability</p>
                        <h3 className="text-3xl font-black text-foreground">₹49,800</h3>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                            <ArrowUpRight className="w-4 h-4" />
                            +8.4%
                        </div>
                        <p className="text-[10px] text-muted-foreground">vs previous month</p>
                    </div>
                </div>

                {/* Visual Bar */}
                <div className="h-3 w-full bg-muted rounded-full flex overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '25%' }} />
                    <div className="h-full bg-accent" style={{ width: '25%' }} />
                    <div className="h-full bg-blue-500" style={{ width: '50%' }} />
                </div>

                {/* Breakdown List */}
                <div className="space-y-3">
                    {taxData.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm group/item">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : i === 1 ? 'bg-accent' : 'bg-blue-500'}`} />
                                <span className="group-hover/item:text-foreground transition-colors">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{item.percentage}%</span>
                                <span className="font-bold text-foreground">{item.amount}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="pt-4 border-t border-dashed flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Next filing: Feb 20, 2026</span>
                    </div>
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs font-bold text-primary group/btn">
                        Detailed Tax Report
                        <ArrowUpRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
