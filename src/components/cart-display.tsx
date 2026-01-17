"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

// Mock Product data to display details in cart
const mockProductDetails = [
  { id: 101, name: "Product A" },
  { id: 102, name: "Product B" },
  { id: 103, name: "Product C" },
];

interface CartItem {
  id: number
  cart_id: number
  product_id: number
  variant_id: number
  quantity: number
  price_at_addition: number
}

interface CartDisplayProps {
  userId: number // Mock user ID for now
}

export function CartDisplay({ userId }: CartDisplayProps) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [updatingItemId, setUpdatingItemId] = React.useState<number | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const fetchCartItems = React.useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/cart?userId=${userId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch cart items")
      }
      const data: CartItem[] = await response.json()
      setCartItems(data)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [userId, toast])

  React.useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return // Prevent quantity from going below 1
    setUpdatingItemId(itemId)
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (!response.ok) {
        throw new Error("Failed to update quantity")
      }

      toast({
        title: "Cart updated",
        description: "Item quantity has been updated.",
        variant: "default",
      })
      fetchCartItems() // Re-fetch cart items to update UI
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUpdatingItemId(null)
    }
  }

  const handleRemoveItem = async (itemId: number) => {
    setUpdatingItemId(itemId) // Use loading state for the specific item being removed
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item")
      }

      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
        variant: "default",
      })
      fetchCartItems() // Re-fetch cart items to update UI
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setUpdatingItemId(null)
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price_at_addition, 0)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>Loading cart...</CardContent>
      </Card>
    )
  }

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
                  <TableCell className="font-medium">{product?.name || `Product ID: ${item.product_id}`}</TableCell>
                  <TableCell>${item.price_at_addition.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updatingItemId === item.id}
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 text-center"
                        disabled={updatingItemId === item.id}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updatingItemId === item.id}
                      >
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${(item.quantity * item.price_at_addition).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={updatingItemId === item.id}
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
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="mt-6 flex justify-end">
          <Button size="lg">Proceed to Checkout</Button>
        </div>
      </CardContent>
    </Card>
  )
}
