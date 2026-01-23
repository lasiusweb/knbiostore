'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Briefcase,
    TrendingUp,
    ShieldCheck,
    CreditCard,
    ShoppingCart,
    Clock,
    FileText,
    ChevronRight,
    Search,
    Download,
    Target,
    Zap
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { B2BPriceListEngine } from '@/components/admin/B2BPriceListEngine';

export default function DealerPortalPage() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in">
            {/* Header / B2B Status */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b pb-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Badge className="bg-primary text-white font-black text-[9px] h-5 uppercase px-2 tracking-widest shadow-sm">Verified B2B Partner</Badge>
                        <span className="text-xs font-mono text-muted-foreground font-bold tracking-widest">DEALER ID: #DL-8820</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-foreground">
                        Dealer <span className="text-primary italic">Command Center</span>
                    </h1>
                    <p className="text-muted-foreground text-md max-w-xl">
                        Authorized enterprise portal for <span className="text-foreground font-bold italic">Kisan Seva Kendra, Nellore</span>. Manage bulk orders, seasonal pre-bookings, and credit statements.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 bg-primary border-primary shadow-xl shadow-primary/20 text-white min-w-[180px]">
                        <p className="text-[10px] font-black uppercase text-white/70 tracking-widest leading-none mb-1.5">Season Tier</p>
                        <h3 className="text-2xl font-black tracking-tighter">GOLD</h3>
                        <div className="mt-2 text-[10px] font-bold text-white/80">3% Extra Volume Discount Active</div>
                    </Card>
                    <Card className="p-4 bg-white border-border/50 shadow-sm min-w-[180px]">
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1.5">Available Credit</p>
                        <h3 className="text-2xl font-black tracking-tighter text-foreground">₹2.45 Lakhs</h3>
                        <div className="mt-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">Settlement: Feb 15</div>
                    </Card>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Integrated Price List Engine (B2B Specialized) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-5 h-5 text-primary" />
                                Bulk Procurement Engine
                            </h2>
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest gap-2 hover:text-primary h-8 italic">Download Order Sheet</Button>
                        </div>
                        <B2BPriceListEngine />
                    </div>

                    {/* Quick Order Entry Search */}
                    <Card className="border-border/50 shadow-sm overflow-hidden">
                        <CardHeader className="bg-muted/30 border-b">
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Quick SKU lookup</CardTitle>
                                    <CardDescription className="text-[10px]">Real-time stock availability across Regional Hubs</CardDescription>
                                </div>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Enter SKU..."
                                        className="pl-9 h-10 bg-background"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            {/* Placeholder for real-time search results */}
                            <div className="flex items-center justify-center h-20 bg-muted/20 border border-dashed rounded-xl">
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest animate-pulse">Scanning Enterprise Catalog...</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar area */}
                <div className="space-y-8">
                    {/* B2B Performance Tracker */}
                    <Card className="border-primary/20 bg-primary/5 shadow-sm text-primary">
                        <CardHeader className="pb-3 border-b border-primary/10">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 italic">
                                <Target className="w-4 h-4" />
                                Seasonal Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-primary/70">Rabi Season Target</span>
                                    <span className="text-primary font-black">72% Achieved</span>
                                </div>
                                <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '72%' }} />
                                </div>
                                <p className="text-[10px] text-muted-foreground font-medium italic text-center">Maintain Gold status by achieving ₹5L volume by Feb 28.</p>
                            </div>
                            <Button className="w-full h-11 gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:scale-105">
                                <TrendingUp className="w-3.5 h-3.5 mr-2" />
                                View Incentive Roadmap
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Pending Settlements / Credit */}
                    <Card className="border-border/50 shadow-sm relative overflow-hidden group">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                <CreditCard className="w-4 h-4" />
                                Recent Credit Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {[
                                { date: 'Jan 18', ref: 'INV-4402', type: 'Purchase', val: '-₹54,000' },
                                { date: 'Jan 12', ref: 'CR-881', type: 'Settlement', val: '+₹1.2L', status: 'verified' }
                            ].map((tx, i) => (
                                <div key={i} className="p-4 hover:bg-muted/30 transition-colors cursor-pointer group/item flex justify-between items-center text-[10px]">
                                    <div>
                                        <p className="font-black text-muted-foreground leading-none mb-1">{tx.date} • {tx.ref}</p>
                                        <p className="font-bold uppercase tracking-widest text-[9px]">{tx.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-black tracking-tight ${tx.val.startsWith('+') ? 'text-green-600' : 'text-foreground'}`}>{tx.val}</p>
                                        <Badge variant="outline" className="text-[7px] h-4 font-black uppercase px-1 border-0">{tx.status || 'Pending'}</Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="p-3 bg-muted/10">
                            <Button variant="link" className="w-full text-[10px] font-black uppercase tracking-widest h-8 gap-2">
                                <FileText className="w-3 h-3" />
                                Statement History
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Support & Hub Link */}
                    <Card className="border-primary/30 shadow-md relative overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-tight">Direct Support</h3>
                                <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                                    Your dedicated Relationship Manager is <span className="text-foreground font-bold">Mr. Vimal Rao</span>. Reach out for priority allocation of biological inputs.
                                </p>
                            </div>
                            <Button variant="outline" className="w-full h-10 border-2 font-black text-[10px] uppercase tracking-widest gap-2">
                                Contact Relationship Manager
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
