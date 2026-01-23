'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
export function CustomerAgriProfile({ onSelect }: { onSelect?: (farmer: any) => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [activeFarmer, setActiveFarmer] = useState({
        id: 'F-1025',
        name: 'Rajesh Kumar',
        mobile: '9876543210',
        location: 'Kammarpally, Nizamabad',
        landSize: '12.5',
        primaryCrop: 'Paddy',
        ph: '6.8',
        carbon: '0.72%'
    });

    // Mock data for search
    const mockFarmers = [
        { id: 'F-1025', name: 'Rajesh Kumar', mobile: '9876543210', location: 'Nizamabad, TS', ph: '6.8', carbon: '0.72%', landSize: '12.5', primaryCrop: 'Paddy' },
        { id: 'F-1289', name: 'Lakshmi Rao', mobile: '9123456780', location: 'Warangal, TS', ph: '7.2', carbon: '0.45%', landSize: '8.0', primaryCrop: 'Cotton' }
    ];

    const handleSave = () => {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
    };

    const handleSelectFarmer = (f: any) => {
        setActiveFarmer({
            ...f,
            landSize: f.landSize.toString()
        });
        setSearchQuery('');
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
            {/* Search & Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        <Users className="w-6 h-6 text-primary" />
                        Farmer Agri-Profiles
                    </h2>
                    <p className="text-muted-foreground text-sm italic">Tracking regional soil health and crop transitions</p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by Mobile or ID..."
                        className="pl-9 h-11 bg-muted/30 border-0 focus-visible:ring-1 focus-visible:ring-primary/30"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <div className="absolute top-12 inset-x-0 bg-background border rounded-xl shadow-2xl z-50 p-2 space-y-1 animate-slide-up">
                            {mockFarmers.map(f => (
                                <div
                                    key={f.id}
                                    className="p-3 hover:bg-primary/5 rounded-lg border border-transparent hover:border-primary/20 cursor-pointer group transition-all"
                                    onClick={() => handleSelectFarmer(f)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-sm tracking-tight">{f.name}</span>
                                        <Badge variant="outline" className="text-[10px] font-mono">{f.id}</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                                        <span>{f.mobile}</span>
                                        <span className="w-1 h-1 rounded-full bg-border" />
                                        <span>{f.location}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info & Land */}
                <div className="space-y-6">
                    <Card className="border-border/50 shadow-sm">
                        <CardHeader className="pb-3 border-b bg-muted/20">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Demographics & Land
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Farmer Name</label>
                                <Input value={activeFarmer.name} readOnly className="h-10 font-medium bg-muted/10 cursor-not-allowed" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Land Size (Acres)</label>
                                    <div className="relative">
                                        <Input value={activeFarmer.landSize} readOnly className="h-10 pr-12 font-bold bg-muted/10 cursor-not-allowed" />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground">ACRE</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground">Primary Crop</label>
                                    <Input value={activeFarmer.primaryCrop} readOnly className="h-10 font-bold bg-muted/10 cursor-not-allowed" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-muted-foreground">Village / Mandal</label>
                                <Input value={activeFarmer.location} readOnly className="h-10 text-sm bg-muted/10 cursor-not-allowed" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-green-500/20 bg-green-500/5 shadow-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-bold text-green-700 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Loyalty Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-2xl font-black text-green-700">Gold Member</p>
                                    <p className="text-[8px] uppercase tracking-widest font-bold text-green-600/70">Member since Feb 2024</p>
                                </div>
                                <Badge className="bg-green-600 border-0 text-white font-bold h-6">A+</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* NEW SELECT FOR ORDER BUTTON */}
                    {onSelect && (
                        <Button
                            className="w-full h-14 bg-foreground text-background font-black uppercase tracking-tighter text-lg hover:scale-[1.02] transition-transform shadow-xl"
                            onClick={() => onSelect(activeFarmer)}
                        >
                            Select for Transaction
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    )}
                </div>

                {/* Middle Column: Soil Health */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-primary/20 shadow-lg relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                <Thermometer className="w-16 h-16 text-primary" />
                            </div>
                            <CardHeader className="pb-3 border-b">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                    <Thermometer className="w-4 h-4" />
                                    Latest Soil Health Record
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="p-4 bg-muted/40 rounded-xl border border-border/50 text-center space-y-1">
                                        <p className="text-[9px] font-black uppercase text-muted-foreground">Soil pH</p>
                                        <p className="text-2xl font-black text-foreground">{activeFarmer.ph}</p>
                                        <Badge variant="outline" className="h-4 text-[8px] bg-green-50 text-green-600 border-green-200">Balanced</Badge>
                                    </div>
                                    <div className="p-4 bg-muted/40 rounded-xl border border-border/50 text-center space-y-1">
                                        <p className="text-[9px] font-black uppercase text-muted-foreground">Org. Carbon</p>
                                        <p className="text-2xl font-black text-foreground">{activeFarmer.carbon}</p>
                                        <Badge variant="outline" className="h-4 text-[8px] bg-amber-50 text-amber-600 border-amber-200">Moderate</Badge>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-muted-foreground">Nitrogen (N)</span>
                                        <Badge className="bg-primary/20 text-primary border-0 font-bold h-5">Optimal</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-muted-foreground">Phosphorus (P)</span>
                                        <Badge className="bg-amber-500/20 text-amber-600 border-0 font-bold h-5">{parseFloat(activeFarmer.ph) > 7 ? 'Optimal' : 'Deficit'}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-bold text-muted-foreground">Potassium (K)</span>
                                        <Badge className="bg-green-500/20 text-green-600 border-0 font-bold h-5">High</Badge>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-primary/5 border-t py-4 justify-center">
                                <Button variant="link" size="sm" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest text-primary">
                                    Upload Lab Report (PDF/IMG)
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-border/50 shadow-sm">
                            <CardHeader className="pb-3 border-b">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <History className="w-4 h-4" />
                                    Crop & Sales History
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 p-0">
                                <div className="divide-y">
                                    {[
                                        { year: '2025', season: 'Kharif', crop: 'Paddy (MTU-1010)', yield: '28 Bags/Acre', status: 'Success' },
                                        { year: '2024', season: 'Rabi', crop: 'Maize (DKC-9108)', yield: '32 Quintals/Acre', status: 'Success' },
                                        { year: '2024', season: 'Kharif', crop: 'Cotton (RCH-659)', yield: '12 Quintals/Acre', status: 'Success' }
                                    ].map((h, i) => (
                                        <div key={i} className="p-4 hover:bg-muted/30 transition-colors">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="text-xs font-black">{h.crop}</span>
                                                <Badge variant="outline" className="text-[8px] h-4 uppercase">{h.year} • {h.season}</Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                                                    <Sprout className="w-3 h-3" />
                                                    Yield: <span className="text-foreground font-bold">{h.yield}</span>
                                                </span>
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="py-4 justify-center">
                                <Button variant="outline" className="w-full text-[10px] font-bold uppercase tracking-widest h-8">
                                    Add Season Record
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            className="flex-1 h-12 gradient-primary border-0 text-white font-bold group shadow-xl shadow-primary/20"
                            onClick={handleSave}
                        >
                            {isSuccess ? (
                                <span className="flex items-center gap-2 animate-fade-in">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Profile Synchronized
                                </span>
                            ) : (
                                <>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Save Farmer Profile
                                    <Plus className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                                </>
                            )}
                        </Button>
                        <Button variant="outline" className="h-12 px-6 font-bold text-xs uppercase tracking-widest">
                            Export ID Card
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* Middle Column: Soil Health */ }
<div className="space-y-6 lg:col-span-2">
    <div className="grid md:grid-cols-2 gap-8">
        <Card className="border-primary/20 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <Thermometer className="w-16 h-16 text-primary" />
            </div>
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Latest Soil Health Record
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-muted/40 rounded-xl border border-border/50 text-center space-y-1">
                        <p className="text-[9px] font-black uppercase text-muted-foreground">Soil pH</p>
                        <p className="text-2xl font-black text-foreground">6.8</p>
                        <Badge variant="outline" className="h-4 text-[8px] bg-green-50 text-green-600 border-green-200">Balanced</Badge>
                    </div>
                    <div className="p-4 bg-muted/40 rounded-xl border border-border/50 text-center space-y-1">
                        <p className="text-[9px] font-black uppercase text-muted-foreground">Org. Carbon</p>
                        <p className="text-2xl font-black text-foreground">0.72%</p>
                        <Badge variant="outline" className="h-4 text-[8px] bg-amber-50 text-amber-600 border-amber-200">Moderate</Badge>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-muted-foreground">Nitrogen (N)</span>
                        <Badge className="bg-primary/20 text-primary border-0 font-bold h-5">Optimal</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-muted-foreground">Phosphorus (P)</span>
                        <Badge className="bg-amber-500/20 text-amber-600 border-0 font-bold h-5">Deficit</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-muted-foreground">Potassium (K)</span>
                        <Badge className="bg-green-500/20 text-green-600 border-0 font-bold h-5">High</Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-primary/5 border-t py-4 justify-center">
                <Button variant="link" size="sm" className="h-auto p-0 text-[10px] font-black uppercase tracking-widest text-primary">
                    Upload Lab Report (PDF/IMG)
                </Button>
            </CardFooter>
        </Card>

        <Card className="border-border/50 shadow-sm">
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Crop & Sales History
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 p-0">
                <div className="divide-y">
                    {[
                        { year: '2025', season: 'Kharif', crop: 'Paddy (MTU-1010)', yield: '28 Bags/Acre', status: 'Success' },
                        { year: '2024', season: 'Rabi', crop: 'Maize (DKC-9108)', yield: '32 Quintals/Acre', status: 'Success' },
                        { year: '2024', season: 'Kharif', crop: 'Cotton (RCH-659)', yield: '12 Quintals/Acre', status: 'Success' }
                    ].map((h, i) => (
                        <div key={i} className="p-4 hover:bg-muted/30 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-xs font-black">{h.crop}</span>
                                <Badge variant="outline" className="text-[8px] h-4 uppercase">{h.year} • {h.season}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] text-muted-foreground italic flex items-center gap-1">
                                    <Sprout className="w-3 h-3" />
                                    Yield: <span className="text-foreground font-bold">{h.yield}</span>
                                </span>
                                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="py-4 justify-center">
                <Button variant="outline" className="w-full text-[10px] font-bold uppercase tracking-widest h-8">
                    Add Season Record
                </Button>
            </CardFooter>
        </Card>
    </div>

    <div className="flex gap-4">
        <Button
            className="flex-1 h-12 gradient-primary border-0 text-white font-bold group shadow-xl shadow-primary/20"
            onClick={handleSave}
        >
            {isSuccess ? (
                <span className="flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-5 h-5" />
                    Profile Synchronized
                </span>
            ) : (
                <>
                    <FileText className="w-4 h-4 mr-2" />
                    Save Farmer Profile
                    <Plus className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                </>
            )}
        </Button>
        <Button variant="outline" className="h-12 px-6 font-bold text-xs uppercase tracking-widest">
            Export ID Card
        </Button>
    </div>
</div>
            </div >
        </div >
    );
}
