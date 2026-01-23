import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  TrendingUp, 
  Package, 
  AlertCircle, 
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Users,
  BarChart3,
  Calendar,
  HelpCircle,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function AdminDashboardPage() {
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '₹4,25,000', 
      icon: <TrendingUp className="w-5 h-5 text-green-500" />, 
      trend: '+12.5%', 
      isPositive: true,
      tooltip: "Total sales across all channels this month"
    },
    { 
      title: 'Active Products', 
      value: '124', 
      icon: <Package className="w-5 h-5 text-blue-500" />, 
      trend: '0%', 
      isPositive: true,
      tooltip: "Total number of products currently visible in the store"
    },
    { 
      title: 'Avg Order Value', 
      value: '₹10,120', 
      icon: <BarChart3 className="w-5 h-5 text-primary" />, 
      trend: '+5.2%', 
      isPositive: true,
      tooltip: "Average spend per order"
    },
    { 
      title: 'Conversion Rate', 
      value: '3.2%', 
      icon: <Users className="w-5 h-5 text-accent" />, 
      trend: '-0.4%', 
      isPositive: false,
      tooltip: "Percentage of visitors who completed a purchase"
    },
  ];

  const topProducts = [
    { name: 'Rhizobium Bio-Fertilizer', sales: 450, revenue: '₹56,250', stock: 12 },
    { name: 'Trichoderma Viride', sales: 380, revenue: '₹47,500', stock: 85 },
    { name: 'Azospirillum', sales: 310, revenue: '₹38,750', stock: 5 },
    { name: 'Phosphate Solubilizing Bacteria', sales: 290, revenue: '₹36,250', stock: 120 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last updated: {new Date().toLocaleDateString()} at 10:30 AM
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/inventory">View Inventory</Link>
          </Button>
          <Button asChild className="gradient-primary shadow-lg shadow-primary/20">
            <Link href="/admin/products/new"><Plus className="w-4 h-4 mr-2" /> New Product</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="group hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                {stat.title}
                <div title={stat.tooltip} className="cursor-help text-muted-foreground/50 hover:text-primary">
                  <HelpCircle className="w-3 h-3" />
                </div>
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1">
                <span className={`font-bold flex items-center ${stat.isPositive ? 'text-green-500' : 'text-destructive'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.trend}
                </span>
                <span className="ml-1 text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
            {/* Background Decoration */}
            <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              {React.cloneElement(stat.icon as React.ReactElement, { className: "w-24 h-24" })}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts & Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Revenue Trend - High Fidelity Placeholder Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly performance overview</CardDescription>
            </div>
            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-primary/5 rounded-xl border border-dashed flex flex-col items-center justify-center relative p-6">
              {/* Fake SVG Chart */}
              <svg className="w-full h-full text-primary overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                <path 
                  d="M0,80 Q50,70 100,40 T200,50 T300,20 T400,30" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  className="drop-shadow-lg"
                />
                <circle cx="100" cy="40" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
                <circle cx="300" cy="20" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
              </svg>
              <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-background/20 backdrop-blur-[1px]">
                <Badge variant="secondary" className="font-bold">Real-time Data Integration Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <div className="space-y-6">
          <Card className="border-destructive/20 bg-destructive/5 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Critical Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm p-3 bg-white rounded-md border border-destructive/10 shadow-sm">
                <p className="font-bold text-destructive">Low Stock: Azospirillum</p>
                <p className="text-muted-foreground text-xs mt-1">Only 5 units left in Warehouse A.</p>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-2 text-destructive font-bold">Restock Now</Button>
              </div>
              <div className="text-sm p-3 bg-white rounded-md border border-amber-200 shadow-sm">
                <p className="font-bold text-amber-700">Expiry: Lot #LOT-2024-01</p>
                <p className="text-muted-foreground text-xs mt-1">Expires in 12 days (Rhizobium).</p>
                <Button variant="link" size="sm" className="p-0 h-auto text-xs mt-2 text-amber-700 font-bold">Manage Lot</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      #{i}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">#ORD-102{i}</p>
                      <p className="text-[10px] text-muted-foreground uppercase">2 hours ago</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">Processing</Badge>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs" asChild>
                <Link href="/admin/pos">View All Orders</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Grid: Top Products & Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Based on sales volume this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b uppercase text-[10px] tracking-wider">
                    <th className="text-left pb-3 font-medium">Product</th>
                    <th className="text-right pb-3 font-medium">Sales</th>
                    <th className="text-right pb-3 font-medium">Revenue</th>
                    <th className="text-right pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {topProducts.map((p) => (
                    <tr key={p.name} className="group hover:bg-muted/50 transition-colors">
                      <td className="py-4 font-medium">{p.name}</td>
                      <td className="py-4 text-right">{p.sales}</td>
                      <td className="py-4 text-right font-bold text-primary">{p.revenue}</td>
                      <td className="py-4 text-right">
                        {p.stock < 10 ? (
                          <Badge variant="destructive" className="text-[10px]">Low Stock</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] bg-green-50 text-green-700 border-green-200">Healthy</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Insights</CardTitle>
            <CardDescription>AI-generated growth tips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-start p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div className="bg-primary/20 p-2 rounded-full"><TrendingUp className="w-4 h-4 text-primary" /></div>
              <div>
                <p className="text-sm font-bold text-primary">Opportunity Found</p>
                <p className="text-xs text-muted-foreground mt-1">Demand for Bio-Fertilizers is up 25% in the South region. Consider increasing production for Lot #2026-X.</p>
              </div>
            </div>
            <Separator />
            <div className="flex gap-4 items-start p-4 bg-accent/5 rounded-lg border border-accent/10">
              <div className="bg-accent/20 p-2 rounded-full"><Users className="w-4 h-4 text-accent" /></div>
              <div>
                <p className="text-sm font-bold text-accent">Customer Retention</p>
                <p className="text-xs text-muted-foreground mt-1">B2B distributors using partial payments have a 40% higher return rate. Try launching a &apos;Gold Member&apos; loyalty code.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}