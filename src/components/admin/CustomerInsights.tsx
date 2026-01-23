'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
    Users,
    UserPlus,
    UserCheck,
    TrendingUp,
    MapPin,
    Sprout
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function CustomerInsights() {
    return (
        <Card className="h-full border-border/50 shadow-sm relative overflow-hidden group">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Farmer Insights</CardTitle>
                            <CardDescription>Customer segmentation & growth</CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold border-purple-200 text-purple-600 bg-purple-50">
                        CRM Active
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-4">
                {/* Core Metrics */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <UserPlus className="w-5 h-5 text-purple-500 mb-2" />
                        <span className="text-xl font-black">42</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">New Farmers</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl border border-border/50">
                        <UserCheck className="w-5 h-5 text-green-500 mb-2" />
                        <span className="text-xl font-black">86%</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Retention</span>
                    </div>
                </div>

                {/* Top Regions */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Top Performing Districts</h4>
                    <div className="space-y-2">
                        {[
                            { name: 'Nizamabad', count: 124, growth: '+12%', color: 'bg-primary' },
                            { name: 'Warangal', count: 98, growth: '+8%', color: 'bg-blue-500' },
                            { name: 'Guntur', count: 76, growth: '+15%', color: 'bg-green-500' }
                        ].map((district) => (
                            <div key={district.name} className="flex items-center justify-between group/item">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                                    <span className="text-sm font-medium">{district.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold">{district.count} sales</span>
                                    <span className="text-[10px] text-green-600 font-bold">{district.growth}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Agri-Solution Adoption */}
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sprout className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold text-primary italic">Bio-Adoption Index</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-tight">
                        64% of farmers who bought <span className="text-foreground font-bold">Rhizobium</span> also returned for <span className="text-foreground font-bold">Azospirillum</span> within 30 days.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
