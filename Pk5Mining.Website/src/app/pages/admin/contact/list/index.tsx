import { useState } from "react";
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
 * Contact Message List Component
 * 
 * Field Mapping from your API:
 * - firstName + lastName → displayed as full name
 * - company → displayed in "Company" column (was "Website")
 * - messageBody → stored but not displayed in table
 * - dT_Modified → displayed as "Date Modified" (not dT_Updated)
 * - status → "Resolved" | "Pending" | "Open"
 * - appId → not displayed but available
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
    quickSearch,
    handleQuickSearch,
    temporaryFilters,
    appliedFilters,
    updateTemporaryFilter,
    handleApplyFilters,
    handleClearFilters,
    hasActiveFilters,
    filterStatus,
    setFilterStatus,
    error,
    contactMessage,
    setContactMessage,
  } = useContactListViewModel();

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [viewingId, setViewingId] = useState<string>("");

  // Table columns - CORRECT FIELD MAPPING FOR YOUR API
  const columns: PaginatedTableColumn<ContactMessageDto>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div>
          <div className="font-semibold text-gray-100">
            {row.firstName} {row.lastName}
          </div>
          <div className="text-xs text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => row.subject || "N/A",
    },
    {
      key: "company",
      header: "Company",
      render: (row) => {
        if (!row.company) {
          return <span className="text-gray-500">—</span>;
        }
        return <span className="text-gray-300">{row.company}</span>;
      },
    },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (row) => {
        if (!row.phoneNumber) {
          return <span className="text-gray-500">—</span>;
        }
        return <span className="text-gray-300">{row.phoneNumber}</span>;
      },
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <ContactStatusPill status={row.status} />,
    },
    {
      key: "dT_Created",
      header: "Date Created",
      render: (row) => 
        row.dT_Created 
          ? formatDateTime(row.dT_Created)
          : <span className="text-gray-500">—</span>,
    },
    {
      key: "dT_Modified",
      header: "Date Modified",
      render: (row) => formatDateTime(row.dT_Modified),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (row) => (
        <button
          onClick={() =>{ 
            setViewingId(String(row.id));
            setContactMessage(row)
          }}
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
                <span>First Name: {appliedFilters.name}</span>
                <button
                  onClick={() => updateTemporaryFilter("name", "")}
                  className="ml-1 text-gray-400 hover:text-gray-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            
            {/* {appliedFilters.lastName && (
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                <span>Last Name: {appliedFilters.lastName}</span>
              </div>
            )} */}
            
            {appliedFilters.email && (
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                <span>Email: {appliedFilters.email}</span>
              </div>
            )}
            
            {appliedFilters.company && (
              <div className="inline-flex items-center gap-1 rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-200">
                <span>Company: {appliedFilters.company}</span>
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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">Loading contact messages...</div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && contactMessages.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-400">No contact messages found</div>
          </div>
        )}

        {/* Data Table */}
        {!isLoading && contactMessages.length > 0 && (
          <PaginatedTable<ContactMessageDto>
            columns={columns}
            data={contactMessages}
            isLoading={isLoading}
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalPages={totalPages}
            totalCount={totalCount}
            setPageNumber={onChangePage}
            setPageSize={onChangePageSize}
            emptyTitle="No contact messages"
            noResultsTitle="No results found. Try changing your filters." isFilter={false}          />
        )}
      </div>

      {/* Advanced Filter Panel */}
      <ContactMessageFilterPanel
        open={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        temporaryFilters={temporaryFilters}
        updateTemporaryFilter={updateTemporaryFilter}
        filterStatus={filterStatus as any}
        setFilterStatus={setFilterStatus}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      {/* View Contact Modal */}
      <ContactViewModal
        open={!!viewingId}
        onClose={() => setViewingId("")}
        contactId={viewingId}
        contact={contactMessage}
      />
    </>
  );
}