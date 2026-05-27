import React from "react";
import { motion } from "motion/react";
import { useTenant } from "@/tenants/useTenant";

type JobDetailsSkeletonProps = {
  className?: string;
};

const Skel = ({ className = "", backgroundColor }: { className?: string, backgroundColor: string }) => (
  <div className={`rounded animate-pulse ${className}`} style={{ background: backgroundColor }} />
);

export const JobDetailsSkeleton: React.FC<JobDetailsSkeletonProps> = ({
  className = "",
}) => {
  const { colors } = useTenant();
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top header block */}
      <div className="flex items-center justify-between gap-3">
        <div className="w-full">
          {/* Back link */}
          <Skel className="h-3 w-24 mb-4" backgroundColor={colors.card} />

          {/* Badge */}
          <Skel className="h-5 w-28 mb-3 mt-4 rounded-full" backgroundColor={colors.card} />

          {/* Title */}
          <Skel className="h-7 w-[70%] mb-3" backgroundColor={colors.card} />

          {/* Brief description */}
          <div className="space-y-2 mb-6">
            <Skel className="h-4 w-[85%]" backgroundColor={colors.card} />
            <Skel className="h-4 w-[65%]" backgroundColor={colors.card} />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="inline-flex items-center gap-2">
              <Skel className="h-3 w-3 rounded-sm" backgroundColor={colors.card} />
              <Skel className="h-4 w-24" backgroundColor={colors.card} />
            </div>
            <div className="inline-flex items-center gap-2">
              <Skel className="h-3 w-3 rounded-sm" backgroundColor={colors.card} />
              <Skel className="h-4 w-20" backgroundColor={colors.card} />
            </div>
            <div className="inline-flex items-center gap-2">
              <Skel className="h-3 w-3 rounded-sm" backgroundColor={colors.card} />
              <Skel className="h-4 w-28" backgroundColor={colors.card} />
            </div>
            <div className="inline-flex items-center gap-2">
              <Skel className="h-2 w-2 rounded-full" backgroundColor={colors.card} />
              <Skel className="h-4 w-32" backgroundColor={colors.card} />
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: description */}
        <div className="lg:col-span-2 space-y-4">
          <div className="border border-gray-800 rounded-xl p-5" style={{ background: colors.bg }}>
            <div className="space-y-3">
              <Skel className="h-4 w-[92%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[88%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[80%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[90%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[76%]" backgroundColor={colors.card} />

              <div className="h-2" />

              <Skel className="h-4 w-[60%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[86%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[78%]" backgroundColor={colors.card} />
              <Skel className="h-4 w-[84%]" backgroundColor={colors.card} />
            </div>
          </div>
        </div>

        {/* Right: side card */}
        <div className="space-y-4">
          <div className="border border-gray-800 rounded-xl p-4 text-sm" style={{ background: colors.bg }}>
            {/* Status label */}
            <Skel className="h-3 w-16 mb-2" backgroundColor={colors.card} />
            {/* Status pill */}
            <Skel className="h-5 w-20 rounded-full mb-4" backgroundColor={colors.card} />

            {/* Experience */}
            <Skel className="h-3 w-20 mb-2" backgroundColor={colors.card} />
            <Skel className="h-4 w-24 mb-4" backgroundColor={colors.card} />

            {/* Posted */}
            <Skel className="h-3 w-14 mb-2" backgroundColor={colors.card} />
            <Skel className="h-4 w-28 mb-4" backgroundColor={colors.card} />

            {/* Updated */}
            <Skel className="h-3 w-16 mb-2" backgroundColor={colors.card} />
            <Skel className="h-4 w-28 mb-4" backgroundColor={colors.card} />

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <motion.div className="flex-1">
                <Skel className="h-9 w-full rounded-lg" backgroundColor={colors.card} />
              </motion.div>
              <motion.div className="flex-1">
                <Skel className="h-9 w-full rounded-lg" backgroundColor={colors.card} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
