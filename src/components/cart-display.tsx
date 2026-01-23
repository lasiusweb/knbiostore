"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/useCart"
import { MOCK_PRODUCTS } from "@/data/mock-products"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

export function CartDisplay({ userRole }: { userRole?: string }) {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart(userRole);
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
    toast({
      title: "Cart updated",
      description: "Item quantity has been updated.",
    });
  };

  const handleRemoveItem = async (itemId: number) => {
    await removeFromCart(itemId);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      variant: "destructive",
    });
  };

  if (cartItems.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-muted-foreground opacity-20" />
          </div>
          <CardTitle className="text-xl font-black uppercase tracking-tight mb-2">Your Cart is Empty</CardTitle>
          <p className="text-muted-foreground text-sm mb-6">Looks like you haven&apos;t added any products yet.</p>
          <Button onClick={() => router.push('/store')} className="gradient-primary border-0 text-white font-bold">
            Start Shopping
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl border-border/50 shadow-xl overflow-hidden">
      <CardHeader className="bg-muted/20 border-b">
        <CardTitle className="text-2xl font-black tracking-tight">Shopping Cart</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/10">
            <TableRow>
              <TableHead className="font-bold py-4">Product Details</TableHead>
              <TableHead className="font-bold text-center">Quantity</TableHead>
              <TableHead className="font-bold text-right">Unit Price</TableHead>
              <TableHead className="font-bold text-right">Subtotal</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => {
              // Try to find the product in our mock data using variant_id
              // In this app, variant_id often maps to product id or slug
              const product = MOCK_PRODUCTS.find(p => p.id === item.variant_id);

              return (
                <TableRow key={item.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell className="py-6">
                    <div>
                      <h4 className="font-black text-sm tracking-tight">{product?.productName || `Variant: ${item.variant_id}`}</h4>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                        {product?.brandName || "KN Bio Sciences"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-muted/50 hover:bg-muted"
                        onClick={() => handleUpdateQuantity(item.id!, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-sm font-black">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg bg-muted/50 hover:bg-muted"
                        onClick={() => handleUpdateQuantity(item.id!, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ₹{item.price_at_addition.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-black text-primary">
                    ₹{(item.quantity * item.price_at_addition).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveItem(item.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        <div className="p-8 bg-muted/10 border-t flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4 w-full md:w-auto">
            <Button variant="outline" onClick={() => router.push('/store')} className="font-bold flex-1">
              Continue Shopping
            </Button>
          </div>

          <div className="w-full md:w-80 space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted-foreground">Order Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-muted-foreground">Tax (Calculated at checkout)</span>
              <span className="italic text-xs">GST Applicable</span>
            </div>
            <div className="h-[1px] bg-border/50 w-full" />
            <div className="flex justify-between items-end">
              <span className="text-lg font-black uppercase tracking-tighter">Grand Total</span>
              <span className="text-3xl font-black text-primary font-mono tracking-tighter">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <Button size="lg" className="w-full gradient-primary border-0 text-white font-black h-14 text-lg shadow-xl shadow-primary/20" onClick={() => router.push('/checkout')}>
              Checkout Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
