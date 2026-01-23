'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    ArrowLeft,
    RefreshCcw,
    Truck,
    Download,
    Search,
    Filter,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

const MOCK_ORDERS = [
    {
        id: 'ORD-2026-X82',
        date: 'Jan 12, 2026',
        items: [
            { name: 'Rhizobium Bio-Fertilizer', qty: '10 Liters', price: '₹5,200' },
            { name: 'Trichoderma Viride', qty: '5 kg', price: '₹1,900' }
        ],
        total: '₹7,100',
        status: 'Delivered',
        hub: 'Bachupally Hub'
    },
    {
        id: 'ORD-2025-Z44',
        date: 'Oct 28, 2025',
        items: [
            { name: 'Phosphate Solubilizing Bacteria', qty: '20 Liters', price: '₹11,400' }
        ],
        total: '₹11,400',
        status: 'Completed',
        hub: 'Nizamabad Hub'
    }
];

export default function OrderHistoryPage() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
            {/* Header section with back button */}
            <div className="space-y-6">
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary gap-1 px-0">
                    <Link href="/account">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </Button>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">
                            Order <span className="text-primary">History</span>
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">Review your seasonal bookings and technical input acquisitions.</p>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <Card className="border-border/50 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 border-b py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by Order ID or Product Name..."
                                className="pl-9 h-11 bg-background border-border/50"
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button variant="outline" className="h-11 px-4 gap-2 flex-1 md:flex-none font-bold uppercase text-[10px]">
                                <Filter className="w-4 h-4" />
                                All Seasons
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y border-t">
                        {MOCK_ORDERS.map((order) => (
                            <div key={order.id} className="p-6 hover:bg-muted/5 transition-colors group">
                                <div className="grid lg:grid-cols-4 gap-8">
                                    {/* Order Meta Info */}
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Order ID</p>
                                            <p className="font-black text-sm font-mono">{order.id}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Booking Date</p>
                                            <p className="font-bold text-xs">{order.date}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Fulfillment Point</p>
                                            <p className="text-xs font-medium text-muted-foreground">{order.hub}</p>
                                        </div>
                                        <Badge className={`mt-2 font-black uppercase text-[10px] py-1 px-3 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {order.status === 'Delivered' ? <Package className="w-3 h-3 mr-1.5" /> : <Truck className="w-3 h-3 mr-1.5" />}
                                            {order.status}
                                        </Badge>
                                    </div>

                                    {/* Order Items */}
                                    <div className="lg:col-span-2 space-y-4">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Items Captured</p>
                                        <div className="space-y-3">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 bg-muted/20 rounded-xl border border-border/40">
                                                    <div>
                                                        <p className="text-xs font-black uppercase">{item.name}</p>
                                                        <p className="text-[10px] text-muted-foreground font-bold">Volume: {item.qty}</p>
                                                    </div>
                                                    <p className="font-black text-sm text-primary">{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Actions */}
                                    <div className="flex flex-col justify-end gap-3 text-right">
                                        <div className="mb-auto">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Total Value</p>
                                            <h3 className="text-2xl font-black text-foreground">{order.total}</h3>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button size="sm" className="gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest gap-2">
                                                <RefreshCcw className="w-3.5 h-3.5" />
                                                Seasonal Re-Order
                                            </Button>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" className="flex-1 font-black text-[10px] uppercase h-9 gap-2">
                                                    <Download className="w-3.5 h-3.5" />
                                                    Tax Invoice
                                                </Button>
                                                <Button size="sm" variant="ghost" className="px-3 h-9">
                                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Assistance Section */}
            <div className="flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-black uppercase">Need technical assistance with a delivery?</p>
                        <p className="text-xs text-muted-foreground">Our regional hub agronomists are available for immediate support.</p>
                    </div>
                </div>
                <Button variant="link" className="text-primary font-black uppercase tracking-widest text-[10px]">Raise Support Ticket</Button>
            </div>
        </div>
    );
}
