import StoreProductListSkeleton from "@/components/store/StoreProductListSkeleton"
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function StoreLoading() {
  return (
    <div className="min-h-screen bg-background">
        {/* Hero Banner Skeleton */}
        <section className="gradient-hero py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center text-white">
                    <div className="h-12 w-3/4 bg-white/10 rounded-md animate-shimmer mx-auto mb-4" />
                    <div className="h-6 w-2/3 bg-white/10 rounded-md animate-shimmer mx-auto mb-8" />

                    <div className="relative max-w-xl mx-auto h-14 bg-white/10 rounded-md animate-shimmer" />
                </div>
            </div>
        </section>

        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Our Products</h2>
            <StoreProductListSkeleton />
        </div>
    </div>
  )
}
