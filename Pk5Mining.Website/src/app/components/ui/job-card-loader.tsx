import React from "react";
import { motion } from "framer-motion";

type JobCardLoaderProps = {
  records?: number;
  delayStep?: number; // stagger delay per item
  className?: string;
};

const ShimmerLine = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded bg-gray-800/60 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

export const JobCardLoader: React.FC<JobCardLoaderProps> = ({
  records = 6,
  delayStep = 0.05,
  className = "",
}) => {
  return (
    <div className={className}>
      {Array.from({ length: records }).map((_, index) => (
        <motion.div
          key={`job-loader-${index}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * delayStep }}
          className="mb-4 bg-[#0f0f0f] rounded-lg border border-gray-800 overflow-hidden"
        >
          <div className="w-full p-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 text-left">
              <div className="w-full">
                {/* Title */}
                <ShimmerLine className="h-5 w-2/3 mb-5" />

                {/* Brief description */}
                <ShimmerLine className="h-3 w-11/12 mb-2" />
                <ShimmerLine className="h-3 w-9/12 mb-4" />

                {/* Meta row */}
                <div className="flex flex-wrap gap-4">
                  <ShimmerLine className="h-3 w-28" />
                  <ShimmerLine className="h-3 w-24" />
                  <ShimmerLine className="h-3 w-32" />
                  <ShimmerLine className="h-3 w-20" />
                </div>
              </div>
            </div>

            {/* Apply button placeholder */}
            <div className="ml-4">
              <ShimmerLine className="h-9 w-24 rounded" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Shimmer keyframes */}
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};
