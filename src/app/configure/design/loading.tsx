import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Canvas/Image Area Skeleton */}
          <div className="flex flex-1 items-center justify-center">
            <div className="relative aspect-square w-full max-w-[500px] rounded-lg bg-muted/50 ring-1 ring-inset ring-border">
              <Skeleton className="h-full w-full rounded-lg" />
            </div>
          </div>

          {/* Design Controls Skeleton */}
          <div className="flex flex-1 flex-col gap-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-16" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-36" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="mt-8">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

