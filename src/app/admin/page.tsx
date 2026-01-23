import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  TrendingUp, 
  Package, 
  AlertCircle, 
  ShoppingCart,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Total Revenue', value: '₹4,25,000', icon: <TrendingUp className="w-5 h-5 text-green-500" />, trend: '+12.5%' },
    { title: 'Active Products', value: '124', icon: <Package className="w-5 h-5 text-blue-500" />, trend: '0%' },
    { title: 'Low Stock Items', value: '18', icon: <AlertCircle className="w-5 h-5 text-red-500" />, trend: 'Check lot expiry' },
    { title: 'New Orders', value: '42', icon: <ShoppingCart className="w-5 h-5 text-primary" />, trend: '+8.2%' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, Admin. Here is what is happening today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" asChild>
            <Link href="/admin/products">Manage Catalog</Link>
          </Button>
          <Button asChild className="gradient-primary">
            <Link href="/admin/products/new"><Plus className="w-4 h-4 mr-2" /> Add Product</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs mt-1 text-muted-foreground">
                <span className={stat.trend.startsWith('+') ? 'text-green-500 font-bold flex items-center' : ''}>
                  {stat.trend.startsWith('+') && <ArrowUpRight className="w-3 h-3 mr-1" />}
                  {stat.trend}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions / Activity Placeholder */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="col-span-1">
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 text-sm border-b pb-4 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">{i}</div>
                  <div className="flex-1">
                    <p className="font-medium">Order #ORD-{1000 + i} placed</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="font-bold text-primary">₹1,250</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader><CardTitle>Inventory Alerts</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-sm">
                <p className="font-bold text-red-800">Low Stock: Rhizobium Bio-Fertilizer</p>
                <p className="text-red-700">Only 5 units left in Warehouse A.</p>
              </div>
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded text-sm">
                <p className="font-bold text-amber-800">Expiry Warning: Trichoderma Viride</p>
                <p className="text-amber-700">Lot #LOT-2024-01 expires in 12 days.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
