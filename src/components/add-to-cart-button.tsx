"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface AddToCartButtonProps {
  productId: number
  variantId: number // Assuming a default variant for now, or allow selection
  price: number // Price at the time of adding
  userId: number // Mock user ID for now
}

export function AddToCartButton({ productId, variantId, price, userId }: AddToCartButtonProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId,
          variantId,
          quantity: 1, // Always add 1 for now
          priceAtAddition: price,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to add item to cart")
      }

      toast({
        title: "Item added to cart",
        description: "Your product has been added to the shopping cart.",
        variant: "default",
      })
      router.refresh() // To re-fetch cart data if summary is displayed
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleAddToCart} disabled={loading}>
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}