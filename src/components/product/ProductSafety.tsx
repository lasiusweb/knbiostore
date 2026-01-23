'use client';

import { Product } from '@/lib/types/product-types';
import {
    AlertTriangle,
    ShieldAlert,
    Stethoscope,
    Info,
    PhoneCall,
    Mail,
    FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductSafetyProps {
    product: Product;
}

export function ProductSafety({ product }: ProductSafetyProps) {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Warning Banner */}
            <div className="bg-destructive/10 border-2 border-destructive/20 rounded-2xl p-6 flex items-start gap-4">
                <AlertTriangle className="w-10 h-10 text-destructive shrink-0" />
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-destructive uppercase tracking-tighter">Warning Statement</h3>
                    <p className="text-sm font-bold text-destructive/90 italic">
                        &quot;{product.warningStatement}&quot;
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Precautions */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <ShieldAlert className="w-6 h-6 text-amber-500" />
                        Precautions & Safety Measures
                    </h3>
                    <ul className="space-y-3">
                        {product.precautions.map((prec, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-xl border border-border/50 text-sm">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 font-bold text-[10px]">
                                    {i + 1}
                                </span>
                                <span className="text-muted-foreground">{prec}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* First Aid / Antidote */}
                <div className="space-y-6">
                    <div className="bg-white border-2 border-primary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                            <Stethoscope className="w-16 h-16 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                            <Stethoscope className="w-5 h-5" />
                            Antidote & First Aid
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed relative">
                            {product.antidoteStatement}
                        </p>
                    </div>

                    {/* Leaflet Info */}
                    <div className="bg-muted/50 rounded-2x border p-6">
                        <h4 className="font-bold flex items-center gap-2 mb-2 text-foreground">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            Regulatory Leaflet Information
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {product.leafletInfo}
                        </p>
                    </div>
                </div>
            </div>

            {/* Customer Care Contact */}
            <div className="bg-foreground text-background rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-2xl font-black tracking-tight">Need Expert Assistance?</h3>
                    <p className="text-background/60 text-sm font-medium">Reach out to our customer care cell for safety queries</p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-3 bg-background/10 px-6 py-3 rounded-xl border border-background/20">
                        <PhoneCall className="w-5 h-5 text-primary" />
                        <div className="text-sm">
                            <p className="font-bold text-primary">{product.customerCareDetails.phone}</p>
                            <p className="text-[10px] opacity-50 uppercase font-black tracking-widest">Toll Free</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-background/10 px-6 py-3 rounded-xl border border-background/20">
                        <Mail className="w-5 h-5 text-primary" />
                        <div className="text-sm">
                            <p className="font-bold text-primary">{product.customerCareDetails.email}</p>
                            <p className="text-[10px] opacity-50 uppercase font-black tracking-widest">Support Email</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
