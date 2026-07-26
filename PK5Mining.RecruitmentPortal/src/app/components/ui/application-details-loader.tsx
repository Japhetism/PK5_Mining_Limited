import { useTenant } from "@/tenants/useTenant";

export default function ApplicationDetailsSkeleton() {
  const { colors } = useTenant();
  return (
    <div className="mx-auto space-y-6 animate-pulse">
      {/* --- Top Header Profile Bar --- */}
      <div
        className="border rounded-xl p-4 flex items-center justify-between shadow-lg"
        style={{ background: colors.card }}
      >
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gray-700/60" />

          <div className="space-y-2">
            <div className="h-4 w-40 bg-gray-700/60 rounded" />
            <div className="h-3 w-20 bg-gray-700/40 rounded" />
          </div>
        </div>

        {/* Status badge */}
        <div className="h-8 w-28 rounded-full bg-gray-700/40" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-6 space-y-6">
          {/* Contact Details Card */}
          <div
            className="border rounded-xl p-6 shadow-md"
            style={{ background: colors.card }}
          >
            <div className="h-5 w-56 bg-gray-700/50 rounded mb-6" />

            <div
              className="rounded-lg p-8 space-y-4"
              style={{ background: colors.card }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 py-1 gap-3">
                  <div className="h-3 w-20 bg-gray-700/40 rounded" />
                  <div className="col-span-2 h-3 w-full bg-gray-700/50 rounded" />
                </div>
              ))}
            </div>

            <div className="my-6 border-b border-gray-700/40" />

            <div
              className="rounded-lg p-8 space-y-4"
              style={{ background: colors.card }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="grid grid-cols-3 py-1 gap-3">
                  <div className="h-3 w-24 bg-gray-700/40 rounded" />
                  <div className="col-span-2 h-3 w-full bg-gray-700/50 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* CV Section Skeleton */}
          <div
            className="border rounded-xl p-6 shadow-md"
            style={{ background: colors.card }}
          >
            <div
              className="rounded-lg p-4 space-y-4"
              style={{ background: colors.innerCard }}
            >
              <div className="flex space-x-4 items-start">
                {/* Thumbnail */}
                <div className="w-20 h-24 bg-gray-700/50 rounded" />

                <div className="flex-1 space-y-3">
                  <div className="h-4 w-40 bg-gray-700/50 rounded" />
                  <div className="h-3 w-24 bg-gray-700/40 rounded" />
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-700/40 rounded-lg" />
                <div className="h-10 bg-gray-700/50 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          className="lg:col-span-6 border rounded-xl p-6 shadow-md space-y-8"
          style={{ background: colors.card }}
        >
          {/* Workflow */}
          <div className="space-y-4">
            <div className="h-5 w-56 bg-gray-700/50 rounded" />

            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 w-28 bg-gray-700/40 rounded" />
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="h-4 w-48 bg-gray-700/50 rounded" />

            <div className="space-y-5 pl-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex space-x-3 items-start">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700/60 mt-1.5" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-full bg-gray-700/40 rounded" />
                    <div className="h-2.5 w-24 bg-gray-700/30 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
