"use client"

import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
    // For demonstration, use a mock userId. In a real app, this would come from authentication.
    const mockUserId = 1; 

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <CheckoutForm userId={mockUserId} />
        </div>
    );
}
