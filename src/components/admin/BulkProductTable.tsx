"use client"

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BatchEditDialog } from './BatchEditDialog';

export interface BulkProduct {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  product_variants?: Array<{
    sku: string;
    price: number;
  }>;
}

export interface BulkProductTableProps {
  products: BulkProduct[];
}

export function BulkProductTable({ products }: BulkProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBatchEditDialogOpen, setIsBatchEditDialogOpen] = useState(false);

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const handleBatchUpdateSuccess = () => {
    setSelectedIds([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
        <span className="font-medium">{selectedIds.length} products selected</span>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            disabled={selectedIds.length === 0}
            onClick={() => setIsBatchEditDialogOpen(true)}
          >
            Edit Selected
          </Button>
          <Button variant="destructive" size="sm" disabled={selectedIds.length === 0}>
            Delete Selected
          </Button>
        </div>
      </div>

      <BatchEditDialog 
        selectedIds={selectedIds}
        isOpen={isBatchEditDialogOpen}
        onOpenChange={setIsBatchEditDialogOpen}
        onSuccess={handleBatchUpdateSuccess}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <input 
                type="checkbox" 
                checked={selectedIds.length === products.length && products.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-gray-300"
              />
            </TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price (INR)</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className={selectedIds.includes(product.id) ? 'bg-muted/50' : ''}>
              <TableCell>
                <input 
                  type="checkbox" 
                  checked={selectedIds.includes(product.id)}
                  onChange={() => toggleSelect(product.id)}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.product_variants?.[0]?.sku || 'N/A'}
              </TableCell>
              <TableCell>
                {product.product_variants?.[0]?.price || 'N/A'}
              </TableCell>
              <TableCell className="flex flex-wrap gap-1">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))
                ) : (
                  'No Tags'
                )}
              </TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
