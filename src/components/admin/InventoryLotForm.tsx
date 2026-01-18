"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const InventoryLotForm = () => {
  const [variants, setVariants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const supabase = createClient();
        const { data, error: fetchError } = await supabase
          .from('product_variants')
          .select('*, products(name)');

        if (fetchError) throw fetchError;
        setVariants(data || []);
      } catch (err: any) {
        console.error('Error fetching variants:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Add New Inventory Lot</h1>
      {loading && <p>Loading variants...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default InventoryLotForm;