import { Skeleton } from "@/components/ui/skeleton"

export default function TestSkeletonPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Skeleton Loader Brand Test</h1>
      
      <div className="space-y-4 max-w-sm border p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold">Card Skeleton (Default)</h2>
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center pt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Text Lines</h2>
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  )
}
