"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    imageUrl?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <Link href={`/products/${product.id}`} className="relative h-48 w-full overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </Link>
      <CardHeader>
        <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between p-4">
        <p className="mb-4 text-2xl font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <Button asChild>
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
