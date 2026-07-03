import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { countries } from "countries-list";
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
import { formatDateTime } from "@/app/utils/helper";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import useSubsidiaryListViewModel from "./viewmodel";
import { Subsidiary } from "@/app/interfaces/subsidiary";
import { EditModal } from "./components/edit-modal";
import { DetailModal } from "./components/detail-modal";
import { SearchableSelect } from "@/app/components/searchable-select";
import { statusOptions } from "@/app/constants";
import { useMemo } from "react";
import { useTenant } from "@/tenants/useTenant";
import { PermissionGuard } from "@/app/components/permission-guard";
import { PERMISSIONS } from "@/app/constants/permissions";

export function SubsidiaryList() {
  const { colors } = useTenant();
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
    confirmUpdateStatusOpen,
    selectedSubsidiary,
    isUpdating,
    queryClient,
    filterCountry,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setConfirmUpdateStatusOpen,
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
    handleCreateSubsidiary,
    handleUpdateSubsidiary,
    handleDeleteSubsidiary,
  } = useSubsidiaryListViewModel();

  const countryList = useMemo(() => {
    return [
      { label: "All Countries", value: "all" },
      ...Object.entries(countries).map(([code, country]) => ({
        label: country.name,
        value: country.name,
      })),
    ];
  }, []);

  const columns: PaginatedTableColumn<Subsidiary>[] = [
    {
      key: "name",
      header: "Name",
      render: (subsidiary) => (
        <div>
          <div className="flex-1">
            <div className="font-semibold" style={{ color: colors.text }}>
              {subsidiary.name}
            </div>
          </div>
          <div className="text-xs" style={{ color: colors.text }}>
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
      key: "status",
      header: "Status",
      render: (subsidiary) => (
        <span
          className={
            subsidiary.status === "Active"
              ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400"
              : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-xs text-red-400"
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {subsidiary.status}
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
      key: "dT_Modified",
      header: "Date Modified",
      render: (subsidiary) =>
        subsidiary.dT_Modified ? formatDateTime(subsidiary.dT_Modified) : "-",
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
              className="z-50 min-w-[180px] rounded-lg p-1 shadow-xl"
              style={{ backgroundColor: colors.bg, border: colors.border }}
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

              <PermissionGuard permission={PERMISSIONS.subsidiaryUpdate}>
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
              </PermissionGuard>

              <PermissionGuard permission={PERMISSIONS.subsidiaryUpdate}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedSubsidiary(subsidiary);
                    setConfirmUpdateStatusOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
                >
                  {subsidiary.status === "Active" ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">
                        Deactivate Subsidiary
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">
                        Activate Subsidiary
                      </span>
                    </>
                  )}
                </DropdownMenu.Item>
              </PermissionGuard>

              <PermissionGuard permission={PERMISSIONS.subsidiaryUpdate}>
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
              </PermissionGuard>
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
        <PermissionGuard permission={PERMISSIONS.subsidiaryCreate}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setConfirmEditOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg"
            style={{ backgroundColor: colors.accent }}
          >
            <Plus className="w-4 h-4" />
            New Subsidiary
          </motion.button>
        </PermissionGuard>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="min-w-0">
            <label className="block text-xs font-semibold mb-2">Name</label>
            <input
              name="name"
              type="text"
              value={filters.name}
              onChange={(e) => updateFilter("name", e.target.value)}
              placeholder="Search by name"
              className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold mb-2">Email</label>
            <input
              name="email"
              type="text"
              value={filters.email}
              onChange={(e) => updateFilter("email", e.target.value)}
              placeholder="Search by email"
              className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setIsFilter(true);
              }}
              className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((opt) => (
                <option key={opt.label2} value={opt.label2}>
                  {opt.label2}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-0">
            <label className="block text-xs font-semibold mb-2">Country</label>
            <SearchableSelect
              name="country"
              value={filterCountry}
              options={countryList}
              onChange={(e) => {
                setFilterCountry(e.target.value);
                setIsFilter(true);
              }}
              placeholder="All Countries"
              className="w-full rounded-lg px-4 py-3 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
              styles={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 overflow-x-auto rounded-xl">
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
        open={confirmUpdateStatusOpen}
        onClose={() => setConfirmUpdateStatusOpen(false)}
        onConfirm={() => {
          const status =
            selectedSubsidiary?.status === "Active" ? "Inactive" : "Active";
          handleUpdateStatus(status);
        }}
        title={
          selectedSubsidiary?.status === "Active"
            ? "Deactivate Subsidiary"
            : "Activate Subsidiary"
        }
        description={`Are you sure you want to ${selectedSubsidiary?.status === "Active" ? "deactivate" : "activate"} "${selectedSubsidiary?.name}"?`}
        confirmText={`Yes, ${selectedSubsidiary?.status === "Active" ? "deactivate" : "activate"}`}
        cancelText="No"
        loading={isUpdating}
      />

      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteSubsidiary}
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
        onConfirm={
          selectedSubsidiary ? handleUpdateSubsidiary : handleCreateSubsidiary
        }
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
