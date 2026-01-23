'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    User,
    Package,
    Sprout,
    ShieldCheck,
    ChevronRight,
    Gift,
    ClipboardList,
    TrendingUp,
    MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function AccountDashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                        My <span className="text-primary">Agri-Hub</span>
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Welcome back, <span className="text-foreground font-bold">Harish Kumar</span> • Farmer ID: #KN-0822
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black px-3 py-1">
                        GOLD MEMBER
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 font-bold px-3 py-1">
                        CREDIT: ₹45,000
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Dashboard Area */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Crop Health & Active Cycle */}
                    <Card className="border-primary/20 bg-primary/5 shadow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Sprout className="w-32 h-32" />
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                    <Sprout className="w-5 h-5 text-primary" />
                                    Active Crop Cycle
                                </CardTitle>
                                <Button size="sm" variant="link" className="text-xs font-bold text-primary px-0">Edit Land Geometry</Button>
                            </div>
                            <CardDescription className="text-primary/70 font-medium">Monitoring Maize (Kharif Season) • Batch #82</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-background rounded-xl border shadow-sm">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Days to Harvest</p>
                                    <p className="text-2xl font-black mt-1">42 <span className="text-xs text-muted-foreground font-medium">Days</span></p>
                                </div>
                                <div className="p-4 bg-background rounded-xl border shadow-sm">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Soil Health Score</p>
                                    <p className="text-2xl font-black text-green-600 mt-1">8.4 / 10</p>
                                </div>
                                <div className="p-4 bg-background rounded-xl border shadow-sm">
                                    <p className="text-[10px] font-black uppercase text-muted-foreground">Net Irrigation Value</p>
                                    <p className="text-2xl font-black mt-1">280 <span className="text-xs text-muted-foreground font-medium">kl/Acre</span></p>
                                </div>
                            </div>

                            <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 border-dashed">
                                <p className="text-[10px] font-black uppercase text-primary">Next Step Recommendation</p>
                                <p className="text-xs font-medium text-muted-foreground mt-1">Apply <span className="text-foreground font-bold italic">Azospirillum Bio-Fertilizer</span> in the next 72 hours for optimal nitrogen fixing during flowering.</p>
                                <Button size="sm" className="mt-4 gradient-primary border-0 text-white font-bold h-8 text-[10px] uppercase tracking-wider">Order Required Inputs</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-border/50 shadow-sm group hover:shadow-md transition-all">
                            <CardHeader className="pb-3 px-6 pt-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                    <ClipboardList className="w-4 h-4" />
                                    Recent Purchases
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="flex items-center justify-between group/item">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center font-bold text-xs">#{i}</div>
                                            <div>
                                                <p className="font-bold text-xs uppercase">Rhizobium Bio-Fertilizer</p>
                                                <p className="text-[10px] text-muted-foreground">Delivered Jan 12, 2026</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 group-hover/item:text-primary transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full text-[10px] font-black uppercase tracking-widest h-9" asChild>
                                    <Link href="/account/orders">View All Orders</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-border/50 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Gift className="w-12 h-12" />
                            </div>
                            <CardHeader className="pb-3 px-6 pt-6">
                                <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                    <TrendingUp className="w-4 h-4" />
                                    Reward Points
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6 space-y-6">
                                <div className="text-center py-4 bg-muted/30 rounded-2xl border border-dashed border-primary/20">
                                    <h3 className="text-4xl font-black tracking-tighter text-primary">1,240</h3>
                                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest mt-1">Agri-Science Credits</p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] text-muted-foreground italic leading-relaxed text-center font-medium">Earn more points by recycling microbial packaging containers at regional Hubs.</p>
                                    <Button className="w-full h-9 gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest">Reedem Points</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Sidebar area */}
                <div className="space-y-8">
                    {/* User Profile Info */}
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="text-center border-b bg-muted/30">
                            <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-white shadow-xl mx-auto flex items-center justify-center mb-4">
                                <User className="w-10 h-10 text-primary" />
                            </div>
                            <CardTitle className="text-lg font-black tracking-tight">Harish Kumar</CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 mt-1">
                                <MapPin className="w-3 h-3" />
                                Nizamabad, Telangana
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Primary Crop Focus</p>
                                <p className="text-xs font-bold capitalize">Maize, Turmeric, Pulses</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Registered Mobile</p>
                                <p className="text-xs font-bold font-mono">+91 92810 30822</p>
                            </div>
                            <Separator />
                            <div className="space-y-2 pt-2">
                                <p className="text-[9px] font-black uppercase text-muted-foreground">Compliance Verification</p>
                                <Badge className="bg-green-100 text-green-700 border-green-200 gap-1.5 font-bold h-6 text-[10px] px-3">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    VERIFIED GROWER
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="p-4 bg-muted/20 border-t">
                            <Button variant="ghost" className="w-full h-9 text-[10px] font-black uppercase tracking-widest">Update Agri-Profile</Button>
                        </CardFooter>
                    </Card>

                    {/* Support & Training */}
                    <Card className="border-blue-500/20 bg-blue-500/5 shadow-sm text-blue-700">
                        <CardHeader className="pb-3 border-b border-blue-100">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 italic">
                                Support & Knowledge
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100 group cursor-pointer hover:border-blue-300 transition-colors">
                                <p className="text-xs font-black uppercase">Technical Expert Chat</p>
                                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Direct connection to KN Agronomists.</p>
                            </div>
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-blue-100 group cursor-pointer hover:border-blue-300 transition-colors">
                                <p className="text-xs font-black uppercase">Application Guides</p>
                                <p className="text-[10px] text-muted-foreground mt-1 font-medium">Video tutorials for microbial application.</p>
                            </div>
                            <Button variant="outline" className="w-full h-10 border-blue-200 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:bg-blue-100 transition-colors">
                                Visit Help Center
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function Separator() {
    return <div className="h-px w-full bg-border" />;
}

function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}
