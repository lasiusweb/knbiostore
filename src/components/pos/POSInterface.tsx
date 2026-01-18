"use client";

import React from 'react';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';

const POSInterface = () => {
  const { isSyncing } = useOfflineSync();
  const lots = useLiveQuery(() => db.inventory_lots.toArray());

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Point of Sale</h1>
        {isSyncing && (
          <div className="flex items-center text-sm text-blue-500">
            <span className="animate-spin mr-2">🔄</span>
            Syncing...
          </div>
        )}
      </div>
      
      {!lots ? (
        <p>Loading inventory...</p>
      ) : lots.length === 0 ? (
        <p>No inventory available. Please sync data.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Lot cards will go here */}
        </div>
      )}
    </div>
  );
};

export default POSInterface;
