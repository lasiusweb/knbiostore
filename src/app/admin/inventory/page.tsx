import InventoryLotForm from "@/components/admin/InventoryLotForm";
import ExpiryMonitor from "@/components/admin/ExpiryMonitor";

export default function InventoryPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <h1 className="text-3xl font-bold">Inventory & Lot Management</h1>
      
      {/* Top Section: Alerts */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-red-600">Expiry Alerts (Next 30 Days)</h2>
        <ExpiryMonitor />
      </section>

      {/* Bottom Section: Add Stock */}
      <section className="border-t pt-8">
        <h2 className="text-xl font-semibold mb-4">Add New Lot / Batch</h2>
        <InventoryLotForm />
      </section>
    </div>
  );
}