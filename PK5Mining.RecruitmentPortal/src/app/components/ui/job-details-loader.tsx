import React from "react";

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-800/60 rounded animate-pulse ${className}`} />
);

export const JobDetailsLoader = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
        <div className="container mx-auto px-6">
          <Skeleton className="h-4 w-32 mb-5" />

          <div className="max-w-3xl">
            <Skeleton className="h-6 w-28 mb-6 rounded-full" />
            <Skeleton className="h-12 w-3/4 mb-5" />

            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-9/12" />
            </div>

            {/* Form */}
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 space-y-5">
              <Skeleton className="h-7 w-2/3 mb-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>

              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-14 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};