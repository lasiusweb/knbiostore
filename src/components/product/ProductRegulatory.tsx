'use client';

import { Product } from '@/lib/types/product-types';
import { Badge } from '@/components/ui/badge';
import {
    Fingerprint,
    MapPin,
    Building2,
    ShieldCheck,
    FileCheck,
    Briefcase
} from 'lucide-react';

interface ProductRegulatoryProps {
    product: Product;
}

export function ProductRegulatory({ product }: ProductRegulatoryProps) {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* License Header */}
            <div className="flex flex-col md:flex-row justify-between gap-6 border-b pb-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <FileCheck className="w-6 h-6 text-primary" />
                        Statutory Certifications
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">CIB & RC Registration</label>
                            <p className="text-lg font-black font-mono text-primary uppercase tracking-tighter">{product.cbirc}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Mfg. Licence Number</label>
                            <p className="text-lg font-black font-mono text-foreground uppercase tracking-tighter">{product.manufacturingLicence}</p>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">State Registration</label>
                            <p className="text-lg font-black font-mono text-foreground uppercase tracking-tighter">{product.stateRegistration}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col items-center justify-center text-center max-w-sm">
                    <Fingerprint className="w-16 h-16 text-primary mb-4" />
                    <h4 className="font-black text-primary uppercase text-xs tracking-[0.2em] mb-2">Authenticator Certificate</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        This product is formulated by <span className="text-foreground font-bold">KN Bio Sciences India Pvt Ltd</span> in full compliance with ISO 9001:2015 and Bureau of Indian Standards (BIS) protocols.
                    </p>
                </div>
            </div>

            {/* Supply Chain / Marketed By */}
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                        <Briefcase className="w-5 h-5" />
                        Marketed By
                    </h3>
                    <div className="p-6 bg-muted/20 rounded-2xl border border-border/50 space-y-3 relative overflow-hidden">
                        <Building2 className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 text-foreground" />
                        <p className="text-xl font-black tracking-tight">{product.marketedBy.name}</p>
                        <div className="flex gap-3 items-start">
                            <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                            <p className="text-sm text-muted-foreground leading-relaxed">{product.marketedBy.address}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-muted-foreground uppercase tracking-widest">
                        <ShieldCheck className="w-5 h-5" />
                        Compliance Status
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'E-Way Bill Ready', status: 'Enabled' },
                            { label: 'GTIN Verified', status: 'Active' },
                            { label: 'GST Compliant', status: '12% Grade' },
                            { label: 'MSDS Avail.', status: 'Download' }
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-background border rounded-2xl flex flex-col justify-between h-24 hover:border-primary/30 transition-colors">
                                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter leading-tight">{item.label}</span>
                                <span className="text-xs font-bold text-primary">{item.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
