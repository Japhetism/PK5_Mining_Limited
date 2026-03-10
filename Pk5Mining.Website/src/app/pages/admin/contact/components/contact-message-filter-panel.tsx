import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { ContactStatus } from "@/app/interfaces";

const statusOptions: { label: string; value: ContactStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Replied", value: "replied" },
  { label: "Resolved", value: "resolved" },
  { label: "Closed", value: "closed" },
];

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
  filters: ContactMessageFilters;
  filterStatus: ContactStatus | "all";
  updateFilter: (key: keyof ContactMessageFilters, value: string) => void;
  setFilterStatus: (value: ContactStatus | "all") => void;
  onApply: () => void;
  onClear: () => void;
};

export function ContactMessageFilterPanel({
  open,
  onClose,
  filters,
  filterStatus,
  updateFilter,
  setFilterStatus,
  onApply,
  onClear,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-gray-800 bg-[#111111] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-100">Filters</h2>
                <p className="text-sm text-gray-400">
                  Narrow contact messages with advanced filters.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-800 p-2 text-gray-300 hover:border-[#c89b3c]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <FilterField label="Name">
                <input
                  type="text"
                  value={filters.name}
                  onChange={(e) => updateFilter("name", e.target.value)}
                  placeholder="Filter by name"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                />
              </FilterField>

              <FilterField label="Email">
                <input
                  type="text"
                  value={filters.email}
                  onChange={(e) => updateFilter("email", e.target.value)}
                  placeholder="Filter by email"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                />
              </FilterField>

              <FilterField label="Phone Number">
                <input
                  type="text"
                  value={filters.phoneNumber}
                  onChange={(e) => updateFilter("phoneNumber", e.target.value)}
                  placeholder="Filter by phone number"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                />
              </FilterField>

              <FilterField label="Subject">
                <input
                  type="text"
                  value={filters.subject}
                  onChange={(e) => updateFilter("subject", e.target.value)}
                  placeholder="Filter by subject"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                />
              </FilterField>

              <FilterField label="Website">
                <input
                  type="text"
                  value={filters.website}
                  onChange={(e) => updateFilter("website", e.target.value)}
                  placeholder="Filter by website"
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                />
              </FilterField>

              <FilterField label="Status">
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(e.target.value as ContactStatus | "all")
                  }
                  className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </FilterField>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FilterField label="Start Date">
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => updateFilter("startDate", e.target.value)}
                    className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                  />
                </FilterField>

                <FilterField label="End Date">
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => updateFilter("endDate", e.target.value)}
                    className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                  />
                </FilterField>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-800 px-5 py-4">
              <button
                type="button"
                onClick={onClear}
                className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:border-red-400"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={onApply}
                className="rounded-lg bg-[#c89b3c] px-4 py-2 text-sm font-medium text-black hover:opacity-90"
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