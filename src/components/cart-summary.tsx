"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface CartSummaryProps {
  userId: number // Mock user ID for now
}

export function CartSummary({ userId }: CartSummaryProps) {
  const [itemCount, setItemCount] = React.useState(0)
  const { toast } = useToast()

  React.useEffect(() => {
    const fetchCartSummary = async () => {
      try {
        const response = await fetch(`/api/cart?userId=${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch cart summary")
        }
        const data = await response.json()
        const totalItems = data.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setItemCount(totalItems)
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    fetchCartSummary()
    // Optionally, refresh summary when routing changes or on specific events
    // For a real app, you might use a context/global state for cart status
  }, [userId, toast])

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            {itemCount}
          </span>
        )}
        <span className="sr-only">Cart ({itemCount} items)</span>
      </Link>
    </Button>
  )
}
