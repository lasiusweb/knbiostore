"use client"

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { batchUpdateProducts } from "@/actions/bulk-actions"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react'

interface BatchEditDialogProps {
  selectedIds: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function BatchEditDialog({ selectedIds, isOpen, onOpenChange, onSuccess }: BatchEditDialogProps) {
  const [price, setPrice] = useState<string>('');
  const [inStock, setInStock] = useState<boolean | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const updates: { price?: number; in_stock?: boolean } = {};
      if (price !== '') updates.price = parseFloat(price);
      if (inStock !== undefined) updates.in_stock = inStock;

      const result = await batchUpdateProducts(selectedIds, updates);
      if (result.success) {
        toast({ title: 'Update Successful', description: result.message });
        onSuccess();
        onOpenChange(false);
      } else {
        toast({ title: 'Update Failed', description: result.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Batch Update {selectedIds.length} Products</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="price">New Price (Leave blank to keep current)</Label>
            <Input 
              id="price" 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="e.g. 150"
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Stock Status</Label>
            <div className="flex gap-4">
              <Button 
                type="button"
                variant={inStock === true ? 'default' : 'outline'} 
                onClick={() => setInStock(true)}
                className="flex-1"
              >
                In Stock
              </Button>
              <Button 
                type="button"
                variant={inStock === false ? 'default' : 'outline'} 
                onClick={() => setInStock(false)}
                className="flex-1"
              >
                Out of Stock
              </Button>
              <Button 
                type="button"
                variant={inStock === undefined ? 'default' : 'outline'} 
                onClick={() => setInStock(undefined)}
                className="flex-1"
              >
                No Change
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleUpdate} disabled={isUpdating || (price === '' && inStock === undefined)}>
            {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Apply Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
