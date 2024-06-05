import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonDemo() {
  return (
    <div className="flex items-center justify-center space-x-4 ">
      <Skeleton className="h-14 w-14 rounded-full bg-zinc-200" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[750px] bg-zinc-200" />
        <Skeleton className="h-4 w-[750px] bg-zinc-200" />
      </div>
    </div>
  )
}
