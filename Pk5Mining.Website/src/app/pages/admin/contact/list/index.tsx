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
import { useTenant } from "@/tenants/useTenant";

export function ContactMessageList() {
  const { isAgro, colors } = useTenant();
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
          <div className="text-[16px] font-semibold capitalize" style={{ color: colors.text }}>
            {row.firstName} {row.lastName}
          </div>
          <div className="text-[15px]" style={{ color: colors.text }}>
            {row.email}
          </div>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <span className="capitalize" style={{ color: colors.text }}>
          {row.subject ?? "-"}
        </span>
      ),
    },
    {
      key: "company",
      header: "Company",
      render: (row) => (
        <span className="capitalize" style={{ color: colors.text }}>
          {row.company ?? "-"}
        </span>
      ),
    },
    ...(isAgro
      ? [
          {
            key: "phoneNumber",
            header: "Phone",
            render: (row: ContactMessageDto) => (
              <span style={{ color: colors.text }}>
                {row.phoneNumber ?? "-"}
              </span>
            ),
          },
        ]
      : []),
    {
      key: "status",
      header: "Status",
      render: (row) => <ContactStatusPill status={row.status ?? "new"} />,
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
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[16px] text-white transition-colors"
          style={{ backgroundColor: colors.accent }}
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
          <h1 className="mb-1 text-[18px] font-bold" style={{ color: colors.text }}>
            Contact Messages
          </h1>
          <p className="text-[15px]" style={{ color: colors.text }}>
            Track contact form submissions.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Quick Search Input */}
          <div className="w-full sm:max-w-2xl">
            <input
              name="search"
              type="text"
              value={filters.email}
              onChange={(e) => updateFilter("email", e.target.value)}
              placeholder="Search by email..."
              className="w-full rounded-lg px-4 py-3 text-[16px] placeholder-gray-500 outline-none focus:border-[#c89b3c] focus:ring-1 focus:ring-[#c89b3c]/20 transition-all"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          {/* Advanced Filters Button */}
          <button
            type="button"
            onClick={() => setIsFilterPanelOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-[16px] transition-colors"
            style={{ background: colors.accent, color: colors.card }}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters &&
              Object.values(advanceFilters).filter((v) => v && v !== "all")
                .length > 0 && (
                <span className="ml-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: colors.card, color: colors.accent }}>
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
            <span className="text-[16px]" style={{ color: colors.text }}>
              Active filters:
            </span>

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
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[14px]"
                      style={{ background: colors.accent, color: colors.card }}
                    >
                      <span className={key === "subject" ? "capitalize" : ""}>
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
              className="text-[16px] hover:underline ml-auto"
              style={{ color: colors.text }}
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
