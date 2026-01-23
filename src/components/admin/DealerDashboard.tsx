'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Briefcase,
    Users,
    TrendingUp,
    CheckCircle2,
    Clock,
    DollarSign,
    Target,
    ShieldCheck,
    Search,
    Filter,
    ArrowRight,
    Activity
} from 'lucide-react';
import { B2BPriceListEngine } from './B2BPriceListEngine';

export function DealerDashboard() {
    const [searchTerm, setSearchTerm] = useState('');

    const topDealers = [
        { name: 'Kisan Seva Kendra', location: 'Nellore', sales: '₹14.2L', status: 'Compliant', tier: 'Gold' },
        { name: 'Agri-input Traders', location: 'Guntur', sales: '₹11.8L', status: 'Pending Review', tier: 'Silver' },
        { name: 'Green Field Solutions', location: 'Eluru', sales: '₹8.4L', status: 'Compliant', tier: 'Bronze' }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-primary" />
                        Dealer & Distributor Hub
                    </h2>
                    <p className="text-muted-foreground text-sm italic">Enterprise b2b management for authorized retail partners</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-10 font-bold border-dashed border-2">
                        <Users className="w-4 h-4 mr-2" />
                        Bulk Registration
                    </Button>
                    <Button className="h-10 font-bold gradient-primary border-0 text-white">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Register New Dealer
                    </Button>
                </div>
            </div>

            {/* B2B Performance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Active Dealers', val: '284', delta: '+12%', icon: <Users /> },
                    { label: 'Dealer Revenue', val: '₹1.28 Cr', delta: '+24%', icon: <DollarSign /> },
                    { label: 'Avg Order Value', val: '₹42,500', delta: '+5%', icon: <TrendingUp /> },
                    { label: 'Compliance Score', val: '98.2%', delta: 'Steady', icon: <ShieldCheck /> }
                ].map((stat, i) => (
                    <Card key={i} className="border-border/50 shadow-sm relative overflow-hidden group">
                        <div className="absolute -bottom-2 -right-2 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0">
                            {stat.icon}
                        </div>
                        <CardContent className="p-6 pb-4">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black tracking-tighter mt-1">{stat.val}</h3>
                        </CardContent>
                        <div className="px-6 pb-4 flex items-center justify-between text-[10px] font-bold">
                            <span className="text-green-600 flex items-center gap-1">
                                {stat.delta} growth
                            </span>
                            <span className="text-muted-foreground uppercase">vs Last Month</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Differentiated Pricing Engine */}
                <div className="lg:col-span-2">
                    <B2BPriceListEngine />

                    {/* Dealer Search & List */}
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by Dealer Name or Region..."
                                    className="pl-9 h-11 bg-muted/20 border-border/50 shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="h-11 w-11 shrink-0"><Filter className="w-4 h-4" /></Button>
                        </div>

                        <Card className="border-border/50 shadow-sm overflow-hidden">
                            <div className="p-0">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 border-b">
                                        <tr className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                                            <th className="text-left p-4">Distributor</th>
                                            <th className="text-left p-4">Location</th>
                                            <th className="text-right p-4">MTD Sales</th>
                                            <th className="text-center p-4">Status</th>
                                            <th className="text-right p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {topDealers.map((d, i) => (
                                            <tr key={i} className="group hover:bg-primary/5 transition-colors">
                                                <td className="p-4">
                                                    <div>
                                                        <p className="font-bold text-xs">{d.name}</p>
                                                        <Badge variant="outline" className="text-[8px] h-4 mt-1 font-bold uppercase tracking-widest px-1.5 opacity-70 border-primary/20 text-primary">{d.tier} Tier</Badge>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-xs font-medium text-muted-foreground uppercase">{d.location}, AP</td>
                                                <td className="p-4 text-right font-black text-xs text-primary">{d.sales}</td>
                                                <td className="p-4 text-center">
                                                    <Badge className={`text-[8px] font-black uppercase tracking-widest border-0 ${d.status === 'Compliant' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                        {d.status === 'Compliant' ? <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> : <Clock className="w-2.5 h-2.5 mr-1" />}
                                                        {d.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all group-hover:scale-110">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Sidebar: B2B Strategy & Seasonal Targets */}
                <div className="space-y-6">
                    <Card className="border-primary/20 shadow-sm">
                        <CardHeader className="pb-3 border-b">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Target className="w-4 h-4 text-primary" />
                                Seasonal Targets
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase">
                                    <span className="text-muted-foreground">Rabi Season Booking</span>
                                    <span>₹84L / ₹1.5Cr</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: '56%' }} />
                                </div>
                                <p className="text-[10px] text-muted-foreground italic leading-relaxed text-center">Distributors in <span className="text-foreground font-bold italic">Telangana</span> are currently 12% behind target on Bio-NPK pre-booking.</p>
                            </div>

                            <Button className="w-full h-10 gradient-primary border-0 text-white font-black text-[10px] uppercase tracking-widest">Broadcast Dealer Alert</Button>
                        </CardContent>
                    </Card>

                    <Card className="border-blue-500/20 bg-blue-500/5 shadow-sm">
                        <CardHeader className="pb-2 border-b">
                            <CardTitle className="text-xs font-black uppercase tracking-widest text-blue-600 italic">Credit Risk Monitor</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-blue-100">
                                <div className="space-y-0.5">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground font-mono">Total Outstanding</p>
                                    <p className="text-md font-black tracking-tight text-blue-600">₹24.8 Lakhs</p>
                                </div>
                                <Activity className="w-6 h-6 text-blue-200" />
                            </div>
                            <p className="text-[9px] text-muted-foreground leading-relaxed">System has flagged <span className="text-blue-600 font-bold">4 dealers</span> for delayed payments. Auto-reduction of credit limits scheduled for 26th Jan.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
