import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="relative h-full flex-1 my-16 w-full rounded-xl bg-muted/50 p-2 ring-1 ring-inset ring-border lg:rounded-2xl flex justify-center flex-col items-center">
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Skeleton className="h-6 w-6 mb-2" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  )
}

