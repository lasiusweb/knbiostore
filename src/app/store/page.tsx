import StoreProductList from '@/components/store/StoreProductList';
import StoreProductListSkeleton from '@/components/store/StoreProductListSkeleton';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Suspense } from 'react';

export default function StorePage() {
  return (
    <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        <section className="gradient-hero py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-gradient">Agricultural Microbes & Solutions</span>
                    </h1>
                    <p className="text-lg text-gray-300 mb-8">
                        Certified organic products trusted by 50,000+ farmers across India
                    </p>

                    {/* Search Bar - Visual only for now since we are in Server Component */}
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400 backdrop-blur-sm focus:bg-white/20"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Our Products</h2>
            <Suspense fallback={<StoreProductListSkeleton />}>
              <StoreProductList />
            </Suspense>
        </div>
    </div>
  );
}
