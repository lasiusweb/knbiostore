"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function B2BCheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');
  
  // New Fields
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('road');
  const [isHomeDelivery, setIsHomeDelivery] = useState(false);
  const [shippingCharges, setShippingCharges] = useState('0');
  const [taxPercent, setTaxPercent] = useState('18');
  const [discountType, setDiscountType] = useState<'percent' | 'amount'>('percent');
  const [discountValue, setDiscountValue] = useState('0');

  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setCartTotal(5000); 
  }, []);

  const calculateSubtotal = () => cartTotal;
  
  const calculateDiscount = () => {
    const val = parseFloat(discountValue) || 0;
    if (discountType === 'percent') {
      return (calculateSubtotal() * val) / 100;
    }
    return val;
  };

  const calculateTax = () => {
    const subtotalAfterDiscount = calculateSubtotal() - calculateDiscount();
    const percent = parseFloat(taxPercent) || 0;
    return (subtotalAfterDiscount * percent) / 100;
  };

  const getFinalTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    const shipping = parseFloat(shippingCharges) || 0;
    return subtotal - discount + tax + shipping;
  };

  const handleCheckout = async () => {
    if (!shippingAddress || !businessName || !billingAddress || !pincode) {
      toast({ title: 'Missing Details', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const finalTotal = getFinalTotal();
      const response = await fetch('/api/checkout/b2b', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          paymentType,
          businessName,
          gstNumber,
          billingAddress,
          shippingAddress,
          pincode,
          shippingMethod,
          isHomeDelivery,
          shippingCharges: parseFloat(shippingCharges) || 0,
          taxAmount: calculateTax(),
          discountAmount: calculateDiscount(),
          subtotalAmount: calculateSubtotal(),
          totalAmount: finalTotal
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
    <div className="container mx-auto py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Enterprise B2B Checkout</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Business Details */}
          <Card>
            <CardHeader><CardTitle>Business & GST Information</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="KN Biosciences Ltd" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gst">GST Number</Label>
                <Input id="gst" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="22AAAAA0000A1Z5" />
              </div>
            </CardContent>
          </Card>

          {/* Address Details */}
          <Card>
            <CardHeader><CardTitle>Address Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="billingAddress">Billing Address *</Label>
                <Input id="billingAddress" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} placeholder="Full billing address" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="shippingAddress">Shipping Address *</Label>
                  <Input id="shippingAddress" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Same as billing or separate" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input id="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="500090" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logistics */}
          <Card>
            <CardHeader><CardTitle>Shipping & Logistics</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Transport Type</Label>
                <Select value={shippingMethod} onValueChange={setShippingMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">Road Transport</SelectItem>
                    <SelectItem value="rail">Railways</SelectItem>
                    <SelectItem value="air">Air Cargo</SelectItem>
                    <SelectItem value="vrl">VRL Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 mt-8">
                <input 
                  type="checkbox" 
                  id="homeDelivery" 
                  checked={isHomeDelivery} 
                  onChange={(e) => setIsHomeDelivery(e.target.checked)} 
                  className="h-4 w-4"
                />
                <Label htmlFor="homeDelivery">Request Home Delivery</Label>
              </div>
            </CardContent>
          </Card>

          {/* Charges & Adjustments (Admin/Internal Context) */}
          <Card>
            <CardHeader><CardTitle>Adjustments & Charges</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Shipping Charges (₹)</Label>
                <Input type="number" value={shippingCharges} onChange={(e) => setShippingCharges(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Tax (GST %)</Label>
                <Input type="number" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Discount</Label>
                <div className="flex gap-1">
                  <Input type="number" className="flex-1" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
                  <Select value={discountType} onValueChange={(v: any) => setDiscountType(v)}>
                    <SelectTrigger className="w-16"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">%</SelectItem>
                      <SelectItem value="amount">₹</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment & Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Payment Option</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                <Button 
                  variant={paymentType === 'full' ? 'default' : 'outline'}
                  onClick={() => setPaymentType('full')}
                  className="w-full"
                >
                  Full Payment
                </Button>
                <Button 
                  variant={paymentType === 'partial' ? 'default' : 'outline'}
                  onClick={() => setPaymentType('partial')}
                  className="w-full"
                >
                  Partial (30% Deposit)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="h-fit border-primary/20 shadow-md">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-sm text-destructive">
                <span>Discount</span>
                <span>-₹{calculateDiscount()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax ({taxPercent}%)</span>
                <span>₹{calculateTax()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>₹{shippingCharges || 0}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl">
                <span>{paymentType === 'partial' ? 'Deposit' : 'Total'}</span>
                <span className="text-primary">
                  ₹{paymentType === 'partial' ? (getFinalTotal() * 0.3).toFixed(2) : getFinalTotal().toFixed(2)}
                </span>
              </div>
              {paymentType === 'partial' && (
                <div className="flex justify-between text-xs text-muted-foreground italic">
                  <span>Credit Balance Due</span>
                  <span>₹{(getFinalTotal() * 0.7).toFixed(2)}</span>
                </div>
              )}
              <Button 
                className="w-full mt-6 gradient-primary" 
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
    </div>
  );
}
