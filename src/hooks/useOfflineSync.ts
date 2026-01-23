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

      // 1. PUSH local changes (Orders)
      const pendingOrders = await db.orders.where('status').equals('PENDING_SYNC').toArray();

      for (const order of pendingOrders) {
        const orderItems = await db.order_items.where('order_id').equals(order.id).toArray();

        // Push order to Supabase
        const { error: orderError } = await supabase.from('orders').insert({
          id: order.id,
          total_amount: order.total_amount,
          status: 'COMPLETED',
          created_at: order.created_at
        });

        if (!orderError) {
          // Push order items
          const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
          if (!itemsError) {
            await db.orders.update(order.id, { status: 'COMPLETED' });
          }
        }
      }

      // 2. PULL updates (Products, Lots)
      const { data: products, error: productsError } = await supabase.from('products').select('*');
      if (productsError) throw productsError;

      const { data: lots, error: lotsError } = await supabase.from('inventory_lots').select('*').eq('status', 'available');
      if (lotsError) throw lotsError;

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
