"use client";

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { db } from '@/lib/db';

export function useOfflineSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncData = useCallback(async () => {
    setIsSyncing(true);
    setError(null);
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
      setError('Synchronization failed.');
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    syncData();
  }, [syncData]);

  return { isSyncing, error, refetchData: syncData };
}
