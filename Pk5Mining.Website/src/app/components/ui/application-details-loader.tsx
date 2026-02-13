import React from "react";

const Skel = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-800/60 rounded animate-pulse ${className}`} />
);

export const ApplicationDetailsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3">
        {/* Back button */}
        <Skel className="h-4 w-36" />

        {/* Status select */}
        <Skel className="h-8 w-32 rounded-lg" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-6">
        {/* Candidate Card */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 space-y-4">
          {/* Name */}
          <Skel className="h-6 w-48" />

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skel className="h-3 w-16" />
                <Skel className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Resume Card */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 space-y-4">
          <Skel className="h-3 w-20" />
          <Skel className="h-9 w-40 rounded-lg" />
        </div>

        {/* Other Info Card */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 space-y-4">
          <Skel className="h-3 w-32" />

          <div className="space-y-3">
            <Skel className="h-4 w-64" />
            <Skel className="h-4 w-56" />
            <Skel className="h-4 w-52" />
          </div>
        </div>
      </div>
    </div>
  );
};
