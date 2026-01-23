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
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, Ticket } from 'lucide-react';

export default function B2BCheckoutPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<'full' | 'partial'>('full');
  
  // Step 1: Business & Contact
  const [businessName, setBusinessName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [contactName1, setContactName1] = useState('');
  const [contactPhone1, setContactNamePhone1] = useState('');
  const [contactName2, setContactName2] = useState('');
  const [contactPhone2, setContactNamePhone2] = useState('');

  // Step 2: Address & Logistics
  const [billingAddress, setBillingAddress] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('road');
  const [isHomeDelivery, setIsHomeDelivery] = useState(false);

  // Step 3: Payment & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);

  const [cartTotal, setCartTotal] = useState(0);
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    setCartTotal(5000); 
  }, []);

  const calculateSubtotal = () => cartTotal;
  const calculateTax = () => (calculateSubtotal() - appliedDiscount) * 0.18; // Default 18% GST
  const calculateShipping = () => 0; // Handled by admin later or fixed logic

  const getFinalTotal = () => {
    return calculateSubtotal() - appliedDiscount + calculateTax() + calculateShipping();
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsVerifyingCoupon(true);
    try {
      // Simulate coupon check
      if (couponCode.toUpperCase() === 'WELCOME10') {
        setAppliedDiscount(calculateSubtotal() * 0.1);
        toast({ title: 'Coupon Applied!', description: '10% discount added.' });
      } else {
        toast({ title: 'Invalid Coupon', description: 'This code does not exist.', variant: 'destructive' });
      }
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const handleCheckout = async () => {
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
          contactDetails: {
            contact1: { name: contactName1, phone: contactPhone1 },
            contact2: { name: contactName2, phone: contactPhone2 }
          },
          taxAmount: calculateTax(),
          discountAmount: appliedDiscount,
          subtotalAmount: calculateSubtotal(),
          totalAmount: finalTotal
        })
      });

      const data = await response.json();
      if (response.ok) {
        toast({ title: 'Order Placed!', description: `Order #${data.orderId} created.` });
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

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8 space-x-4">
      {[1, 2, 3].map((i) => (
        <React.Fragment key={i}>
          <div className="flex items-center space-x-2">
            {step > i ? (
              <CheckCircle2 className="w-6 h-6 text-primary" />
            ) : step === i ? (
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">{i}</div>
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground" />
            )}
            <span className={`text-sm font-medium ${step === i ? 'text-primary' : 'text-muted-foreground'}`}>
              {i === 1 ? 'Business' : i === 2 ? 'Logistics' : 'Payment'}
            </span>
          </div>
          {i < 3 && <div className="w-12 h-px bg-muted" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <h1 className="text-3xl font-bold mb-4 text-center">B2B Order Checkout</h1>
      <StepIndicator />
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader><CardTitle>Business & GST Information</CardTitle></CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Business Name *</Label>
                    <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="KN Biosciences Ltd" />
                  </div>
                  <div className="grid gap-2">
                    <Label>GST Number</Label>
                    <Input value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} placeholder="22AAAAA0000A1Z5" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Contact Persons</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Primary Contact Name *</Label>
                      <Input value={contactName1} onChange={(e) => setContactName1(e.target.value)} placeholder="Name" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Primary Phone *</Label>
                      <Input value={contactPhone1} onChange={(e) => setContactNamePhone1(e.target.value)} placeholder="Phone" />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Secondary Contact Name</Label>
                      <Input value={contactName2} onChange={(e) => setContactName2(e.target.value)} placeholder="Name" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Secondary Phone</Label>
                      <Input value={contactPhone2} onChange={(e) => setContactNamePhone2(e.target.value)} placeholder="Phone" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end">
                <Button onClick={nextStep} disabled={!businessName || !contactName1 || !contactPhone1}>
                  Next: Logistics <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader><CardTitle>Address Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label>Billing Address *</Label>
                    <Input value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} placeholder="Full billing address" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Shipping Address *</Label>
                      <Input value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} placeholder="Delivery destination" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Pincode *</Label>
                      <Input value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="500090" />
                    </div>
                  </div>
                </CardContent>
              </Card>

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
              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button onClick={nextStep} disabled={!billingAddress || !shippingAddress || !pincode}>
                  Next: Payment <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader><CardTitle>Payment Selection</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant={paymentType === 'full' ? 'default' : 'outline'}
                      onClick={() => setPaymentType('full')}
                      className="w-full justify-between h-16 px-6"
                    >
                      <span className="font-bold">Full Payment</span>
                      <span>₹{getFinalTotal().toFixed(2)}</span>
                    </Button>
                    <Button 
                      variant={paymentType === 'partial' ? 'default' : 'outline'}
                      onClick={() => setPaymentType('partial')}
                      className="w-full justify-between h-16 px-6"
                    >
                      <div className="text-left">
                        <div className="font-bold">Partial (30% Deposit)</div>
                        <div className="text-xs font-normal">Credit terms for remaining balance</div>
                      </div>
                      <span>₹{(getFinalTotal() * 0.3).toFixed(2)}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Promotions</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        className="pl-9" 
                        placeholder="Enter coupon code" 
                        value={couponCode} 
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                    </div>
                    <Button variant="secondary" onClick={handleApplyCoupon} disabled={isVerifyingCoupon || !couponCode}>
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  <ArrowLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button className="gradient-primary" onClick={handleCheckout} disabled={loading}>
                  {loading ? "Processing..." : "Confirm & Place Order"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Summary */}
        <div className="space-y-6">
          <Card className="h-fit sticky top-24 border-primary/20 shadow-lg">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Items Subtotal</span>
                <span>₹{calculateSubtotal()}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-sm text-destructive">
                  <span>Coupon Discount</span>
                  <span>-₹{appliedDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Tax (GST 18%)</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl text-primary">
                <span>Total</span>
                <span>₹{getFinalTotal().toFixed(2)}</span>
              </div>
              {paymentType === 'partial' && (
                <div className="bg-primary/5 p-3 rounded-md mt-4">
                  <div className="flex justify-between font-bold text-sm">
                    <span>Amount Due Now</span>
                    <span>₹{(getFinalTotal() * 0.3).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Credit Balance</span>
                    <span>₹{(getFinalTotal() * 0.7).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}