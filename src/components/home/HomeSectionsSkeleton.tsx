import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

function SectionHeaderSkeleton({ showBadge = false }) {
  return (
    <div className="text-center mb-12">
      {showBadge && (
        <Skeleton className="h-8 w-64 mx-auto rounded-full mb-4" />
      )}
      <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto mb-4" />
      <div className="w-24 h-1 bg-muted mx-auto rounded-full" />
    </div>
  )
}

export function ShopBySegmentSkeleton() {
  return (
    <section className="py-16 md:py-20 section-muted">
      <div className="container mx-auto px-4">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="h-full border-0 bg-card shadow-sm">
              <CardContent className="flex flex-col items-center justify-center p-6 h-full min-h-[160px]">
                <Skeleton className="h-12 w-12 rounded-full mb-3" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-32 hidden md:block" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ShopByCropSkeleton() {
  return (
    <section className="py-16 md:py-20 section-light">
      <div className="container mx-auto px-4">
        <SectionHeaderSkeleton />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className="h-full bg-card border border-border/50">
              <CardContent className="flex flex-col items-center justify-center p-4 md:p-6 text-center">
                <Skeleton className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-3" />
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ShopByProblemSkeleton() {
  return (
    <section className="py-16 md:py-20 section-muted">
      <div className="container mx-auto px-4">
        <SectionHeaderSkeleton showBadge />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-full border-l-4 border-l-muted bg-muted/5">
              <CardContent className="flex items-center justify-between p-6 h-full">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-5 w-5" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
