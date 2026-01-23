"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db, CartItem } from "@/lib/db";
import { calculatePrice } from "@/lib/pricing-engine";
import { useCallback } from "react";

export function useCart(userRole?: string) {
    const cartItems = useLiveQuery(() => db.cart.toArray()) || [];

    const addToCart = useCallback(async (variantId: string, basePrice: number, quantity: number = 1) => {
        const existing = await db.cart.where("variant_id").equals(variantId).first();

        if (existing) {
            await db.cart.update(existing.id!, {
                quantity: existing.quantity + quantity
            });
        } else {
            await db.cart.add({
                variant_id: variantId,
                quantity,
                price_at_addition: basePrice
            });
        }
    }, []);

    const updateQuantity = useCallback(async (id: number, quantity: number) => {
        if (quantity <= 0) {
            await db.cart.delete(id);
        } else {
            await db.cart.update(id, { quantity });
        }
    }, []);

    const removeFromCart = useCallback(async (id: number) => {
        await db.cart.delete(id);
    }, []);

    const clearCart = useCallback(async () => {
        await db.cart.clear();
    }, []);

    const subtotal = cartItems.reduce((acc, item) => {
        // For now, we use the price at addition, but in a real B2B app, 
        // we might re-calculate this based on current context.
        const effectivePrice = calculatePrice({
            variant: { id: item.variant_id, salePrice: item.price_at_addition },
            priceListItems: [], // Mocking for now
            userRole,
            quantity: item.quantity
        });
        return acc + (effectivePrice * item.quantity);
    }, 0);

    return {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        isEmpty: cartItems.length === 0
    };
}
