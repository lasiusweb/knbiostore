'use server'

import { createClient } from '@/lib/supabase/client'
import { revalidatePath } from 'next/cache'

export async function createPOSOrder(orderData: any) {
    const supabase = createClient()

    try {
        // 1. Create the Order in Supabase
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: null, // POS orders are usually generic or assigned to a staff user
                status: 'paid', // Assuming POS orders are paid immediately
                grand_total: orderData.total_amount,
                shipping_method: 'pickup', // POS default
                internal_notes: 'Created via Offline POS',
            })
            .select()
            .single()

        if (orderError) throw new Error(orderError.message)

        // 2. Create Order Items
        const itemsToInsert = orderData.items.map((item: any) => ({
            order_id: order.id,
            product_name: item.lot_number, // Simplified for POS
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(itemsToInsert)

        if (itemsError) throw new Error(itemsError.message)

        return { success: true }

    } catch (error: any) {
        console.error("Sync Error:", error)
        return { success: false, message: error.message }
    }
}