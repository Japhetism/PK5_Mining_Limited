import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, CheckCircle2, SlidersHorizontal } from "lucide-react";
import { ContactMessageDto, ContactStatus } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import useContactListViewModel from "./viewmodel";
import { formatDateTime } from "@/app/utils/helper";
import { ContactStatusPill } from "@/app/components/ui/contact-status-pill";
import { ContactMessageFilterPanel } from "../components/contact-message-filter-panel";
import { ContactViewModal } from "../components/contact-message-modal";

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
  const [viewingId, setViewingId] = useState<string>("");

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
      key: "website",
      header: "website",
      render: (row) => 
        <a
          href={row.website.startsWith('http') ? row.website : `https://${row.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline hover:text-blue-700 transition-colors"
        >
        {row.website}
      </a>
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
          <button onClick={() => setViewingId(row.id)}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-100 hover:border-[#c89b3c]">
            <Eye className="h-3 w-3" />
            View
          </button>

          {/* <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs text-gray-100 hover:border-[#c89b3c]"
            title="Mark as resolved"
          >
            <CheckCircle2 className="h-3 w-3 text-green-400" />
            Resolve
          </button> */}
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

      <ContactMessageFilterPanel
        open={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        filterStatus={filterStatus as ContactStatus}
        updateFilter={updateFilter}
        setFilterStatus={setFilterStatus}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />

      <ContactViewModal
        open={!!viewingId}
        onClose={() => setViewingId("")}
        contactId={viewingId} />
    </>
  );
}

