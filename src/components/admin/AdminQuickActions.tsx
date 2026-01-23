'use client';

import { Button } from '@/components/ui/button';
import {
    Plus,
    Package,
    FileText,
    ShoppingCart,
    Users,
    Search,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export function AdminQuickActions() {
    const actions = [
        {
            label: 'New Product',
            href: '/admin/products/new',
            icon: <Plus className="w-4 h-4" />,
            description: 'Add a new bio-input SKU',
            color: 'bg-primary/10 text-primary'
        },
        {
            label: 'Sales Order',
            href: '/pos',
            icon: <ShoppingCart className="w-4 h-4" />,
            description: 'Create a new POS transaction',
            color: 'bg-green-500/10 text-green-600'
        },
        {
            label: 'Inventory Adj',
            href: '/admin/inventory',
            icon: <Package className="w-4 h-4" />,
            description: 'Update stock levels',
            color: 'bg-amber-500/10 text-amber-600'
        },
        {
            label: 'New Bundle',
            href: '/pos',
            icon: <FileText className="w-4 h-4" />,
            description: 'Design farm solutions',
            color: 'bg-blue-500/10 text-blue-600'
        },
        {
            label: 'Register Farmer',
            href: '/admin/users',
            icon: <Users className="w-4 h-4" />,
            description: 'Add new customer profile',
            color: 'bg-purple-500/10 text-purple-600'
        }
    ];

    return (
        <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4 flex items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Global admin search..."
                                className="pl-9 h-10 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
                            />
                        </div>
                        <div className="h-8 w-[1px] bg-border mx-2 hidden md:block" />
                        <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                            {actions.map((action) => (
                                <Button
                                    key={action.label}
                                    variant="ghost"
                                    asChild
                                    className="h-10 px-3 gap-2 hover:bg-muted whitespace-nowrap group"
                                >
                                    <Link href={action.href}>
                                        <div className={`p-1.5 rounded-md ${action.color} group-hover:scale-110 transition-transform`}>
                                            {action.icon}
                                        </div>
                                        <span className="text-xs font-semibold">{action.label}</span>
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Button className="h-full rounded-none px-6 gradient-primary border-0 text-white font-bold hidden md:flex items-center gap-2 group">
                        Help Center
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
        />
    );
}
