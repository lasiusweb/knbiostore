'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    HelpCircle,
    Plus,
    Trash2,
    MessageSquare,
    Sprout,
    ShieldCheck,
    Container,
    Info
} from 'lucide-react';
import { ProductFAQ } from '@/lib/types/product-types';

interface ProductFAQManagerProps {
    productId: string;
    initialFaqs?: ProductFAQ[];
    onSave?: (faqs: ProductFAQ[]) => void;
}

export function ProductFAQManager({ productId, initialFaqs = [], onSave }: ProductFAQManagerProps) {
    const [faqs, setFaqs] = useState<ProductFAQ[]>(initialFaqs);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [newCategory, setNewCategory] = useState<ProductFAQ['category']>('APPLICATION');

    const categories: { value: ProductFAQ['category']; label: string; icon: any; color: string }[] = [
        { value: 'APPLICATION', label: 'Application', icon: <Sprout className="w-3 h-3" />, color: 'bg-green-100 text-green-700' },
        { value: 'SAFETY', label: 'Safety', icon: <ShieldCheck className="w-3 h-3" />, color: 'bg-red-100 text-red-700' },
        { value: 'STORAGE', label: 'Storage', icon: <Container className="w-3 h-3" />, color: 'bg-blue-100 text-blue-700' },
        { value: 'GENERAL', label: 'General', icon: <Info className="w-3 h-3" />, color: 'bg-muted text-muted-foreground' }
    ];

    const addFaq = () => {
        if (!newQuestion || !newAnswer) return;
        const updated = [...faqs, { question: newQuestion, answer: newAnswer, category: newCategory }];
        setFaqs(updated);
        setNewQuestion('');
        setNewAnswer('');
        onSave?.(updated);
    };

    const removeFaq = (index: number) => {
        const updated = faqs.filter((_, i) => i !== index);
        setFaqs(updated);
        onSave?.(updated);
    };

    return (
        <Card className="border-border/50 shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Product Technical FAQ</CardTitle>
                        <CardDescription>Structured guidance for farmers and field agents</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.length > 0 ? faqs.map((faq, idx) => (
                        <div key={idx} className="p-4 rounded-xl border bg-background group transition-all hover:border-primary/30">
                            <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Badge className={`h-5 text-[9px] font-black uppercase tracking-widest border-0 ${categories.find(c => c.value === faq.category)?.color}`}>
                                            {faq.category}
                                        </Badge>
                                        <span className="text-xs font-black text-foreground">{faq.question}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => removeFaq(idx)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center border-2 border-dashed rounded-2xl">
                            <MessageSquare className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">No Technical Guidance Added</p>
                        </div>
                    )}
                </div>

                {/* Add New FAQ Form */}
                <div className="p-4 rounded-xl bg-muted/30 border border-dashed space-y-4">
                    <div className="grid grid-cols-4 gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                type="button"
                                className={`flex items-center justify-center gap-2 p-2 rounded-lg border text-[10px] font-bold uppercase transition-all ${newCategory === cat.value ? 'bg-primary text-white border-primary' : 'bg-background hover:bg-muted'}`}
                                onClick={() => setNewCategory(cat.value)}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-3">
                        <Input
                            placeholder="Agronomy Question (e.g. Can this be mixed with pesticides?)"
                            className="h-10 text-xs font-bold"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                        />
                        <textarea
                            placeholder="Technical Answer..."
                            className="w-full p-3 rounded-lg border border-input bg-background text-xs min-h-[80px] focus:ring-2 focus:ring-primary outline-none transition-all"
                            value={newAnswer}
                            onChange={(e) => setNewAnswer(e.target.value)}
                        />
                        <Button
                            className="w-full h-10 gradient-primary border-0 text-white font-bold text-xs uppercase tracking-widest"
                            onClick={addFaq}
                            disabled={!newQuestion || !newAnswer}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Technical FAQ
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
