"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function B2BCheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');
  const [address, setAddress] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Simple fetch for total (mock logic for now as per project standard)
    setCartTotal(5000); // Assume a B2B bulk total
  }, []);

  const handleCheckout = async () => {
    if (!address) {
      toast({ title: 'Missing Address', description: 'Please enter a shipping address.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const response = await fetch('/api/checkout/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress: address,
          paymentType
        })
      });

      const data = await response.json();
      if (response.ok) {
        toast({ 
          title: 'Order Placed!', 
          description: `Order #${data.orderId} created. Amount paid: ₹${data.amountPaid}. Balance: ₹${data.balanceDue}`
        });
        router.push('/order-confirmation');
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      const err = error as Error;
      toast({ title: 'Checkout Failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Enterprise B2B Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Shipping Details</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor="address">Warehouse/Shipping Address</Label>
                <Input 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Enter full address"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Payment Option</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button 
                  variant={paymentType === 'full' ? 'default' : 'outline'}
                  onClick={() => setPaymentType('full')}
                  className="flex-1"
                >
                  Full Payment
                </Button>
                <Button 
                  variant={paymentType === 'partial' ? 'default' : 'outline'}
                  onClick={() => setPaymentType('partial')}
                  className="flex-1"
                >
                  Partial (30% Deposit)
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {paymentType === 'partial' 
                  ? "You will pay 30% now. The remaining balance will be handled via your distributor credit line."
                  : "Pay the full amount now via secure gateway."}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>{paymentType === 'partial' ? 'Amount Due Now' : 'Total'}</span>
              <span className="text-primary">
                ₹{paymentType === 'partial' ? cartTotal * 0.3 : cartTotal}
              </span>
            </div>
            {paymentType === 'partial' && (
              <div className="flex justify-between text-muted-foreground italic">
                <span>Balance Due Later</span>
                <span>₹{cartTotal * 0.7}</span>
              </div>
            )}
            <Button 
              className="w-full mt-4" 
              size="lg" 
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm & Place Order"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
