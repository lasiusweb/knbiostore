'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  TrendingUp,
  Package,
  AlertCircle,
  Plus,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

// Optimized Components
import { AdminQuickActions } from '@/components/admin/AdminQuickActions';
import { SalesActivity } from '@/components/admin/SalesActivity';
import { InventorySummary } from '@/components/admin/InventorySummary';
import { TaxAnalysisWidget } from '@/components/admin/TaxAnalysisWidget';
import { CustomerInsights } from '@/components/admin/CustomerInsights';

export default function AdminDashboardPage() {
  const topProducts = [
    { name: 'Rhizobium Bio-Fertilizer', sales: 450, revenue: '₹56,250', stock: 12 },
    { name: 'Trichoderma Viride', sales: 380, revenue: '₹47,500', stock: 85 },
    { name: 'Azospirillum', sales: 310, revenue: '₹38,750', stock: 5 },
    { name: 'Phosphate Solubilizing Bacteria', sales: 290, revenue: '₹36,250', stock: 120 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Quick Actions */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground">
              Admin <span className="text-primary">Overview</span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
              <Calendar className="w-4 h-4" />
              Operational Insight for {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="h-9 font-bold" asChild>
              <Link href="/admin/inventory">Full Inventory</Link>
            </Button>
            <Button size="sm" className="h-9 gradient-primary border-0 text-white font-bold" asChild>
              <Link href="/admin/products/new"><Plus className="w-4 h-4 mr-1.5" /> Add SKU</Link>
            </Button>
          </div>
        </div>

        {/* New Enterprise Quick Actions Toolbar */}
        <AdminQuickActions />
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sales Activity (Today vs Yesterday) */}
        <SalesActivity />

        {/* Inventory Summary (Segment Breakdown) */}
        <InventorySummary />

        {/* Tax Analysis Widget (GST Compliance) */}
        <TaxAnalysisWidget />

        {/* Farmer Insights Widget */}
        <CustomerInsights />
      </div>

      {/* Middle Grid: Revenue Trend & Critical Alerts */}
      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Revenue Performance</CardTitle>
              <CardDescription>Monthly growth trajectory</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">Yearly View</Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-xl border border-dashed flex flex-col items-center justify-center relative p-6 overflow-hidden">
              {/* Fake SVG Chart with Premium Gradient */}
              <svg className="w-full h-full text-primary overflow-visible opacity-50" viewBox="0 0 400 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 Q50,70 100,40 T200,50 T300,20 T400,30"
                  fill="url(#chartGradient)"
                />
                <path
                  d="M0,80 Q50,70 100,40 T200,50 T300,20 T400,30"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="drop-shadow-lg"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                <div className="text-center space-y-2">
                  <Badge variant="outline" className="bg-background font-bold px-4 py-1">Real-time Analytics Engine Active</Badge>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Syncing with PouchDB Instance...</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* High Priority Alerts */}
        <div className="space-y-6">
          <Card className="border-destructive/30 bg-destructive/5 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <CardHeader className="pb-3 border-b border-destructive/10">
              <CardTitle className="text-destructive flex items-center gap-2 text-md">
                <AlertCircle className="w-4 h-4" />
                Critical Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="p-3 bg-white rounded-lg border border-destructive/10 shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                <p className="font-bold text-destructive text-xs uppercase tracking-tight">Low Stock: Azospirillum</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">5 units remaining in Bachupally Hub.</p>
              </div>
              <div className="p-3 bg-white rounded-lg border border-amber-200 shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                <p className="font-bold text-amber-700 text-xs uppercase tracking-tight">Expiry: Rhizobium Lot #24</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Batch expires in <span className="text-amber-600 font-bold">12 days</span>.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-sm">
            <CardHeader className="pb-2 border-b"><CardTitle className="text-md font-bold">Recent POS Activity</CardTitle></CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 text-sm group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center font-bold text-[10px] border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                      #{i}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-xs">#ORD-102{i}</p>
                      <p className="text-[9px] text-muted-foreground uppercase font-medium">Verified by Agent #0{i}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xs text-primary">₹3,420</p>
                      <Badge variant="outline" className="text-[8px] h-4 uppercase px-1">Success</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 h-8 text-[10px] font-bold uppercase tracking-wider" asChild>
                <Link href="/admin/pos">View Terminal Logs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Grid: Top Products & Strategic Insights */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Bestselling Bio-Inputs</CardTitle>
            <CardDescription>Volume performance by SKU</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b uppercase text-[9px] font-black tracking-widest">
                    <th className="text-left pb-4 font-bold">Product Name</th>
                    <th className="text-right pb-4 font-bold">Volume</th>
                    <th className="text-right pb-4 font-bold">Revenue Contribution</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-b">
                  {topProducts.map((p) => (
                    <tr key={p.name} className="group hover:bg-primary/5 transition-colors">
                      <td className="py-4 font-semibold text-xs">{p.name}</td>
                      <td className="py-4 text-right text-xs">{p.sales} <span className="text-[10px] text-muted-foreground">units</span></td>
                      <td className="py-4 text-right">
                        <div className="flex flex-col items-end">
                          <span className="font-black text-primary text-xs">{p.revenue}</span>
                          <span className="text-[8px] text-green-600 font-bold uppercase">+2.1% Growth</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-4 flex justify-center">
              <Button variant="link" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Generate Full Inventory Statement</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5 shadow-sm relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 opacity-5 rotate-12">
            <TrendingUp className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-lg">Enterprise Growth Tips</CardTitle>
            <CardDescription>Optimized for {new Date().getFullYear()} Seasonal Trends</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-start p-4 bg-white rounded-xl border border-primary/10 shadow-sm">
              <div className="bg-primary/20 p-2 rounded-lg shrink-0"><TrendingUp className="w-5 h-5 text-primary" /></div>
              <div>
                <p className="text-xs font-black text-primary uppercase">Regional Demand Spike</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Demand for bio-fertilizers in <span className="text-foreground font-bold">Nizamabad region</span> is up 25%. Ensure Lot #2026-X is prioritized for dispatch.</p>
              </div>
            </div>
            <Separator className="bg-primary/10" />
            <div className="flex gap-4 items-start p-4 bg-white rounded-xl border border-blue-100 shadow-sm">
              <div className="bg-blue-100 p-2 rounded-lg shrink-0"><Package className="w-5 h-5 text-blue-600" /></div>
              <div>
                <p className="text-xs font-black text-blue-600 uppercase">Bundle Optimization</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">The <span className="text-foreground font-bold">&quot;Paddy High-Yield Kit&quot;</span> has a 40% higher margin than single unit sales. Feature it on the main POS terminal.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}