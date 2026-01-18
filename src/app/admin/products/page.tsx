import AdminProductForm from "@/components/admin/AdminProductForm";
import AdminProductList from "@/components/admin/AdminProductList";

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Product Management</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <AdminProductForm />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Existing Products</h2>
        <AdminProductList />
      </div>
    </div>
  );
}