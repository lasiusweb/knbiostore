"use client"

import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Package, 
  Warehouse, 
  ShoppingBag, 
  Users, 
  Settings,
  Menu,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarLinks = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Products', href: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { label: 'Inventory', href: '/admin/inventory', icon: <Warehouse className="w-5 h-5" /> },
    { label: 'Orders (POS)', href: '/admin/pos', icon: <ShoppingBag className="w-5 h-5" /> },
    { label: 'Customers', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Settings', href: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
            KnBio Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Button
              key={link.label}
              variant="ghost"
              asChild
              className="w-full justify-start gap-3 px-4 py-6 hover:bg-primary/5 hover:text-primary transition-all group"
            >
              <Link href={link.href}>
                {link.icon}
                <span className="font-medium">{link.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="bg-primary/10 rounded-lg p-4">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Status</p>
            <div className="flex items-center gap-2 text-sm text-primary">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live - v0.1.0
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center px-8 md:hidden">
          <Button variant="ghost" size="icon"><Menu /></Button>
          <span className="ml-4 font-bold">KnBio Admin</span>
        </header>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
