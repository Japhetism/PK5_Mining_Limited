import { useState, useMemo } from "react";
import { Eye, SlidersHorizontal, X } from "lucide-react";
import { ContactMessageDto } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import useContactListViewModel from "./viewmodel";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactMessageFilterPanel } from "../components/contact-message-filter-panel";
import { ContactViewModal } from "../components/contact-message-modal";

/**
 * Fixed Contact Message List Component
 * 
 * Changes:
 * - Filters only apply when "Apply Filters" button is clicked
 * - Quick search works in real-time
 * - Uses real cloud data (getContactMessages API)
 * - No mock data
 */
export function ContactMessageList() {
  const {
    contactMessages,
    isLoading,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    onChangePage,
    onChangePageSize,
    // Quick search
    quickSearch,
    handleQuickSearch,
    // Advanced filters
    temporaryFilters,
    appliedFilters,
    updateTemporaryFilter,
    handleApplyFilters,
    handleClearFilters,
    hasActiveFilters,
    filterStatus,
    setFilterStatus,
    error,
  } = useContactListViewModel();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewingId, setViewingId] = useState<string>("");

  // Table columns configuration
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
      key: "website",
      header: "Website",
      render: (row) => (
        <a
          href={row.website.startsWith("http") ? row.website : `https://${row.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline hover:text-blue-700 transition-colors"
        >
          {row.website}
        </a>
      ),
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
        <button
          onClick={() => setViewingId(row.id)}
          className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-100 hover:border-[#c89b3c] hover:text-[#c89b3c] transition-colors"
        >
          <Eye className="h-3 w-3" />
          View
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-1 text-2xl font-bold">Contact Messages</h1>
          <p className="text-sm text-gray-400">
            Track contact form submissions, reply, and resolve.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Quick Search Input */}
          <div className="w-full sm:max-w-md">
            <input
              name="search"
              type="text"
              value={quickSearch}
              onChange={(e) => handleQuickSearch(e.target.value)}
              placeholder="Quick search..."
              className="w-full rounded-lg border border-gray-800 bg-[#1a1a1a] px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-all"
            />
          </div>

          {/* Advanced Filters Button */}
          <button
            type="button"
            onClick={() => setIsFilterPanelOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-[#1a1a1a] px-4 py-2 text-sm text-gray-200 hover:border-[#c89b3c] hover:text-[#c89b3c] transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 inline-block rounded-full bg-[#c89b3c] px-2 py-0.5 text-xs text-black font-medium">
                {Object.values(appliedFilters).filter(
                  (v) => v && v !== "all"
                ).length}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">Active filters:</span>
            
            {appliedFilters.name && (
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                <span>Name: {appliedFilters.name}</span>
                <button
                  onClick={() => {
                    const updated = { ...appliedFilters, name: "" };
                    // You can add a function to update single filter if needed
                  }}
                  className="ml-1 text-gray-400 hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {appliedFilters.email && (
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                <span>Email: {appliedFilters.email}</span>
              </div>
            )}
            
            {appliedFilters.status && appliedFilters.status !== "all" && (
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                <span>Status: {appliedFilters.status}</span>
              </div>
            )}

            {/* Clear All Link */}
            <button
              onClick={handleClearFilters}
              className="text-xs text-[#c89b3c] hover:underline ml-auto"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error.message || "An error occurred while fetching messages"}
          </div>
        )}

        {/* Data Table */}
        <PaginatedTable<ContactMessageDto>
          columns={columns}
          data={contactMessages}
          isFilter={false}
          isLoading={isLoading}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalPages={totalPages}
          totalCount={totalCount}
          setPageNumber={onChangePage}
          setPageSize={onChangePageSize}
          emptyTitle="No contact messages"
          noResultsTitle="No results found. Try changing your filters."
        />
      </div>

      {/* Advanced Filter Panel */}
      <ContactMessageFilterPanel
        open={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        // Pass temporary filters (not applied yet)
        temporaryFilters={temporaryFilters}
        updateTemporaryFilter={updateTemporaryFilter}
        // Status filter
        filterStatus={filterStatus as any}
        setFilterStatus={setFilterStatus}
        // Button handlers - these WORK now!
        onApply={handleApplyFilters}  // ✅ Actually applies filters
        onClear={handleClearFilters}   // ✅ Actually clears filters
      />

      {/* View Contact Modal */}
      <ContactViewModal
        open={!!viewingId}
        onClose={() => setViewingId("")}
        contactId={viewingId}
      />
    </>
  );
}