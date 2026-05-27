import { useTenant } from "@/tenants/useTenant";
import React from "react";

const Skel = ({
  className = "",
  backgroundColor,
}: {
  className?: string;
  backgroundColor: string;
}) => (
  <div
    className={`rounded animate-pulse ${className}`}
    style={{ background: backgroundColor }}
  />
);

export const ApplicationDetailsSkeleton: React.FC = () => {
  const { colors } = useTenant();
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3">
        {/* Back button */}
        <Skel className="h-4 w-36" backgroundColor={colors.card} />

        {/* Status select */}
        <Skel className="h-8 w-32 rounded-lg" backgroundColor={colors.card} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1.3fr] gap-6">
        {/* Candidate Card */}
        <div
          className="border border-gray-800 rounded-xl p-5 space-y-4"
          style={{ background: colors.bg }}
        >
          {/* Name */}
          <Skel className="h-6 w-48" backgroundColor={colors.card} />

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skel className="h-3 w-16" backgroundColor={colors.card} />
                <Skel className="h-4 w-40" backgroundColor={colors.card} />
              </div>
            ))}
          </div>
        </div>

        {/* Resume Card */}
        <div
          className="border border-gray-800 rounded-xl p-5 space-y-4"
          style={{ background: colors.bg }}
        >
          <Skel className="h-3 w-20" backgroundColor={colors.card} />
          <Skel className="h-9 w-40 rounded-lg" backgroundColor={colors.card} />
        </div>

        {/* Other Info Card */}
        <div
          className="border border-gray-800 rounded-xl p-5 space-y-4"
          style={{ background: colors.bg }}
        >
          <Skel className="h-3 w-32" backgroundColor={colors.card} />

          <div className="space-y-3">
            <Skel className="h-4 w-64" backgroundColor={colors.card} />
            <Skel className="h-4 w-56" backgroundColor={colors.card} />
            <Skel className="h-4 w-52" backgroundColor={colors.card} />
          </div>
        </div>
      </div>
    </div>
  );
};
