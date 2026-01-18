"use client";

import React, { useState, useCallback } from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  lot_number: string;
  quantity: number;
  price: number;
  product_name: string;
}

const POSInterface = () => {
  const { isSyncing } = useOfflineSync();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const lots = useLiveQuery(async () => {
    const allLots = await db.inventory_lots.toArray();
    const allProducts = await db.products.toArray();
    
    return allLots.map(lot => {
      const product = allProducts.find(p => p.id === lot.variant_id);
      return {
        ...lot,
        product_name: product?.name || 'Unknown Product',
        sku: 'SKU-' + lot.lot_number,
        price: 100 // Placeholder
      };
    });
  });

  const addToCart = (lot: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === lot.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === lot.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { 
        id: lot.id, 
        lot_number: lot.lot_number, 
        quantity: 1, 
        price: lot.price,
        product_name: lot.product_name
      }];
    });
    setToast(`Added ${lot.product_name} to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      const orderId = crypto.randomUUID();
      const orderObject: any = {
        id: orderId,
        created_at: new Date(),
        status: 'PENDING_SYNC',
        total_amount: calculateTotal(),
        items: cart,
      };

      await db.orders.add(orderObject);
      
      alert('Order Saved Locally');
      setCart([]);
      setShowCart(false);
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to save order locally.');
    }
  };

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Point of Sale</h1>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {totalQuantity > 0 && (
              <Badge className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs">
                {totalQuantity}
              </Badge>
            )}
          </Button>
          {isSyncing && (
            <div className="flex items-center text-sm text-blue-500">
              <span className="animate-spin mr-2">🔄</span>
              Syncing...
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
      
      {!lots ? (
        <p>Loading inventory...</p>
      ) : lots.length === 0 ? (
        <p>No inventory available. Please sync data.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lots.map((lot) => (
            <Card key={lot.id} className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{lot.product_name}</CardTitle>
                <div className="text-sm text-muted-foreground">SKU: {lot.sku}</div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Lot:</span>
                  <span>{lot.lot_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Expires:</span>
                  <span>{lot.expiry_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Stock:</span>
                  <Badge variant={lot.available_quantity < 10 ? "destructive" : "secondary"}>
                    {lot.available_quantity}
                  </Badge>
                </div>
                <div className="text-xl font-bold text-right mt-2">
                  ₹{lot.price}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => addToCart(lot)}>
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Sidebar Cart */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-xl flex flex-col animate-in slide-in-from-right">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingCart className="mr-2" /> Your Cart
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start border-b pb-4">
                    <div className="flex-1">
                      <h3 className="font-bold">{item.product_name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{item.lot_number}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="text-sm text-muted-foreground">× ₹{item.price}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-destructive hover:bg-destructive/10 h-8 mt-1"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <Button 
                className="w-full py-6 text-lg font-bold" 
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POSInterface;