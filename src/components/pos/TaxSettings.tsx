'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Plus,
    Trash2,
    ShieldCheck,
    Info,
    Save,
    Settings2
} from 'lucide-react';
import { TaxGroup } from '@/lib/types/pos-types';

export function TaxSettings() {
    const [taxGroups, setTaxGroups] = useState<TaxGroup[]>([
        {
            id: '1',
            name: 'GST12 (Intra-state)',
            description: 'Standard 12% GST for biopesticides within Telangana',
            rates: [
                { id: 'r1', name: 'CGST', percentage: 6 },
                { id: 'r2', name: 'SGST', percentage: 6 }
            ],
            isDefault: true
        },
        {
            id: '2',
            name: 'GST12 (Inter-state)',
            description: 'Standard 12% IGST for out-of-state sales',
            rates: [
                { id: 'r3', name: 'IGST', percentage: 12 }
            ],
            isDefault: false
        }
    ]);

    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');

    const addTaxGroup = () => {
        if (!newName) return;
        const newGroup: TaxGroup = {
            id: Math.random().toString(36).substr(2, 9),
            name: newName,
            rates: [],
            isDefault: false
        };
        setTaxGroups([...taxGroups, newGroup]);
        setNewName('');
        setIsAdding(false);
    };

    const deleteGroup = (id: string) => {
        setTaxGroups(taxGroups.filter(g => g.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Tax Settings</h2>
                    <p className="text-muted-foreground">Manage GST groups and default tax preferences</p>
                </div>
                <Button onClick={() => setIsAdding(true)} className="gradient-primary border-0 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Tax Group
                </Button>
            </div>

            {isAdding && (
                <Card className="border-primary/20 animate-slide-up">
                    <CardHeader>
                        <CardTitle className="text-lg">Create New Tax Group</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Group Name</label>
                            <Input
                                placeholder="e.g., GST5 (Intra-state)"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                            <Button onClick={addTaxGroup} className="gradient-primary">Create</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {taxGroups.map((group) => (
                    <Card key={group.id} className="hover:border-primary/30 transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-xl">{group.name}</CardTitle>
                                        {group.isDefault && (
                                            <Badge className="bg-primary/10 text-primary border-primary/20">Default</Badge>
                                        )}
                                    </div>
                                    <CardDescription>{group.description}</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="hover:text-destructive" onClick={() => deleteGroup(group.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <div className="grid grid-cols-2 text-sm font-medium text-muted-foreground mb-2">
                                        <span>Tax Component</span>
                                        <span className="text-right">Rate (%)</span>
                                    </div>
                                    <div className="space-y-2">
                                        {group.rates.map(rate => (
                                            <div key={rate.id} className="grid grid-cols-2 text-sm border-t border-border/50 pt-2">
                                                <span>{rate.name}</span>
                                                <span className="text-right font-bold">{rate.percentage}%</span>
                                            </div>
                                        ))}
                                        <div className="grid grid-cols-2 text-sm border-t-2 border-primary/20 pt-2 font-bold text-foreground">
                                            <span>Total Tax Rate</span>
                                            <span className="text-right text-primary">
                                                {group.rates.reduce((sum, r) => sum + r.percentage, 0)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10">
                                    <Info className="w-4 h-4 text-primary" />
                                    <span>This group will be available in the billing module for Telenana state transactions.</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Default Preference Section */}
            <Card className="border-border/50">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Settings2 className="w-5 h-5 text-primary" />
                        <CardTitle>Global Tax Preferences</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Intra-state Transactions</label>
                            <select className="w-full h-10 px-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-none">
                                <option>GST12 (Intra-state)</option>
                                <option>GST5 (Intra-state)</option>
                                <option>Exempted</option>
                            </select>
                            <p className="text-xs text-muted-foreground">Applied to sales within Telangana</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Inter-state Transactions</label>
                            <select className="w-full h-10 px-3 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary outline-none">
                                <option>GST12 (Inter-state)</option>
                                <option>GST5 (Inter-state)</option>
                                <option>Exempted</option>
                            </select>
                            <p className="text-xs text-muted-foreground">Applied to sales to other 17 states</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t">
                        <Button className="gradient-primary border-0 text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save Preferences
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                            <ShieldCheck className="w-4 h-4" />
                            GST Compliance Verified
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
