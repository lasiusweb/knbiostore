import Navbar from "@/components/layout/Navbar";
import StoreProductList from "@/components/store/StoreProductList";

export default function StorePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Agricultural Microbes</h1>
                <StoreProductList />
            </div>
        </div>
    );
}