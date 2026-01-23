'use client';

import { useState } from 'react';
import { TaxSettings } from '@/components/pos/TaxSettings';
import { BundleDesigner } from '@/components/pos/BundleDesigner';
import { InventoryAdjustmentForm } from '@/components/pos/InventoryAdjustmentForm';
import { SalesOrderForm } from '@/components/pos/SalesOrderForm';
import { CustomerAgriProfile } from '@/components/pos/CustomerAgriProfile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    BarChart3,
    Settings2,
    Package2,
    Users,
    ShoppingCart,
    LayoutDashboard
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

export default function POSPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center font-black uppercase tracking-widest animate-pulse">Initializing Terminal...</div>}>
            <POSContent />
        </Suspense>
    );
}

function POSContent() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState('bundles');
    const [selectedFarmer, setSelectedFarmer] = useState<any>(null);

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['bundles', 'inventory', 'taxes', 'customers', 'sales'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const handleFarmerSelect = (farmer: any) => {
        setSelectedFarmer(farmer);
        setActiveTab('sales'); // Auto-switch to sales tab on selection
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-1">POS Control Center</h1>
                        <p className="text-muted-foreground italic">Enterprise-grade management for shopfloor operations</p>
                    </div>

                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border">
                        <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Live Sync Active
                        </div>
                        <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                            Terminal: HYD-MAIN-01
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} className="space-y-8" onValueChange={setActiveTab}>
                    <div className="overflow-x-auto pb-2">
                        <TabsList className="bg-muted/50 p-1 border h-14">
                            <TabsTrigger value="dashboard" disabled className="flex items-center gap-2 px-6 h-12">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </TabsTrigger>
                            <TabsTrigger value="bundles" className="flex items-center gap-2 px-6 h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                                <Package2 className="w-4 h-4" />
                                Bundle Designer
                            </TabsTrigger>
                            <TabsTrigger value="inventory" className="flex items-center gap-2 px-6 h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                                <Package2 className="w-4 h-4" />
                                Stock Correction
                            </TabsTrigger>
                            <TabsTrigger value="taxes" className="flex items-center gap-2 px-6 h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                                <Settings2 className="w-4 h-4" />
                                Tax Settings
                            </TabsTrigger>
                            <TabsTrigger value="customers" className="flex items-center gap-2 px-6 h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                                <Users className="w-4 h-4" />
                                Agri-Profiles
                            </TabsTrigger>
                            <TabsTrigger value="sales" className="flex items-center gap-2 px-6 h-12 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
                                <ShoppingCart className="w-4 h-4" />
                                Pre-Bookings
                            </TabsTrigger>
                            <TabsTrigger value="reports" disabled className="flex items-center gap-2 px-6 h-12">
                                <BarChart3 className="w-4 h-4" />
                                Analytics
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="bundles" className="animate-fade-in border-0 p-0 focus-visible:ring-0">
                        <BundleDesigner />
                    </TabsContent>

                    <TabsContent value="inventory" className="animate-fade-in border-0 p-0 focus-visible:ring-0">
                        <InventoryAdjustmentForm />
                    </TabsContent>

                    <TabsContent value="taxes" className="animate-fade-in border-0 p-0 focus-visible:ring-0">
                        <TaxSettings />
                    </TabsContent>

                    <TabsContent value="customers" className="animate-fade-in border-0 p-0 focus-visible:ring-0">
                        <CustomerAgriProfile onSelect={handleFarmerSelect} />
                    </TabsContent>

                    <TabsContent value="sales" className="animate-fade-in border-0 p-0 focus-visible:ring-0">
                        <SalesOrderForm selectedFarmer={selectedFarmer} />
                    </TabsContent>

                    <TabsContent value="dashboard">
                        <div className="flex items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-xl">
                            Dashboard Visualization Coming Soon
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <footer className="border-t py-6 bg-muted/20">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2026 KN Bio Sciences India Pvt Ltd - Enterprise POS Engine</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Offline Logs</a>
                        <a href="#" className="hover:text-primary transition-colors">Tax Compliance Help</a>
                        <a href="#" className="hover:text-primary transition-colors">Terminal Version 2.0.4</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
