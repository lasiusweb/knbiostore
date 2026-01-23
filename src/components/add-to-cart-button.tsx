"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/hooks/useCart"

interface AddToCartButtonProps {
  productId: string
  variantId: string
  price: number
}

export function AddToCartButton({ variantId, price }: AddToCartButtonProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [loading, setLoading] = React.useState(false)

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      await addToCart(variantId, price, 1);

      toast({
        title: "Added to cart",
        description: "Your product has been added locally.",
      })
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
    <Button onClick={handleAddToCart} disabled={loading} size="sm">
      {loading ? "Adding..." : "Add to Cart"}
    </Button>
  )
}