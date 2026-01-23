'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    MapPin,
    ThermometerSnowflake,
    Truck,
    Package,
    ArrowUpRight,
    ArrowDownLeft,
    AlertTriangle,
    Navigation,
    Activity,
    Users
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export function WarehouseManager() {
    const warehouses = [
        {
            id: 'WH-001',
            name: 'Hyderabad Central Hub',
            location: 'Bachupally, Hyderabad',
            type: 'Main Distribution Center',
            utilization: 78,
            coldChain: true,
            status: 'Operational',
            activeShipments: 12
        },
        {
            id: 'WH-002',
            name: 'Nizamabad Regional Hub',
            location: 'Kammarpally, Nizamabad',
            type: 'Regional Fulfillment',
            utilization: 42,
            coldChain: true,
            status: 'Active',
            activeShipments: 5
        },
        {
            id: 'WH-003',
            name: 'Warangal Supply Point',
            location: 'Hanamkonda, Warangal',
            type: 'Local Supply Point',
            utilization: 15,
            coldChain: false,
            status: 'Operational',
            activeShipments: 2
        }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Truck className="w-6 h-6 text-primary" />
                        Logistics & Multi-Warehouse
                    </h2>
                    <p className="text-muted-foreground text-sm italic">Monitoring regional stock health and cold-chain integrity</p>
                </div>
                <div className="flex gap-3">
                    <Button className="h-10 font-bold gradient-primary border-0 text-white">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Initiate Transfer
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {warehouses.map((wh) => (
                    <Card key={wh.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                        {wh.coldChain && (
                            <div className="absolute top-0 right-0 p-4">
                                <Badge className="bg-blue-500/10 text-blue-600 border-blue-200 gap-1 font-bold h-6">
                                    <ThermometerSnowflake className="w-3 h-3" />
                                    COLD CHAIN
                                </Badge>
                            </div>
                        )}
                        <CardHeader className="pb-3 border-b bg-muted/20">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-background border shadow-sm group-hover:scale-110 transition-transform">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-black uppercase tracking-tight">{wh.name}</CardTitle>
                                    <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground/70">{wh.id} • {wh.location}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase text-muted-foreground">Storage Utilization</span>
                                    <span className="text-xs font-black">{wh.utilization}%</span>
                                </div>
                                <Progress value={wh.utilization} className="h-1.5" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-muted/30 rounded-xl border border-border/50 space-y-1">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-1">
                                        <Truck className="w-3 h-3" />
                                        Active
                                    </p>
                                    <p className="text-lg font-black tracking-tight">{wh.activeShipments}</p>
                                </div>
                                <div className="p-3 bg-muted/30 rounded-xl border border-border/50 space-y-1">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-1">
                                        <Activity className="w-3 h-3" />
                                        Health
                                    </p>
                                    <p className="text-lg font-black tracking-tight text-green-600">98%</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span className="text-muted-foreground uppercase">Inventory Value</span>
                                    <span className="font-mono">₹ 14.2 Lakhs</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] font-bold">
                                    <span className="text-muted-foreground uppercase">Staff on Duty</span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-3 h-3" /> 8
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/10 border-t p-2">
                            <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase tracking-widest gap-2">
                                Manage Supply Point
                                <Navigation className="w-3 h-3" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Logistics Health Summary */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Regional Stock Movements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { type: 'IN', from: 'Plant #1', to: 'Hyd Central', status: 'In-Transit', time: '2h ago' },
                            { type: 'OUT', from: 'Hyd Central', to: 'Nizamabad', status: 'Delivered', time: '5h ago' },
                            { type: 'IN', from: 'Vendor #4', to: 'Warangal', status: 'Pending', time: 'Just now' }
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-muted/20 rounded-lg transition-colors border border-transparent hover:border-border">
                                <div className="flex items-center gap-3">
                                    <div className={`p-1.5 rounded-md ${log.type === 'IN' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'}`}>
                                        {log.type === 'IN' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-tight">{log.from} → {log.to}</p>
                                        <p className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest">{log.time}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-[8px] h-4 font-black uppercase border-dashed">{log.status}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="border-amber-500/20 bg-amber-500/5 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-amber-600 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Logistics Alerts
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-background rounded-xl border border-amber-200 shadow-sm">
                            <p className="text-xs font-black text-amber-700 uppercase">Cold Chain Warning: Nizamabad Hub</p>
                            <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">External sensor #B4 reporting <span className="text-foreground font-bold font-mono">24°C</span> (Threshold: 18°C). Compressor check recommended.</p>
                            <div className="mt-3 flex gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-[9px] font-black uppercase text-amber-700 border-amber-200">Dispatch Tech</Button>
                                <Button size="sm" variant="ghost" className="h-7 text-[9px] font-black uppercase">Ignore</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
