'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ThermometerSnowflake,
    Truck,
    ArrowLeft,
    MoreVertical,
    Activity,
    Navigation,
    Package,
    AlertTriangle,
    CheckCircle2,
    Calendar,
    Users,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export default function WarehouseDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
            {/* Breadcrumbs & Header */}
            <div className="space-y-4">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary gap-1 px-0">
                    <Link href="/admin">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Command Center
                    </Link>
                </Button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black h-5 uppercase px-2 text-[9px]">ACTIVE HUB</Badge>
                            <span className="text-xs font-mono text-muted-foreground font-bold tracking-widest">ID: {params.id || 'WH-001'}</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">
                            Hyderabad <span className="text-primary italic">Central Hub</span>
                        </h1>
                        <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
                            <Navigation className="w-4 h-4" />
                            Bachupally Industrial Area, Medchal-Malkajgiri • Manager: Satish K.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="h-10 font-black text-[10px] uppercase tracking-widest gap-2">
                            Download Inventory Manifest
                        </Button>
                        <Button className="h-10 gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
                            Initiate Bulk Transfer
                        </Button>
                    </div>
                </div>
            </div>

            {/* Health & Utilization Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Storage Utilization', val: '78%', type: 'Health', icon: <Package className="w-5 h-5" />, color: 'primary' },
                    { label: 'Active Shipments', val: '12', type: 'Flow', icon: <Truck className="w-5 h-5" />, color: 'blue' },
                    { label: 'Staff Check-in', val: '18/20', type: 'Ops', icon: <Users className="w-5 h-5" />, color: 'green' },
                    { label: 'Hub Power Health', val: 'Stabilized', type: 'Critical', icon: <Zap className="w-5 h-5" />, color: 'amber' }
                ].map((stat, i) => (
                    <Card key={i} className="border-border/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                            {stat.icon}
                        </div>
                        <CardContent className="p-6">
                            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1.5">{stat.label}</p>
                            <h3 className="text-2xl font-black tracking-tighter">{stat.val}</h3>
                        </CardContent>
                        <div className="px-6 pb-4 flex items-center justify-between text-[10px] font-bold">
                            <Badge variant="outline" className="h-5 text-[8px] font-black uppercase px-1.5 border-dashed">{stat.type}</Badge>
                            <span className="text-muted-foreground font-mono">Real-time</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cold Chain Integrity Monitoring */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-blue-500/20 bg-blue-500/5 shadow-lg overflow-hidden">
                        <CardHeader className="bg-white/40 border-b p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                        <CardTitle className="text-lg font-black uppercase tracking-widest text-blue-700 flex items-center gap-2">
                                            <ThermometerSnowflake className="w-5 h-5" />
                                            Biological Cold Chain Sensor Grid
                                        </CardTitle>
                                    </div>
                                    <CardDescription className="text-blue-600/70 font-medium">Monitoring Zone A, B (Liquid Culture Repository)</CardDescription>
                                </div>
                                <Button variant="outline" size="sm" className="bg-white text-blue-600 border-blue-200 font-black text-[9px] uppercase tracking-widest">Calibration Report</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-blue-700/60 tracking-widest">Primary Ambient</p>
                                            <h4 className="text-4xl font-black text-blue-700 tracking-tighter mt-1">17.2°C</h4>
                                        </div>
                                        <Badge className="bg-green-500 text-white font-black text-[9px] h-5 mb-1 uppercase px-2 shadow-sm">Optimal</Badge>
                                    </div>
                                    <div className="h-14 bg-white/60 rounded-xl border border-blue-100 flex items-center justify-center p-4">
                                        {/* Simple Sparkline representation placeholder */}
                                        <div className="flex items-end gap-1 w-full h-full opacity-40">
                                            {[4, 2, 3, 5, 4, 6, 3, 4, 4, 5, 6, 3, 4].map((h, i) => (
                                                <div key={i} className="flex-1 bg-blue-400 rounded-px" style={{ height: `${h * 15}%` }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[10px] font-black uppercase text-blue-700/60 tracking-widest">
                                            <span>Hub Capacity Load</span>
                                            <span>21.4 Tons / 30 Tons</span>
                                        </div>
                                        <Progress value={71} className="h-2 bg-blue-100" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-[10px] font-black uppercase italic">
                                        <div className="p-3 bg-white/60 rounded-lg border border-blue-100 text-blue-800">Humidity: <span className="text-foreground">42%</span></div>
                                        <div className="p-3 bg-white/60 rounded-lg border border-blue-100 text-blue-800">O2 Sat: <span className="text-foreground">19.5%</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-white rounded-xl border border-blue-200 border-dashed flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                    <Activity className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-tight text-blue-700">Automated Environmental Balancing Active</p>
                                    <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed font-medium italic">Systems stabilized Batch #82 heating spike 42 minutes ago by increasing secondary coolant flow in Zone B-4.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Fulfillment Queue */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                                <Truck className="w-5 h-5 text-primary" />
                                Logistics Flow Queue
                            </h2>
                            <Button variant="ghost" className="text-xs font-black uppercase tracking-widest gap-1 hover:text-primary h-8 italic">Optimize Routes</Button>
                        </div>
                        <div className="space-y-3">
                            {[
                                { id: 'DIS-092', destination: 'Nizamabad Transit', items: '42 units', status: 'Loading', priority: 'High' },
                                { id: 'DIS-094', destination: 'Warangal Local', items: '12 units', status: 'Staged', priority: 'STD' },
                                { id: 'DIS-091', destination: 'Karimnagar Hub', items: '110 units', status: 'In-Transit', priority: 'High' }
                            ].map((shipment, i) => (
                                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-muted/20 border border-transparent hover:border-border rounded-2xl transition-all group cursor-pointer">
                                    <div className="flex items-center gap-5">
                                        <div className="flex flex-col items-center">
                                            <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground font-mono leading-none">{shipment.id}</p>
                                            <div className="w-1 h-8 bg-border my-1" />
                                            <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-tight group-hover:text-primary transition-colors">{shipment.destination}</p>
                                            <p className="text-[10px] text-muted-foreground font-bold">{shipment.items} • Bio-Fertilizer Mix</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                                        <div className="text-right hidden md:block">
                                            <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Status</p>
                                            <p className="text-[10px] font-black uppercase text-primary italic">{shipment.status}</p>
                                        </div>
                                        <Badge className={`font-black uppercase text-[8px] h-5 px-1.5 border-0 ${shipment.priority === 'High' ? 'bg-amber-100 text-amber-700' : 'bg-muted text-muted-foreground'}`}>
                                            {shipment.priority}
                                        </Badge>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all rounded-full group-hover:scale-110">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Batch Alerts & Hub Ops */}
                <div className="space-y-8">
                    <Card className="border-destructive/30 bg-destructive/5 shadow-md relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:rotate-12 transition-transform">
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                        </div>
                        <CardHeader className="pb-3 border-b border-destructive/10">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-destructive">
                                Critical Batch Alerts
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="p-4 bg-white rounded-xl border border-destructive/20 shadow-sm relative group/alert overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-destructive" />
                                <p className="text-[10px] font-black text-destructive uppercase tracking-widest leading-none mb-1.5">Expiry Critical: Lot #2024-X4</p>
                                <p className="text-[11px] font-bold text-foreground leading-tight">Rhizobium Liquid (Batch #24-A)</p>
                                <p className="text-[9px] text-muted-foreground mt-1 italic font-medium">Shelf-life breach in <span className="text-destructive font-bold">14 days</span>. Prioritize for local distribution.</p>
                                <Button size="sm" variant="link" className="mt-2 text-destructive font-black uppercase text-[9px] p-0 h-auto">Recall Batch</Button>
                            </div>

                            <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-sm relative group/alert overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none mb-1.5">Low Stock: Trichoderma</p>
                                <p className="text-[11px] font-bold text-foreground leading-tight">Hub inventory below buffer (400kg)</p>
                                <p className="text-[9px] text-muted-foreground mt-1 italic font-medium">Regional demand spike triggered auto-reorder from main Plant #1.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="pb-3 border-b bg-muted/30">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">Hub Operational Log</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            {[
                                { user: 'Admin #04', action: 'Verified Zone A Cold Grid', time: '14m ago' },
                                { user: 'Agent #22', action: 'Staged ORD-2204 for Dispatch', time: '1h ago' },
                                { user: 'System', action: 'Automated Calibration Routine Executed', time: '3h ago' }
                            ].map((log, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                        <Activity className="w-3.5 h-3.5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-tight">{log.action}</p>
                                        <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">{log.user} • {log.time}</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full h-10 border-dashed border-2 text-muted-foreground font-black text-[10px] uppercase tracking-widest mt-4">Generate Hub Audit Report</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
