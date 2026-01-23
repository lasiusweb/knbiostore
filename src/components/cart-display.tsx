"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/useCart"

// Mock Product data to display details in cart
const mockProductDetails = [
  { id: 101, name: "Product A" },
  { id: 102, name: "Product B" },
  { id: 103, name: "Product C" },
];

export function CartDisplay({ userRole }: { userRole?: string }) {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart(userRole);
  const { toast } = useToast();
  const router = useRouter();

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>Your cart is empty.</CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Quantity</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => {
              const product = mockProductDetails.find(p => p.id === item.product_id);
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{product?.name || `Product ID: ${item.variant_id}`}</TableCell>
                  <TableCell>₹{item.price_at_addition.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id!, item.quantity - 1)}
                        disabled={item.quantity <= 0}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id!, parseInt(e.target.value))}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id!, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{(item.quantity * item.price_at_addition).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id!)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end space-x-4 text-lg font-bold">
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="mt-6 flex justify-end">
          <Button size="lg" onClick={() => router.push('/checkout')}>Proceed to Checkout</Button>
        </div>
      </CardContent>
    </Card>
  )
}
