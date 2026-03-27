import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronDown } from "lucide-react";
import { DatePicker } from "@/app/components/ui/date-picker";
import { AdvanceFilter, ContactStatus } from "@/app/interfaces";
import { formatDateTime, toBackendDateTimeWithBoundary } from "@/app/utils/helper";
import {
  contactMsgStatusOptions,
  websites,
  miningSubjects,
  agroSubjects,
} from "@/app/constants";

type Props = {
  open: boolean;
  filters: AdvanceFilter;
  onClose: () => void;
  updateFilters: (key: keyof AdvanceFilter, value: string) => void;
  onApply: () => void;
  onClear: () => void;
};

export function ContactMessageFilterPanel({
  open,
  filters,
  onClose,
  onApply,
  onClear,
  updateFilters,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-out Panel */}
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-gray-800 bg-[#111111] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-100">
                    Filters
                  </h2>
                  {filters &&
                    Object.values(filters).filter((v) => v && v !== "all")
                      .length > 0 && (
                      <span className="ml-1 inline-block rounded-full bg-[#c89b3c] px-2 py-0.5 text-xs text-black font-medium">
                        {
                          Object.values(filters).filter((v) => v && v !== "all")
                            .length
                        }
                      </span>
                    )}
                </div>
                <p className="text-sm text-gray-400">
                  Set filters and click Apply to filter results.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-800 p-2 text-gray-300 hover:border-[#c89b3c] hover:text-[#c89b3c] transition-colors"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              {/* Name Filter */}
              <FilterField label="Name">
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => updateFilters("name", e.target.value)}
                  placeholder="Filter by Name"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                />
              </FilterField>

              {/* Email Filter */}
              <FilterField label="Email">
                <input
                  type="email"
                  value={filters.email}
                  onChange={(e) => updateFilters("email", e.target.value)}
                  placeholder="Filter by email"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                />
              </FilterField>

              {/* Website Filter */}
              <FilterField label="Website">
                <div className="relative">
                  <select
                    value={filters.appId}
                    onChange={(e) => updateFilters("appId", e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                  >
                    <option value="">All Websites</option>
                    {websites.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </FilterField>

              {/* Subject Filter */}
              <FilterField label="Subject">
                <div className="relative">
                  <select
                    value={filters.subject}
                    onChange={(e) => updateFilters("subject", e.target.value)}
                    className="w-full appearance-none rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                  >
                    <option value="">All Subjects</option>
                    {miningSubjects.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </FilterField>

              {/* Date Range Filters */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FilterField label="Start Date">
                  <DatePicker
                    name="startDate"
                    value={
                      filters.startDate
                        ? formatDateTime(filters.startDate, false)
                        : ""
                    }
                    onChange={(value) => updateFilters("startDate", toBackendDateTimeWithBoundary(value))}
                    maxDate={filters.endDate ? new Date(filters.endDate) : new Date()}
                  />
                </FilterField>

                <FilterField label="End Date">
                  <DatePicker
                    name="endDate"
                    value={
                      filters.endDate
                        ? formatDateTime(filters.endDate, false)
                        : ""
                    }
                    onChange={(value) => updateFilters("endDate", toBackendDateTimeWithBoundary(value, "end"))}
                    minDate={filters.startDate ? new Date(filters.startDate) : new Date()}
                    maxDate={new Date()}
                  />
                </FilterField>
              </div>
            </div>

            {/* Footer - BUTTONS NOW WORK PROPERLY */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-800 px-5 py-4">
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:border-gray-600 hover:bg-gray-900 transition-colors"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={onApply}
                className="rounded-lg bg-[#c89b3c] px-4 py-2 text-sm font-medium text-black hover:opacity-90 hover:shadow-lg hover:shadow-[#c89b3c]/20 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

type FilterFieldProps = {
  label: string;
  children: React.ReactNode;
};

function FilterField({ label, children }: FilterFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      {children}
    </div>
  );
}
