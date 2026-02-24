function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-800/60 ${className}`}
      aria-hidden="true"
    />
  );
}

export function ContactDetailsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-3 w-40" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>

      {/* Message card */}
      <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-64" />
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-black/20 p-3 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-[95%]" />
          <Skeleton className="h-3 w-[90%]" />
          <Skeleton className="h-3 w-[85%]" />
          <Skeleton className="h-3 w-[60%]" />
        </div>
      </div>

      {/* Replies card */}
      <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>

        <div className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-gray-800 bg-black/20 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-3 w-44" />
                <Skeleton className="h-3 w-28" />
              </div>

              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-[92%]" />
                <Skeleton className="h-3 w-[88%]" />
                <Skeleton className="h-3 w-[70%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
