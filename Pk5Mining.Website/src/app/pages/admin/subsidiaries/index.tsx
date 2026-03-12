import { Link } from "react-router-dom";
import { motion } from "motion/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Plus,
  Eye,
  XCircle,
  CheckCircle2,
  MoreVerticalIcon,
  Pencil,
  Trash,
} from "lucide-react";
import { StatusFilter } from "@/app/interfaces";
import { formatDateTime } from "@/app/utils/helper";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { countries, statusOptions } from "@/app/constants";
import useSubsidiaryListViewModel from "./viewmodel";
import { Subsidiary } from "@/app/interfaces/subsidiary";
import { EditModal } from "./components/edit-modal";
import { DetailModal } from "./components/detail-modal";

export function SubsidiaryList() {
  const {
    subsidaries,
    filters,
    filterStatus,
    isLoading,
    isFilter,
    pageNumber,
    pageSize,
    totalCount,
    totalPages,
    error,
    form,
    fieldErrors,
    confirmOpen,
    confirmDeleteOpen,
    confirmEditOpen,
    selectedSubsidiary,
    isUpdating,
    queryClient,
    filterCountry,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setSelectedSubsidiary,
    updateFilter,
    setIsFilter,
    setFilterStatus,
    onChangePage,
    onChangePageSize,
    handleUpdateStatus,
    setForm,
    setFieldErrors,
    onChange,
    handleCloseModal,
    setFilterCountry,
  } = useSubsidiaryListViewModel();

  const columns: PaginatedTableColumn<Subsidiary>[] = [
    {
      key: "name",
      header: "Name",
      render: (subsidiary) => (
        <div>
          <div className="flex-1">
            <div className="font-semibold text-[#c89b3c]">
              {subsidiary.name}
            </div>
          </div>
          <div className="text-xs text-gray-500 line-clamp-2">
            {subsidiary.code}
          </div>
        </div>
      ),
    },
    {
      key: "country",
      header: "Country",
      render: (subsidiary) => subsidiary.country ?? "-",
    },
    {
      key: "timezone",
      header: "Time Zone",
      render: (subsidiary) => subsidiary.timezone ?? "-",
    },
    {
      key: "address",
      header: "Address",
      render: (subsidiary) => subsidiary.address ?? "-",
    },
    {
      key: "email",
      header: "Email",
      render: (subsidiary) => subsidiary.email ?? "-",
    },
    {
      key: "isActive",
      header: "Status",
      render: (subsidiary) => (
        <span
          className={
            subsidiary.isActive
              ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400"
              : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-xs text-red-400"
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {subsidiary.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "dT_Created",
      header: "Date Added",
      render: (subsidiary) =>
        subsidiary.dT_Created ? formatDateTime(subsidiary.dT_Created) : "-",
    },
    {
      key: "dT_Updated",
      header: "Date Modified",
      render: (subsidiary) =>
        subsidiary.dT_Updated ? formatDateTime(subsidiary.dT_Updated) : "-",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (subsidiary) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center text-gray-300"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[180px] rounded-lg bg-[#111111] p-1 shadow-xl"
            >
              <DropdownMenu.Item
                onClick={() => {
                  setSelectedSubsidiary(subsidiary);
                  setConfirmOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                <Eye className="w-4 h-4" />
                View Details
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onClick={() => {
                  setSelectedSubsidiary(subsidiary);
                  setConfirmEditOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                <Pencil className="w-4 h-4" />
                Edit Subsidiary
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onSelect={() => {
                  setSelectedSubsidiary(subsidiary);
                  setConfirmOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                {subsidiary.isActive ? (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Deactivate Subsidiary</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Activate Subsidiary</span>
                  </>
                )}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onSelect={() => {
                  setSelectedSubsidiary(subsidiary);
                  setConfirmDeleteOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                <Trash className="w-4 h-4 text-red-400" />
                <span className="text-red-400">Delete Subsidiary</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Subsidiaries</h1>
          <p className="text-sm text-gray-400">
            Manage company subsidiaries and their details.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setConfirmEditOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c89b3c] text-black text-sm font-semibold rounded-lg hover:bg-[#d4a84a]"
        >
          <Plus className="w-4 h-4" />
          New Subsidiary
        </motion.button>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="min-w-0">
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={filters.name}
              onChange={(e) => updateFilter("name", e.target.value)}
              placeholder="Search by name"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Email
            </label>
            <input
              name="email"
              type="text"
              value={filters.email}
              onChange={(e) => updateFilter("email", e.target.value)}
              placeholder="Search by email"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as StatusFilter);
                setIsFilter(true);
              }}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
            >
              <option value="">All Statuses</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold text-gray-300 mb-2">
              Country
            </label>
            <select
              value={filterCountry}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                setIsFilter(true);
              }}
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
            >
              <option value="">All Countries</option>
              {countries.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 overflow-x-auto rounded-xl border border-gray-800">
        <PaginatedTable<Subsidiary>
          data={subsidaries}
          columns={columns}
          isLoading={isLoading}
          isFilter={isFilter}
          emptyTitle="No subsidiary yet. Click “New subsidiary” to create one."
          noResultsTitle="No results found. Try changing your filters."
          setPageNumber={onChangePage}
          setPageSize={onChangePageSize}
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalCount={totalCount}
          totalPages={totalPages}
        />
      </div>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleUpdateStatus}
        title={
          selectedSubsidiary?.isActive
            ? "Deactivate Subsidiary"
            : "Activate Subsidiary"
        }
        description={`Are you sure you want to ${selectedSubsidiary?.isActive ? "deactivate" : "activate"} "${selectedSubsidiary?.name}"?`}
        confirmText={`Yes, ${selectedSubsidiary?.isActive ? "deactivate" : "activate"}`}
        cancelText="No"
        loading={isUpdating}
      />

      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={() => handleCloseModal}
        onConfirm={handleUpdateStatus}
        title="Delete Subsidiary"
        description={`Are you sure you want to delete "${selectedSubsidiary?.name}"?`}
        confirmText={`Yes, delete`}
        cancelText="No"
        loading={isUpdating}
      />

      <EditModal
        open={confirmEditOpen}
        form={form}
        fieldErrors={fieldErrors}
        cancelText="Cancel"
        loading={isUpdating}
        onClose={handleCloseModal}
        onConfirm={handleUpdateStatus}
        setFieldErrors={setFieldErrors}
        onChange={onChange}
      />

      <DetailModal
        open={confirmOpen}
        subsidiary={form}
        onClose={handleCloseModal}
      />
    </div>
  );
}
