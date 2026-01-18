import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { addDays } from 'date-fns';

const ExpiryMonitor = async () => {
  const supabase = createClient();
  const today = new Date();
  const thirtyDaysFromNow = addDays(today, 30);

  const { data: lots, error } = await supabase
    .from('inventory_lots')
    .select('*, product_variants(*, products(*))')
    .gte('expiry_date', today.toISOString())
    .lte('expiry_date', thirtyDaysFromNow.toISOString())
    .eq('status', 'available');

  if (error) {
    console.error('Error fetching expiring lots:', error);
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Expiry Monitor</h1>
    </div>
  );
};

export default ExpiryMonitor;