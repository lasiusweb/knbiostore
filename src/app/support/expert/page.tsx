'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MessageSquare,
    Upload,
    Image as ImageIcon,
    Camera,
    CheckCircle2,
    Clock,
    FileText,
    ArrowRight,
    Search,
    User,
    ChevronRight,
    MapPin,
    AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AgriExpertPortal() {
    const [step, setStep] = useState(1);
    const [selectedCrop, setSelectedCrop] = useState('');

    const recentConsultations = [
        { id: 'TKT-821', expert: 'Dr. Srinivas Rao', status: 'Prescribed', date: '2h ago', crop: 'Paddy' },
        { id: 'TKT-819', expert: 'Technical Bot', status: 'Analyzing', date: '5h ago', crop: 'Cotton' }
    ];

    return (
        <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b pb-8">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter text-foreground">
                        Agri-Expert <span className="text-primary italic">Consultation</span>
                    </h1>
                    <p className="text-muted-foreground text-md max-w-xl">
                        Direct access to KN Biosciences agronomists. Get customized microbial prescriptions based on your soil profile and crop needs.
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-primary/5 p-4 rounded-2xl border border-primary/10 shadow-sm">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-muted overflow-hidden">
                                <User className="w-full h-full p-2 text-muted-foreground" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase text-primary">Experts Online</p>
                        <p className="text-[10px] text-muted-foreground font-bold">14 Agronomists Ready • Avg wait: 12m</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Action Area: Request Prescription */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-primary/20 shadow-xl overflow-hidden">
                        <CardHeader className="bg-primary/5 border-b py-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Badge className="bg-primary text-white font-black text-[9px] h-5 uppercase px-2">New Request</Badge>
                                        <CardTitle className="text-xl font-black uppercase tracking-tight">Technical Analysis Request</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium text-muted-foreground">Follow the steps for a 1:1 consultation</CardDescription>
                                </div>
                                <div className="hidden md:flex items-center gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            {step === 1 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Identify Your Crop Concentration</Label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {['Paddy', 'Chilli', 'Mango', 'Cotton', 'Maize', 'Turmeric', 'Coconut', 'Others'].map(crop => (
                                                <Button
                                                    key={crop}
                                                    variant={selectedCrop === crop ? 'default' : 'outline'}
                                                    className={`h-14 font-black uppercase text-[10px] tracking-wider transition-all shadow-sm ${selectedCrop === crop ? 'gradient-primary border-0 scale-105' : 'hover:border-primary/50'}`}
                                                    onClick={() => setSelectedCrop(crop)}
                                                >
                                                    {crop}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-4">
                                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Describe Current Soil conditions / Issues</Label>
                                        <Textarea
                                            placeholder="e.g. Yellowing of leaves in batch #4, slow nutrient uptake despite NPK application..."
                                            className="min-h-[120px] bg-muted/20 border-border/50 rounded-xl"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Soil Health Report (PDF/IMAGE)</Label>
                                            <div className="h-48 border-2 border-dashed border-primary/20 rounded-2xl flex flex-col items-center justify-center space-y-3 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                                                <Upload className="w-8 h-8 text-primary opacity-60" />
                                                <p className="text-[10px] font-black uppercase text-primary">Drop Report Here</p>
                                                <p className="text-[9px] text-muted-foreground italic">Max file size: 10MB</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Fresh Field Photos</Label>
                                            <div className="h-48 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center space-y-3 hover:bg-muted/30 transition-colors cursor-pointer">
                                                <div className="flex gap-2">
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                                    <Camera className="w-6 h-6 text-muted-foreground" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase text-muted-foreground">Upload 3+ Photos</p>
                                                <p className="text-[9px] text-muted-foreground italic">Recommended for disease analysis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3 text-amber-700">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p className="text-[10px] font-medium leading-relaxed italic">Technical experts provide more accurate prescriptions when provided with both a recent soil report and High-Res photos of the root zone.</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="p-8 border-t bg-muted/10 flex justify-between items-center">
                            <Button
                                variant="ghost"
                                className="font-black uppercase text-[10px] tracking-widest h-12 px-6"
                                onClick={() => step > 1 && setStep(step - 1)}
                                disabled={step === 1}
                            >
                                Previous Step
                            </Button>
                            <Button
                                className="gradient-primary border-0 text-white font-black uppercase text-[10px] tracking-widest h-12 px-12 shadow-lg shadow-primary/20 scale-105"
                                onClick={() => step < 3 ? setStep(step + 1) : null}
                            >
                                {step < 3 ? 'Continue to Next Step' : 'Submit Consultation Request'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* How It Works */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Data Collection', desc: 'Securely upload soil tests and field photos.', icon: <FileText /> },
                            { title: 'Analysis', desc: 'KN Agronomists review and cross-run simulations.', icon: <Search /> },
                            { title: 'Prescription', desc: 'Receive a technical microbial dosage plan.', icon: <CheckCircle2 /> }
                        ].map((item, i) => (
                            <div key={i} className="space-y-3 p-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">{item.icon}</div>
                                <h4 className="text-xs font-black uppercase tracking-tight">{item.title}</h4>
                                <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar: Activity & Expert Spotlights */}
                <div className="space-y-8">
                    {/* Recent consultations */}
                    <Card className="border-border/50 shadow-sm relative overflow-hidden">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                Your Recent Tickets
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {recentConsultations.map((tkt, i) => (
                                    <div key={i} className="p-4 hover:bg-muted/20 transition-colors cursor-pointer group">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest font-mono text-primary">{tkt.id}</p>
                                            <Badge variant="outline" className={`text-[8px] font-black uppercase h-5 px-1.5 ${tkt.status === 'Prescribed' ? 'border-green-200 text-green-600' : 'border-blue-200 text-blue-600'}`}>
                                                {tkt.status}
                                            </Badge>
                                        </div>
                                        <p className="text-xs font-bold">{tkt.expert}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[9px] text-muted-foreground font-medium uppercase">{tkt.crop} • {tkt.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="p-3 bg-muted/10">
                            <Button variant="link" className="w-full text-[10px] font-black uppercase tracking-widest h-8">View All Consultations</Button>
                        </CardFooter>
                    </Card>

                    {/* Expert Spotlight */}
                    <Card className="border-border/50 shadow-sm group">
                        <CardHeader className="pb-3 border-b bg-muted/30">
                            <CardTitle className="text-xs font-black uppercase tracking-widest italic text-muted-foreground">Regional Spotlight</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-muted overflow-hidden shrink-0 border border-primary/20">
                                    <User className="w-full h-full p-3 text-muted-foreground" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black tracking-tight">Dr. Kavitha Reddy</h4>
                                    <p className="text-[10px] text-primary font-bold uppercase">PhD, Soil Microbiology</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground">
                                    <MapPin className="w-3.5 h-3.5" />
                                    Nellore Regional Center
                                </div>
                                <p className="text-[10px] text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-3">
                                    "Specializing in saline soil reclamation using high-purity biological inputs for Aqua-Agri integrated farms."
                                </p>
                            </div>
                            <Button className="w-full h-10 gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest group-hover:scale-105 transition-transform">
                                <MessageSquare className="w-3.5 h-3.5 mr-2" />
                                Initiate Consultation
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Telegram/WhatsApp integration stub */}
                    <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/20 text-center space-y-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-green-700 tracking-widest">WhatsApp Expert Hub</p>
                            <p className="text-[9px] text-muted-foreground italic font-medium leading-relaxed">Instant microbial emergency analysis for field specialists.</p>
                        </div>
                        <Button variant="outline" className="h-9 w-full font-black text-[10px] uppercase border-green-200 text-green-600 hover:bg-green-100 transition-colors">Connect via WhatsApp</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
