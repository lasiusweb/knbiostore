"use client";

import React, { useState } from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const POSInterface = () => {
  const { isSyncing } = useOfflineSync();
  const [cart, setCart] = useState<any[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const lots = useLiveQuery(async () => {
    const allLots = await db.inventory_lots.toArray();
    const allProducts = await db.products.toArray();
    
    // In a real app, variants would also be here. 
    // For now we map products to lots via variant_id or just assume product match.
    return allLots.map(lot => {
      const product = allProducts.find(p => p.id === lot.variant_id); // Simplified mapping
      return {
        ...lot,
        product_name: product?.name || 'Unknown Product',
        sku: 'SKU-' + lot.lot_number, // Placeholder
        price: 100 // Placeholder
      };
    });
  });

  const addToCart = (lot: any) => {
    setCart([...cart, lot]);
    setToast(`Added ${lot.product_name} (${lot.lot_number}) to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Point of Sale</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline">Cart: {cart.length}</Badge>
          {isSyncing && (
            <div className="flex items-center text-sm text-blue-500">
              <span className="animate-spin mr-2">🔄</span>
              Syncing...
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
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
    </div>
  );
};

export default POSInterface;