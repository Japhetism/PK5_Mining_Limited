import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, CheckCircle2 } from "lucide-react";
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
  } = useContactListViewModel();

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
            to={`/admin/contact/${row.id}`}
            title="View contact message details"
            onClick={() => {
              queryClient.setQueryData(
                ["contactMessages", String(row.id)],
                row,
              );
            }}
          >
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-700 text-xs text-gray-100 hover:border-[#c89b3c]">
              <Eye className="w-3 h-3" />
              View
            </button>
          </Link>

          {/* Optional quick action: mark resolved via details page typically,
               but you can also implement here when backend supports it */}
          <button
            type="button"
            onClick={() => {}}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-700 text-xs text-gray-100 hover:border-[#c89b3c]"
            title="Mark as resolved"
          >
            <CheckCircle2 className="w-3 h-3 text-green-400" />
            Resolve
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">Contact Messages</h1>
          <p className="text-xs text-gray-400">
            Track contact form submissions, reply, and resolve.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <motion.input
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search name, email, subject..."
            className="w-full sm:w-[280px] rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c]"
          />

          <motion.select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-800 bg-[#0f0f0f] px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c]"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </motion.select>
        </div>
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
        emptyTitle="No contact messsages"
        noResultsTitle="No results found. Try changing your filters."
      />
    </div>
  );
}
