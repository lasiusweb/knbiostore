'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Play,
    FileText,
    ShieldAlert,
    ThermometerSnowflake,
    BookOpen,
    ChevronRight,
    HelpCircle,
    ArrowUpRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function KnowledgeBasePage() {
    const categories = [
        { name: 'Application Guides', icon: <Play className="w-5 h-5" />, count: 12 },
        { name: 'Technical Leaflets', icon: <FileText className="w-5 h-5" />, count: 54 },
        { name: 'Safe Handling', icon: <ShieldAlert className="w-5 h-5" />, count: 8 },
        { name: 'Storage Specs', icon: <ThermometerSnowflake className="w-5 h-5" />, count: 6 },
    ];

    return (
        <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in">
            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mx-auto py-8">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-black px-4 py-1 uppercase tracking-widest text-[10px]">
                    Technical Repository
                </Badge>
                <h1 className="text-5xl font-black tracking-tighter text-foreground">
                    Agri-Science <span className="text-primary italic">Intelligence</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Access certified protocol guides, application data, and microbial safety standards for the entire KN Biosciences biological input ecosystem.
                </p>
                <div className="relative max-w-xl mx-auto pt-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search for a bio-strain or application method..."
                        className="pl-12 h-14 bg-background border-border/50 shadow-xl rounded-2xl text-md"
                    />
                </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat) => (
                    <Card key={cat.name} className="border-border/50 shadow-sm hover:border-primary/50 transition-all cursor-pointer group">
                        <CardContent className="p-6 text-center space-y-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
                                {cat.icon}
                            </div>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-tight">{cat.name}</h3>
                                <p className="text-[10px] text-muted-foreground font-bold">{cat.count} Documents</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Featured Technical Guides */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Essential Protocols
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: 'Optimizing Microbial Survival in High-pH Soil', type: 'Video Tutorial', duration: '6m 45s' },
                            { title: 'VAM Application: Root Zone Precision Methods', type: 'PDF Guide', length: '1.2 MB' },
                            { title: 'Cold-Chain Logistics: Handling Live Biologicals', type: 'Safety Manual', status: 'Mandatory' },
                            { title: 'Seasonal Bio-NPK Loading Schedules', type: 'Reference Sheet', updated: '2 days ago' }
                        ].map((guide, i) => (
                            <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <Badge variant="secondary" className="bg-muted text-[8px] font-black uppercase px-2 h-5">
                                            {guide.type}
                                        </Badge>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all translate-y-1 group-hover:translate-y-0" />
                                    </div>
                                    <CardTitle className="text-sm font-black leading-tight mt-2">{guide.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                                        {guide.duration || guide.length || guide.status || `Updated ${guide.updated}`}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Common FAQs */}
                    <div className="pt-8 space-y-6">
                        <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-primary" />
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {[
                                "How long can bio-fertilizers be stored outside cold-storage?",
                                "What is the compatibility of Trichoderma with chemical fungicides?",
                                "Is pre-soaking required for granular microbial pellets?"
                            ].map((q, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-transparent hover:border-border transition-colors cursor-pointer group">
                                    <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">{q}</p>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Urgent Technical Alerts & Expert Contact */}
                <div className="space-y-8">
                    <Card className="border-amber-500/20 bg-amber-500/5 shadow-sm">
                        <CardHeader className="pb-3 border-b border-amber-100">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-amber-600 italic">
                                Technical Alert Zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="p-4 bg-white rounded-xl shadow-sm border border-amber-200">
                                <p className="text-xs font-black text-amber-700 uppercase italic underline decoration-2 underline-offset-4">Handling Warning</p>
                                <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                                    Recent batch #X92 Azospirillum requires immediate relocation to <span className="text-foreground font-bold font-mono">18°C</span> environment. Temperature sensitivity increased due to high-purity strain upgrade.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/30 bg-primary/5 shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity group-hover:opacity-60" />
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-lg font-black uppercase tracking-tight">Need Expert Analysis?</CardTitle>
                            <CardDescription className="text-primary font-medium">Direct connection to KN Agronomists</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10 space-y-4">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Upload your soil health report or crop photos for a customized microbial prescription within 4 hours.
                            </p>
                            <Button className="w-full h-11 gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20">
                                Consult Agri-Expert
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ArrowUpRight(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
        </svg>
    );
}
