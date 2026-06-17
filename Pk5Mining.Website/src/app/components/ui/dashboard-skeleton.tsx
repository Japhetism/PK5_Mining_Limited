import { useTenant } from "@/tenants/useTenant";
import { motion } from "motion/react";

export function DashboardSkeleton() {
  const { colors } = useTenant();
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-7 w-40 rounded" style={{ background: colors.card }} />
        <div className="h-4 w-96 max-w-full rounded" style={{ background: colors.card }} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="border border-gray-800 rounded-xl p-4 flex items-center gap-3"
            style={{ background: colors.bg }}
          >
            <div className="w-9 h-9 rounded-lg" style={{ background: colors.card }} />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 w-20 rounded" style={{ background: colors.card }} />
              <div className="h-6 w-24 rounded" style={{ background: colors.card }} />
              <div className="h-3 w-28 rounded" style={{ background: colors.card }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications by role */}
        <div className="border border-gray-800 rounded-xl p-5" style={{ background: colors.bg }}>
          <div className="h-4 w-40 rounded mb-4" style={{ background: colors.card }} />
          <ul className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="h-3 w-44 rounded" style={{ background: colors.card }} />
                  <div className="h-3 w-8 rounded" style={{ background: colors.card }} />
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: colors.card }}>
                  <div className="h-full w-1/3" style={{ background: colors.card }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pipeline status */}
        <div className="border border-gray-800 rounded-xl p-5" style={{ background: colors.bg }}>
          <div className="h-4 w-32 rounded mb-4" style={{ background: colors.card }} />
          <div className="grid grid-cols-2 gap-4 text-xs">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-20 rounded" style={{ background: colors.card }} />
                <div className="h-6 w-12 rounded" style={{ background: colors.card }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
