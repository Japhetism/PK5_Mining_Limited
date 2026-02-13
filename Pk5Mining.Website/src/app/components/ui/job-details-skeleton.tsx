import React from "react";
import { motion } from "motion/react";

type JobDetailsSkeletonProps = {
  className?: string;
};

const Skel = ({ className = "" }: { className?: string }) => (
  <div className={`bg-gray-800/60 rounded animate-pulse ${className}`} />
);

export const JobDetailsSkeleton: React.FC<JobDetailsSkeletonProps> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Top header block */}
      <div className="flex items-center justify-between gap-3">
        <div className="w-full">
          {/* Back link */}
          <Skel className="h-3 w-24 mb-4" />

          {/* Badge */}
          <Skel className="h-5 w-28 mb-3 mt-4 rounded-full" />

          {/* Title */}
          <Skel className="h-7 w-[70%] mb-3" />

          {/* Brief description */}
          <div className="space-y-2 mb-6">
            <Skel className="h-4 w-[85%]" />
            <Skel className="h-4 w-[65%]" />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="inline-flex items-center gap-2">
              <Skel className="h-3 w-3 rounded-sm" />
              <Skel className="h-4 w-24" />
            </div>
            <div className="inline-flex items-center gap-2">
              <Skel className="h-3 w-3 rounded-sm" />
              <Skel className="h-4 w-20" />
            </div>
            <div className="inline-flex items-center gap-2">
              <Skel className="h-3 w-3 rounded-sm" />
              <Skel className="h-4 w-28" />
            </div>
            <div className="inline-flex items-center gap-2">
              <Skel className="h-2 w-2 rounded-full" />
              <Skel className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: description */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5">
            <div className="space-y-3">
              <Skel className="h-4 w-[92%]" />
              <Skel className="h-4 w-[88%]" />
              <Skel className="h-4 w-[80%]" />
              <Skel className="h-4 w-[90%]" />
              <Skel className="h-4 w-[76%]" />

              <div className="h-2" />

              <Skel className="h-4 w-[60%]" />
              <Skel className="h-4 w-[86%]" />
              <Skel className="h-4 w-[78%]" />
              <Skel className="h-4 w-[84%]" />
            </div>
          </div>
        </div>

        {/* Right: side card */}
        <div className="space-y-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 text-sm">
            {/* Status label */}
            <Skel className="h-3 w-16 mb-2" />
            {/* Status pill */}
            <Skel className="h-5 w-20 rounded-full mb-4" />

            {/* Experience */}
            <Skel className="h-3 w-20 mb-2" />
            <Skel className="h-4 w-24 mb-4" />

            {/* Posted */}
            <Skel className="h-3 w-14 mb-2" />
            <Skel className="h-4 w-28 mb-4" />

            {/* Updated */}
            <Skel className="h-3 w-16 mb-2" />
            <Skel className="h-4 w-28 mb-4" />

            {/* Buttons */}
            <div className="flex gap-2 mt-4">
              <motion.div className="flex-1">
                <Skel className="h-9 w-full rounded-lg" />
              </motion.div>
              <motion.div className="flex-1">
                <Skel className="h-9 w-full rounded-lg" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
