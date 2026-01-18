import POSInterface from "@/components/pos/POSInterface";
import PendingOrdersView from "@/components/pos/PendingOrdersView";

export default function POSPage() {
    return (
        <div className="p-4 bg-gray-100 min-h-screen space-y-8">
            <h1 className="text-3xl font-bold">Point of Sale</h1>

            <div>
                <h2 className="text-xl font-semibold">1. Select Products</h2>
                <POSInterface />
            </div>

            <div className="border-t pt-8">
                <h2 className="text-xl font-semibold">2. Sync Offline Orders</h2>
                <PendingOrdersView />
            </div>
        </div>
    );
}