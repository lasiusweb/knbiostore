"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
    // In a real application, you might fetch order details using a query parameter
    // like orderId from the URL (e.g., /order-confirmation?orderId=123)
    // For now, it's a static confirmation.

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                    <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
                    <p className="text-muted-foreground">Thank you for your purchase.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>Your order has been placed successfully.</p>
                    {/* You can display an order ID here if available, e.g., from query params */}
                    {/* <p className="font-semibold">Order ID: #12345</p> */}
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
