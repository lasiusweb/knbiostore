import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { addDays, format, differenceInDays, isBefore } from 'date-fns';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

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
      
      {!lots || lots.length === 0 ? (
        <p>No items expiring soon</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Lot Number</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Available Qty</TableHead>
              <TableHead>Days Left</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lots.map((lot) => {
              const expiryDate = new Date(lot.expiry_date);
              const daysLeft = differenceInDays(expiryDate, today);
              const isExpired = isBefore(expiryDate, today);

              return (
                <TableRow key={lot.id}>
                  <TableCell>{lot.product_variants?.products?.name || 'N/A'}</TableCell>
                  <TableCell>{lot.product_variants?.sku || 'N/A'}</TableCell>
                  <TableCell>{lot.lot_number}</TableCell>
                  <TableCell>{format(expiryDate, 'PP')}</TableCell>
                  <TableCell>{lot.available_quantity}</TableCell>
                  <TableCell>
                    {isExpired ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      <Badge variant={daysLeft < 7 ? "destructive" : daysLeft < 15 ? "secondary" : "default"}>
                        {daysLeft} days
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ExpiryMonitor;
