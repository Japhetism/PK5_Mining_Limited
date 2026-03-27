import { Eye, SlidersHorizontal, X } from "lucide-react";
import { ContactMessageDto } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { formatDateTime, getWebsiteName } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactMessageFilterPanel } from "../components/contact-message-filter-panel";
import { ContactViewModal } from "../components/contact-message-modal";
import useContactListViewModel from "./viewmodel";

export function ContactMessageList() {
  const {
    contactMessages,
    isLoading,
    totalCount,
    totalPages,
    pageNumber,
    pageSize,
    selectedContactMessage,
    confirmOpen,
    isFilterPanelOpen,
    filters,
    isFilter,
    advanceFilters,
    appliedAdvanceFilters,
    isProcessing,
    hasActiveFilters,
    setIsFilterPanelOpen,
    setConfirmOpen,
    setSelectedContactMessage,
    onChangePage,
    onChangePageSize,
    handleCloseModal,
    setFilters,
    updateFilter,
    updateAdvanceFilters,
    handleApplyAdanceFilters,
    handleClearAdvanceFilters,
    handleUpdateContactStatus,
  } = useContactListViewModel();

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
      render: (row) => (
        <span className="text-gray-300">{row.subject ?? "-"}</span>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (row) => (
        <span className="text-gray-300">{row.company ?? "-"}</span>
      ),
    },
    {
      key: "phoneNumber",
      header: "Phone",
      render: (row) => (
        <span className="text-gray-300">{row.phoneNumber ?? "-"}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <ContactStatusPill status={row.status ?? "new"} />,
    },
    {
      key: "appId",
      header: "Website",
      render: (row) => (
        <span>{row.appId ? getWebsiteName(row.appId) : "-"}</span>
      ),
    },
    {
      key: "dT_Created",
      header: "Date Created",
      render: (row) => (row.dT_Created ? formatDateTime(row.dT_Created) : "-"),
    },
    {
      key: "dT_Modified",
      header: "Date Modified",
      render: (row) =>
        row.dT_Modified ? formatDateTime(row.dT_Modified) : "-",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (row) => (
        <button
          onClick={() => {
            setConfirmOpen(true);
            setSelectedContactMessage(row);
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
            Track contact form submissions.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Quick Search Input */}
          <div className="w-full sm:max-w-md">
            <input
              name="search"
              type="text"
              value={filters.email}
              onChange={(e) => updateFilter("email", e.target.value)}
              placeholder="Search by email..."
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
            {hasActiveFilters &&
              Object.values(advanceFilters).filter((v) => v && v !== "all")
                .length > 0 && (
                <span className="ml-1 inline-block rounded-full bg-[#c89b3c] px-2 py-0.5 text-xs text-black font-medium">
                  {
                    Object.values(advanceFilters).filter(
                      (v) => v && v !== "all",
                    ).length
                  }
                </span>
              )}
          </button>
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">Active filters:</span>

            {appliedAdvanceFilters &&
              Object.entries(appliedAdvanceFilters)
                .filter(([_, value]) => value && value !== "all")
                .map(([key, value]) => {
                  let displayValue = value;
                  let displayKey = key;

                  if (key === "startDate" || key === "endDate") {
                    displayValue = formatDateTime(value, false);
                  }

                  if (key === "appId") {
                    displayKey = "Source";
                    displayValue = getWebsiteName(value);
                  }

                  return (
                    <button
                      key={key}
                      className="inline-flex items-center gap-1 rounded-full border border-gray-800 bg-[#1a1a1a] px-2.5 py-1 text-xs text-gray-200"
                    >
                      <span>
                        {displayKey
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                        : {displayValue}
                      </span>
                    </button>
                  );
                })}
            <button
              onClick={handleClearAdvanceFilters}
              className="text-xs text-[#c89b3c] hover:underline ml-auto"
            >
              Clear all
            </button>
          </div>
        )}

        <PaginatedTable<ContactMessageDto>
          columns={columns}
          data={contactMessages}
          isLoading={isLoading}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalPages={totalPages}
          totalCount={totalCount}
          emptyTitle="No contact messages found"
          noResultsTitle="No results found. Try changing your filters."
          isFilter={isFilter}
          setPageNumber={onChangePage}
          setPageSize={onChangePageSize}
        />
      </div>

      {/* Advanced Filter Panel */}
      <ContactMessageFilterPanel
        open={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={advanceFilters}
        updateFilters={updateAdvanceFilters}
        onApply={handleApplyAdanceFilters}
        onClear={handleClearAdvanceFilters}
      />

      {/* View Contact Modal */}
      <ContactViewModal
        open={confirmOpen && !!selectedContactMessage}
        contact={selectedContactMessage}
        loading={isProcessing}
        onClose={handleCloseModal}
        onUpdateStatus={handleUpdateContactStatus}
      />
    </>
  );
}
