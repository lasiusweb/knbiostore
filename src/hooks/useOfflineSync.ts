"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { db } from '@/lib/db';

export function useOfflineSync() {
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const syncData = async () => {
      setIsSyncing(true);
      try {
        const supabase = createClient();
        
        // Fetch products
        const { data: products, error: productsError } = await supabase.from('products').select('*');
        if (productsError) throw productsError;
        
        // Fetch lots
        const { data: lots, error: lotsError } = await supabase.from('inventory_lots').select('*').eq('status', 'available');
        if (lotsError) throw lotsError;

        // Save locally
        if (products) await db.products.bulkPut(products);
        if (lots) await db.inventory_lots.bulkPut(lots);

      } catch (error) {
        console.error('Sync failed:', error);
      } finally {
        setIsSyncing(false);
      }
    };

    syncData();
  }, []);

  return { isSyncing };
}