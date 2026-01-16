import AdminProductForm from "@/components/admin/AdminProductForm";

export default function AdminProductsPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <AdminProductForm />
    </div>
  );
}