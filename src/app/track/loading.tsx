import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-muted/40 py-10">
      <div className="max-w-3xl mx-auto bg-card rounded-lg shadow p-6">
        <Skeleton className="h-8 w-48 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details Skeleton */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          {/* Product Preview Skeleton */}
          <div className="grid justify-center">
            <Skeleton className="h-40 w-40 rounded-lg" />
          </div>

          {/* Shipping Address Skeleton */}
          <div className="md:col-span-2">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="bg-muted/20 p-4 rounded-md space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Tracking Timeline Skeleton */}
          <div className="md:col-span-2">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <div className="ml-4 flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

