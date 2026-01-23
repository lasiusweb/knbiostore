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

  // Agri Attributes
  const [microbialCount, setMicrobialCount] = useState<string>('');
  const [solubility, setSolubility] = useState<string>('');
  const [soilPH, setSoilPH] = useState<string>('');

  // B2B Support
  const [dealerPrice, setDealerPrice] = useState<string>('');
  const [bulkMoq, setBulkMoq] = useState<string>('');

  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const updates: any = {};
      if (price !== '') updates.price = parseFloat(price);
      if (inStock !== undefined) updates.in_stock = inStock;

      const agriAttributes: any = {};
      if (microbialCount !== '') agriAttributes.microbialCount = microbialCount;
      if (solubility !== '') agriAttributes.solubility = solubility;
      if (soilPH !== '') agriAttributes.soilPHRange = soilPH;
      if (Object.keys(agriAttributes).length > 0) updates.agriAttributes = agriAttributes;

      const b2bSupport: any = {};
      if (dealerPrice !== '') b2bSupport.dealerPrice = parseFloat(dealerPrice);
      if (bulkMoq !== '') b2bSupport.bulkMoq = parseInt(bulkMoq);
      if (Object.keys(b2bSupport).length > 0) updates.b2bSupport = b2bSupport;

      const result = await batchUpdateProducts(selectedIds, updates);
      if (result.success) {
        toast({ title: 'Batch Update Success', description: result.message });
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tight">Batch Update {selectedIds.length} Products</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Core Pricing & Stock */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-xl border">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary italic">1. Core Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-[10px] font-bold uppercase">Standard Price (INR)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 150"
                  className="h-10 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase">Stock Visibility</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={inStock === true ? 'default' : 'outline'}
                    onClick={() => setInStock(true)}
                    className="flex-1 h-10 text-[10px] font-bold uppercase"
                  >
                    IN
                  </Button>
                  <Button
                    type="button"
                    variant={inStock === false ? 'default' : 'outline'}
                    onClick={() => setInStock(false)}
                    className="flex-1 h-10 text-[10px] font-bold uppercase"
                  >
                    OUT
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Agri Attributes */}
          <div className="space-y-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary italic">2. Bio-Science Attributes</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase">Microbial Count (CFU)</Label>
                <Input
                  placeholder="e.g. 1x10^9"
                  value={microbialCount}
                  onChange={(e) => setMicrobialCount(e.target.value)}
                  className="h-10 border-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase">Solubility (%)</Label>
                <Input
                  placeholder="e.g. 99%"
                  value={solubility}
                  onChange={(e) => setSolubility(e.target.value)}
                  className="h-10 border-primary/20"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label className="text-[10px] font-bold uppercase">Recommended Soil pH Range</Label>
                <Input
                  placeholder="e.g. 6.5 - 7.5"
                  value={soilPH}
                  onChange={(e) => setSoilPH(e.target.value)}
                  className="h-10 border-primary/20"
                />
              </div>
            </div>
          </div>

          {/* B2B / Wholesale */}
          <div className="space-y-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
            <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 italic">3. Wholesale & B2B</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase">Dealer Net Price</Label>
                <Input
                  type="number"
                  placeholder="e.g. 120"
                  value={dealerPrice}
                  onChange={(e) => setDealerPrice(e.target.value)}
                  className="h-10 border-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase">Bulk MOQ (Qty)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 50"
                  value={bulkMoq}
                  onChange={(e) => setBulkMoq(e.target.value)}
                  className="h-10 border-blue-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-11 font-bold">Discard</Button>
          <Button
            onClick={handleUpdate}
            disabled={isUpdating || (price === '' && inStock === undefined && microbialCount === '' && solubility === '' && soilPH === '' && dealerPrice === '' && bulkMoq === '')}
            className="h-11 px-8 gradient-primary border-0 text-white font-bold transition-all hover:scale-105"
          >
            {isUpdating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Confirm Bulk Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
