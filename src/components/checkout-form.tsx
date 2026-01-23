"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/useCart"
import { db } from "@/lib/db"

const checkoutFormSchema = z.object({
  shippingAddress: z.string().min(1, "Shipping address is required"),
  customerName: z.string().min(1, "Customer name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { cartItems, subtotal, clearCart } = useCart();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: "",
      customerName: "",
      phone: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    setLoading(true);
    try {
      const orderId = `order_${Date.now()}`;

      // 1. Create Order Locally
      await db.orders.add({
        id: orderId,
        created_at: new Date(),
        status: 'PENDING_SYNC',
        total_amount: subtotal
      });

      // 2. Create Order Items Locally
      const orderItems = cartItems.map(item => ({
        id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        order_id: orderId,
        lot_id: 'default_lot', // In real logic, this would be selected based on inventory
        quantity: item.quantity,
        price_at_sale: item.price_at_addition
      }));

      await db.order_items.bulkAdd(orderItems);

      // 3. Clear Cart
      await clearCart();

      toast({
        title: "Order Placed Locally",
        description: `Order #${orderId} saved. It will sync when online.`,
      });

      router.push("/order-confirmation");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to place order locally.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardHeader><CardTitle>Checkout</CardTitle></CardHeader>
        <CardContent>Your cart is empty. Please add items before checking out.</CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>Enter shipping details and review your order.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-medium">Customer Information</h3>
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Village, District" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <h3 className="text-lg font-medium">Order Summary</h3>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>Variant {item.variant_id} x {item.quantity}</span>
                  <span>₹{(item.quantity * item.price_at_addition).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Place Order (Offline Ready)"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}