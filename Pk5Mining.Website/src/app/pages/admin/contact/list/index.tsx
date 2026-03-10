import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Eye, CheckCircle2, SlidersHorizontal, X } from "lucide-react";
import { ContactMessageDto, ContactStatus } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import useContactListViewModel from "./viewmodel";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";

const statusOptions: { label: string; value: ContactStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Read", value: "read" },
  { label: "Replied", value: "replied" },
  { label: "Resolved", value: "resolved" },
];

export function ContactMessageList() {
  const {
    contactMessages,
    isLoading,
    totalCount,
    totalPages,
    filters,
    pageNumber,
    pageSize,
    filterStatus,
    isFilter,
    queryClient,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
  } = useContactListViewModel();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const handleApplyFilters = () => {
    setIsFilter(true);
    setIsFilterPanelOpen(false);
  };

  const handleClearFilters = () => {
    updateFilter("search", "");
    updateFilter("name", "");
    updateFilter("email", "");
    updateFilter("subject", "");
    updateFilter("website", "");
    updateFilter("phoneNumber", "");
    updateFilter("startDate", "");
    updateFilter("endDate", "");
    setFilterStatus("all");
    setIsFilter(false);
    setIsFilterPanelOpen(false);
  };

  const columns: PaginatedTableColumn<ContactMessageDto>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-100">{row.name}</div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => row.subject,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <ContactStatusPill status={row.status} />,
    },
    {
      key: "dT_Created",
      header: "Date Created",
      render: (row) => formatDateTime(row.dT_Created),
    },
    {
      key: "dT_Updated",
      header: "Date Updated",
      render: (row) => formatDateTime(row.dT_Updated),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (row) => (
        <div className="inline-flex items-center gap-2">
          <Link
            to={`/admin/contact-messages/${row.id}`}
            title="View contact message details"
            onClick={() => {
              queryClient.setQueryData(["contactMessages", String(row.id)], row);
            }}
          >
            <button className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-100 hover:border-[#c89b3c]">
              <Eye className="h-3 w-3" />
              View
            </button>
          </Link>

          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-100 hover:border-[#c89b3c]"
            title="Mark as resolved"
          >
            <CheckCircle2 className="h-3 w-3 text-green-400" />
            Resolve
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="mb-1 text-2xl font-bold">Contact Messages</h1>
            <p className="text-sm text-gray-400">
              Track contact form submissions, reply, and resolve.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-md">
            <input
              name="search"
              type="text"
              value={filters.search}
              onChange={(e) => {
                updateFilter("search", e.target.value);
                setIsFilter(true);
              }}
              placeholder="Quick search..."
              className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterPanelOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-[#1a1a1a] px-4 py-2 text-sm text-gray-200 hover:border-[#c89b3c]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <PaginatedTable<ContactMessageDto>
          columns={columns}
          data={contactMessages}
          isLoading={isLoading}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalPages={totalPages}
          totalCount={totalCount}
          isFilter={isFilter}
          setPageNumber={onChangePage}
          setPageSize={onChangePageSize}
          emptyTitle="No contact messages"
          noResultsTitle="No results found. Try changing your filters."
        />
      </div>

      <AnimatePresence>
        {isFilterPanelOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterPanelOpen(false)}
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
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="rounded-lg border border-gray-800 p-2 text-gray-300 hover:border-[#c89b3c]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
                <FilterField label="Name">
                  <input
                    type="text"
                    value={filters.name ?? ""}
                    onChange={(e) => updateFilter("name", e.target.value)}
                    placeholder="Filter by name"
                    className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                  />
                </FilterField>

                <FilterField label="Email">
                  <input
                    type="text"
                    value={filters.email ?? ""}
                    onChange={(e) => updateFilter("email", e.target.value)}
                    placeholder="Filter by email"
                    className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                  />
                </FilterField>

                <FilterField label="Subject">
                  <input
                    type="text"
                    value={filters.subject ?? ""}
                    onChange={(e) => updateFilter("subject", e.target.value)}
                    placeholder="Filter by subject"
                    className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                  />
                </FilterField>

                <FilterField label="Website">
                  <input
                    type="text"
                    value={filters.website ?? ""}
                    onChange={(e) => updateFilter("website", e.target.value)}
                    placeholder="Filter by website"
                    className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                  />
                </FilterField>

                <FilterField label="Phone Number">
                  <input
                    type="text"
                    value={filters.phoneNumber ?? ""}
                    onChange={(e) => updateFilter("phoneNumber", e.target.value)}
                    placeholder="Filter by phone number"
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
                      value={filters.startDate ?? ""}
                      onChange={(e) => updateFilter("startDate", e.target.value)}
                      className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                    />
                  </FilterField>

                  <FilterField label="End Date">
                    <input
                      type="date"
                      value={filters.endDate ?? ""}
                      onChange={(e) => updateFilter("endDate", e.target.value)}
                      className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
                    />
                  </FilterField>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-gray-800 px-5 py-4">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:border-red-400"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="rounded-lg bg-[#c89b3c] px-4 py-2 text-sm font-medium text-black hover:opacity-90"
                >
                  Apply Filters
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
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