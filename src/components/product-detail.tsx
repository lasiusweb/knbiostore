"use client"

import * as React from "react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductDetailProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    imageUrl?: string
    variants: Array<{
      id: number
      sku: string
      price: number
      weight_value: number
      weight_unit: string
      packing_type: string
      form_type: string
    }>
  }
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = React.useState(product.variants[0]?.id)

  const currentVariant = product.variants.find(
    (variant) => variant.id === selectedVariant
  )

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative h-96 w-full">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            ) : (
              <div className="flex h-full items-center justify-center rounded-md bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-gray-900">
              ${currentVariant?.price.toFixed(2)}
            </h2>
            <Separator />
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Variant</p>
                <Select
                  value={selectedVariant?.toString()}
                  onValueChange={(value) => setSelectedVariant(Number(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id.toString()}>
                        {variant.sku} - {variant.weight_value} {variant.weight_unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">Add to Cart</Button>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>SKU:</strong> {currentVariant?.sku}
              </p>
              <p>
                <strong>Weight:</strong> {currentVariant?.weight_value}{" "}
                {currentVariant?.weight_unit}
              </p>
              <p>
                <strong>Packing:</strong> {currentVariant?.packing_type}
              </p>
              <p>
                <strong>Form:</strong> {currentVariant?.form_type}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
