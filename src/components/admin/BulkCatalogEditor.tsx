'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    Download,
    Upload,
    Filter,
    Layers,
    Database,
    ChevronDown
} from 'lucide-react';
import { BulkProductTable } from './BulkProductTable';
import { Badge } from '@/components/ui/badge';

// Mock data for the editor
const MOCK_BULK_PRODUCTS = [
    {
        id: '1',
        name: 'Rhizobium Bio-Fertilizer',
        description: 'Nitrogen fixing bacteria for pulses.',
        tags: ['Bio-Fertilizer', 'Pulses'],
        product_variants: [{ sku: 'KN-BIO-RHZ-500', price: 450 }]
    },
    {
        id: '2',
        name: 'Trichoderma Viride',
        description: 'Biological fungicide for soil diseases.',
        tags: ['Bio-Fungicide', 'Soil Care'],
        product_variants: [{ sku: 'KN-BIO-TRI-1KG', price: 380 }]
    },
    {
        id: '3',
        name: 'Azospirillum',
        description: 'Free living nitrogen fixing bacteria.',
        tags: ['Bio-Fertilizer', 'Cerials'],
        product_variants: [{ sku: 'KN-BIO-AZS-L', price: 520 }]
    },
    {
        id: '4',
        name: 'VAM Bio-Fertilizer',
        description: 'Vesicular Arbuscular Mycorrhiza for nutrient uptake.',
        tags: ['Bio-Fertilizer', 'Root Growth'],
        product_variants: [{ sku: 'KN-BIO-VAM-500', price: 650 }]
    }
];

export function BulkCatalogEditor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inventory, setInventory] = useState(MOCK_BULK_PRODUCTS);

    const filteredInventory = inventory.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.product_variants[0].sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Database className="w-6 h-6 text-primary" />
                        Enterprise Catalog Editor
                    </h2>
                    <p className="text-muted-foreground text-sm italic">Mass update pricing, bio-attributes, and stock visibility</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 font-bold group">
                        <Upload className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                        Import CSV
                    </Button>
                    <Button variant="outline" className="h-10 font-bold group">
                        <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                        Export Data
                    </Button>
                </div>
            </div>

            <Card className="border-border/50 shadow-lg overflow-hidden">
                <CardHeader className="bg-muted/30 border-b py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by Product Name or SKU..."
                                className="pl-9 h-11 bg-background border-border/50 shadow-sm focus-visible:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button variant="outline" className="h-11 px-4 gap-2 flex-1 md:flex-none">
                                <Filter className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Filters</span>
                                <Badge className="ml-1 bg-primary/10 text-primary hover:bg-primary/20 border-0 h-5 px-1.5 font-bold">2</Badge>
                            </Button>
                            <Button variant="outline" className="h-11 px-4 gap-2 flex-1 md:flex-none">
                                <Layers className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase">Segments</span>
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <BulkProductTable products={filteredInventory} />
                </CardContent>
            </Card>

            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Local DB Synced: 2.4s ago</span>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-black uppercase text-primary tracking-tighter">
                    <span>Total SKUs: {inventory.length}</span>
                    <span>Active Bio-Strains: 14</span>
                    <span>Pending Updates: 0</span>
                </div>
            </div>
        </div>
    );
}
