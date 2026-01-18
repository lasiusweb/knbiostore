'use server'

import { createClient } from '@/lib/supabase/client'
import { revalidatePath } from 'next/cache'

export async function createLot(formData: any) {
    const supabase = createClient()

    try {
        // Insert into inventory_lots
        const { error } = await supabase
            .from('inventory_lots')
            .insert({
                variant_id: formData.variant_id,
                lot_number: formData.lot_number,
                manufacture_date: formData.manufacture_date,
                expiry_date: formData.expiry_date,
                initial_quantity: formData.initial_quantity,
                available_quantity: formData.initial_quantity, // Initially, available = initial
                warehouse_location: formData.warehouse_location,
                status: 'available'
            })

        if (error) throw new Error(error.message)

        revalidatePath('/admin/inventory')

        return { success: true, message: 'Lot added successfully!' }

    } catch (error: any) {
        return { success: false, message: error.message || 'Error creating lot' }
    }
}