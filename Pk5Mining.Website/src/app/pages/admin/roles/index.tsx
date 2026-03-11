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
import { statusOptions } from "@/app/constants";
import useRoleViewModel from "./viewmodel";
import { Subsidiary } from "@/app/interfaces/subsidiary";
import { Role } from "@/app/interfaces/role";
import { EditModal } from "./components/edit-modal";

export function Roles() {
  const {
    roles,
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
    selectedRole,
    isUpdating,
    queryClient,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setSelectedRole,
    updateFilter,
    setIsFilter,
    setFilterStatus,
    onChangePage,
    onChangePageSize,
    handleUpdateStatus,
    setForm,
    setFieldErrors,
    onChange,
    handleCloseEditModal,
  } = useRoleViewModel();

  const columns: PaginatedTableColumn<Role>[] = [
    {
      key: "name",
      header: "Name",
      render: (role) => (
        <div>
          <div className="flex-1">
            <div className="font-semibold text-[#c89b3c]">{role.name}</div>
          </div>
          <div className="text-xs text-gray-500 line-clamp-2">{role.description}</div>
        </div>
      ),
    },
    {
      key: "isSystem",
      header: "System Role",
      render: (role) => role.isSystem ?? "-",
    },
    {
      key: "isActive",
      header: "Status",
      render: (role) => (
        <span
          className={
            role.isActive
              ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400"
              : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-xs text-red-400"
          }
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {role.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "dT_Created",
      header: "Date Added",
      render: (role) => (role.dT_Created ? formatDateTime(role.dT_Created) : "-"),
    },
    {
      key: "dT_Updated",
      header: "Date Modified",
      render: (role) => (role.dT_Updated ? formatDateTime(role.dT_Updated) : "-"),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (role) => (
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
              <DropdownMenu.Item asChild>
                <Link
                  to={`/admin/roles/${role.id}`}
                  onClick={() => {
                    queryClient.setQueryData(["roles", String(role.id)], role);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 outline-none focus:outline-none focus:bg-white/10"
                >
                  <Eye className="w-4 h-4" />
                  View details
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <button
                  onClick={() => {
                    setSelectedRole(role)
                    setConfirmEditOpen(true)
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 outline-none focus:outline-none focus:bg-white/10"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Role
                </button>
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onSelect={() => {
                  setSelectedRole(role);
                  setConfirmOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                {role.isActive ? (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Activate
                  </>
                )}
              </DropdownMenu.Item>

              <DropdownMenu.Item
                onSelect={() => {
                  setSelectedRole(role);
                  setConfirmDeleteOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
              >
                <Trash className="w-4 h-4 text-red-400" />
                Delete Role
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
          <h1 className="text-xl sm:text-2xl font-bold mb-1">Roles</h1>
          <p className="text-sm text-gray-400">
            Manage roles and permission assignments.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setConfirmEditOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c89b3c] text-black text-sm font-semibold rounded-lg hover:bg-[#d4a84a]"
        >
          <Plus className="w-4 h-4" />
          New Role
        </motion.button>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-[760px]">
            <input
              name="search"
              type="search"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="Search by name"
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <div className="min-w-0">
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
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 overflow-x-auto rounded-xl border border-gray-800">
        <PaginatedTable<Role>
          data={roles}
          columns={columns}
          isLoading={isLoading}
          isFilter={isFilter}
          emptyTitle="No role yet. Click “New role” to create one."
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
          selectedRole?.isActive ? "Deactivate Role" : "Activate Role"
        }
        description={`Are you sure you want to ${selectedRole?.isActive ? "deactivate" : "activate"} "${selectedRole?.name}"?`}
        confirmText={`Yes, ${selectedRole?.isActive ? "deactivate" : "activate"}`}
        cancelText="No"
        loading={isUpdating}
      />

      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleUpdateStatus}
        title="Delete Role"
        description={`Are you sure you want to delete "${selectedRole?.name}"?`}
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
        onClose={handleCloseEditModal}
        onConfirm={handleUpdateStatus}
        setFieldErrors={setFieldErrors}
        onChange={onChange}
      />
    </div>
  );
}
