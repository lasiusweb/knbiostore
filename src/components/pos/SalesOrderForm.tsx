'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    ShoppingCart,
    User,
    Calendar,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ClipboardList,
    CheckCircle2
} from 'lucide-react';
import { MOCK_PRODUCTS } from '@/data/mock-products';

interface CartItem {
    id: string;
    productName: string;
    price: number;
    quantity: number;
}

export function SalesOrderForm() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [isPreBooking, setIsPreBooking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const addToCart = (product: typeof MOCK_PRODUCTS[0]) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, {
                id: product.id,
                productName: product.productName,
                price: product.salePrice,
                quantity: 1
            }]);
        }
        setSearchQuery('');
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        console.log('Order Submitted:', {
            customer: customerName,
            items: cart,
            total,
            isPreBooking,
            status: 'CONFIRMED',
            timestamp: new Date().toISOString()
        });

        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            setCart([]);
            setCustomerName('');
        }, 3000);
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Left Column: Product Selection */}
            <div className="space-y-6">
                <Card className="border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg">POS Item Search</CardTitle>
                        <div className="pt-2 relative">
                            <Input
                                placeholder="Scan barcode or type name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-12 pl-4 pr-10 rounded-xl"
                            />
                            <ShoppingCart className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {searchQuery && filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group"
                                onClick={() => addToCart(product)}
                            >
                                <div>
                                    <h4 className="font-bold text-sm tracking-tight">{product.productName}</h4>
                                    <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">{product.sku}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-primary">₹{product.salePrice}</span>
                                    <Plus className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        ))}
                        {!searchQuery && (
                            <div className="text-center py-12 text-muted-foreground">
                                <ClipboardList className="w-10 h-10 mx-auto mb-2 opacity-20" />
                                <p className="text-xs uppercase tracking-widest font-bold">Awaiting Input...</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Customer Quick Capture */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            Customer Association
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            placeholder="Mobile Number or Farmer ID..."
                            className="bg-background"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Checkout Summary */}
            <div className="space-y-6">
                <Card className="border-border/50 shadow-xl relative overflow-hidden flex flex-col h-full min-h-[500px]">
                    <CardHeader className="border-b bg-muted/20">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Checkout Summary</CardTitle>
                            <Badge variant={isPreBooking ? 'destructive' : 'secondary'} className="uppercase text-[10px] tracking-widest font-bold">
                                {isPreBooking ? 'Pre-Booking' : 'Standard Sale'}
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-0">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
                                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                    <ShoppingCart className="w-8 h-8 opacity-20" />
                                </div>
                                <p className="font-bold uppercase tracking-widest text-xs">Cart is empty</p>
                                <p className="text-[10px] mt-1">Ready to sync with terminalLogs...</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-border/50">
                                {cart.map((item) => (
                                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold truncate max-w-[200px]">{item.productName}</h4>
                                            <p className="text-xs text-primary font-bold">₹{item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center bg-muted rounded-lg p-1">
                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3 h-3" /></Button>
                                                <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3 h-3" /></Button>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="border-t bg-muted/5 p-6 flex flex-col gap-4">
                        <div className="w-full space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-mono">₹{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">GST (Included)</span>
                                <span className="font-mono">₹{(total * 0.12).toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-black uppercase tracking-tighter">Total Amount</span>
                                <span className="text-3xl font-black text-primary font-mono tracking-tighter">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full">
                            <Button
                                variant="outline"
                                className={`flex-1 font-bold ${isPreBooking ? 'border-primary text-primary' : ''}`}
                                onClick={() => setIsPreBooking(!isPreBooking)}
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Pre-Booking
                            </Button>
                            <Button
                                className="flex-[2] gradient-primary border-0 text-white font-bold h-12 relative group"
                                disabled={cart.length === 0 || isSuccess}
                                onClick={handleSubmit}
                            >
                                {isSuccess ? (
                                    <span className="flex items-center gap-2 animate-fade-in">
                                        <CheckCircle2 className="w-5 h-5" />
                                        Transaction Logged!
                                    </span>
                                ) : (
                                    <>
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        {isPreBooking ? 'Confirm Pre-Booking' : 'Complete Sale'}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

function Separator() {
    return <div className="h-[1px] bg-border/50 w-full" />;
}
