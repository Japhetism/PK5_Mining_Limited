import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronDown } from "lucide-react";
import { DatePicker } from "@/app/components/ui/date-picker";
import { ContactStatus } from "@/app/interfaces";
import { formatDateTime } from "@/app/utils/helper";
import { contactMsgStatusOptions, websites, miningSubjects } from "@/app/constants";

type ContactMessageFilters = {
  search: string;
  name: string;
  email: string;
  subject: string;
  website: string;
  phoneNumber: string;
  startDate: string;
  endDate: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  // Temporary filters (UI state - not applied yet)
  temporaryFilters: ContactMessageFilters;
  updateTemporaryFilter: (key: keyof ContactMessageFilters, value: string) => void;
  // Status filter
  filterStatus: ContactStatus | "all";
  setFilterStatus: (value: ContactStatus | "all") => void;
  // Button handlers
  onApply: () => void;
  onClear: () => void;
};

/**
 * Fixed Contact Message Filter Panel
 * 
 * Changes:
 * - Uses temporary filters (not applied until button click)
 * - Apply button triggers onApply (which applies filters + closes panel)
 * - Clear button triggers onClear (which clears filters + closes panel)
 * - Filters only fetch when Apply button is clicked
 * - Uses real cloud data (no mock data)
 */
export function ContactMessageFilterPanel({
  open,
  onClose,
  temporaryFilters,
  updateTemporaryFilter,
  filterStatus,
  setFilterStatus,
  onApply,
  onClear,
}: Props) {
  // Count active temporary filters
  const activeFiltersCount = Object.entries(temporaryFilters).filter(
    ([key, value]) => {
      if (key === "search" || value === "" || (key === "website" && value === "")) {
        return false;
      }
      return true;
    }
  ).length + (filterStatus && filterStatus !== "all" ? 1 : 0);

  // Handle Apply button - applies filters AND closes panel
  const handleApplyClick = () => {
    onApply(); // This applies the filters
    onClose(); // This closes the panel
  };

  // Handle Clear button - clears filters AND closes panel
  const handleClearClick = () => {
    onClear(); // This clears all filters
    onClose(); // This closes the panel
  };

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
                  <h2 className="text-lg font-semibold text-gray-100">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <span className="inline-flex items-center justify-center rounded-full bg-[#c89b3c] px-2 py-0.5 text-xs font-medium text-black">
                      {activeFiltersCount}
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
                  value={temporaryFilters.name}
                  onChange={(e) => updateTemporaryFilter("name", e.target.value)}
                  placeholder="Filter by name"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                />
              </FilterField>

              {/* Email Filter */}
              <FilterField label="Email">
                <input
                  type="email"
                  value={temporaryFilters.email}
                  onChange={(e) => updateTemporaryFilter("email", e.target.value)}
                  placeholder="Filter by email"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                />
              </FilterField>

              {/* Phone Number Filter */}
              <FilterField label="Phone Number">
                <input
                  type="tel"
                  value={temporaryFilters.phoneNumber}
                  onChange={(e) => updateTemporaryFilter("phoneNumber", e.target.value)}
                  placeholder="Filter by phone number"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                />
              </FilterField>

              {/* Website Filter */}
              <FilterField label="Website">
                <div className="relative">
                  <select
                    value={temporaryFilters.website}
                    onChange={(e) => updateTemporaryFilter("website", e.target.value)}
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
                    value={temporaryFilters.subject}
                    onChange={(e) => updateTemporaryFilter("subject", e.target.value)}
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

              {/* Status Filter */}
              <FilterField label="Status">
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value as ContactStatus | "all")
                    }
                    className="w-full appearance-none rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-colors"
                  >
                    {contactMsgStatusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </FilterField>

              {/* Divider */}
              <div className="h-px bg-gray-800" />

              {/* Date Range Filters */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FilterField label="Start Date">
                  <DatePicker
                    name="startDate"
                    value={temporaryFilters.startDate ? formatDateTime(temporaryFilters.startDate, false) : ""}
                    onChange={(value) => updateTemporaryFilter("startDate", value)}
                  />
                </FilterField>

                <FilterField label="End Date">
                  <DatePicker
                    name="endDate"
                    value={temporaryFilters.endDate ? formatDateTime(temporaryFilters.endDate, false) : ""}
                    onChange={(value) => updateTemporaryFilter("endDate", value)}
                  />
                </FilterField>
              </div>
            </div>

            {/* Footer - BUTTONS NOW WORK PROPERLY */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-800 px-5 py-4">
              <button
                type="button"
                onClick={handleClearClick}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-200 hover:border-gray-600 hover:bg-gray-900 transition-colors"
              >
                Clear All
              </button>

              <button
                type="button"
                onClick={handleApplyClick}
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

/**
 * FilterField Component
 */
type FilterFieldProps = {
  label: string;
  children: React.ReactNode;
  error?: string;
  helperText?: string;
};

function FilterField({ label, children, error, helperText }: FilterFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
      {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
}