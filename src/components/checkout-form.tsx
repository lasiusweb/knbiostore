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
import { getCartByUserId, getCartItems, removeCartItem } from "@/lib/db/carts";

// Define Zod schema for checkout form
const checkoutFormSchema = z.object({
  shippingAddress: z.string().min(1, "Shipping address is required"),
  // paymentInfo: z.object({ // Simplified for now, will be integrated with actual payment gateway
  //   method: z.string().min(1, "Payment method is required"),
  //   token: z.string().optional(),
  // }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
  userId: number; // Mock user ID
}

export function CheckoutForm({ userId }: CheckoutFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [cartId, setCartId] = React.useState<number | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: "",
    },
  });

  const fetchCart = React.useCallback(async () => {
    setLoading(true);
    try {
      const cart = await getCartByUserId(userId);
      if (cart) {
        setCartId(cart.id);
        const items = await getCartItems(cart.id);
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cart details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  React.useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price_at_addition, 0);
  };

  const onSubmit = async (values: CheckoutFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          shippingAddress: values.shippingAddress,
          paymentInfo: { method: "card", token: "mock_token" }, // Simulated payment info
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order.");
      }

      const data = await response.json();
      toast({
        title: "Order Placed!",
        description: `Your order #${data.orderId} has been placed successfully.`,
        variant: "default",
      });
      form.reset();
      setCartItems([]); // Clear cart locally
      router.push("/order-confirmation"); // Redirect to confirmation page
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader><CardTitle>Checkout</CardTitle></CardHeader>
        <CardContent>Loading cart...</CardContent>
      </Card>
    );
  }

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
        <CardDescription>Enter your shipping details and review your order.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-medium">Shipping Information</h3>
            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
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
                  <span>Product ID {item.product_id} x {item.quantity}</span>
                  <span>${(item.quantity * item.price_at_addition).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${getTotalAmount().toFixed(2)}</span>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}