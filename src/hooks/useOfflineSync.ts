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
        const { data: products } = await supabase.from('products').select('*');
        
        // Fetch lots
        const { data: lots } = await supabase.from('inventory_lots').select('*').eq('status', 'available');

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
