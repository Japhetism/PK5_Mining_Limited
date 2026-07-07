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
import { Role } from "@/app/interfaces/role";
import { EditModal } from "./components/edit-modal";
import { DetailModal } from "./components/detail-modal";
import useRoleViewModel from "./viewmodel";
import { useTenant } from "@/tenants/useTenant";
import { PermissionGuard } from "@/app/components/permission-guard";
import { PERMISSIONS } from "@/app/constants/permissions";

export function Roles() {
  const { colors } = useTenant();
  9;
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
    confirmUpdateStatusOpen,
    selectedRole,
    isUpdating,
    queryClient,
    permissions,
    permissionError,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setConfirmUpdateStatusOpen,
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
    handleCloseModal,
    handlePermissionToggle,
    handleCreateRole,
    handleUpdateRole,
    handleDeleteRole,
  } = useRoleViewModel();

  const columns: PaginatedTableColumn<Role>[] = [
    {
      key: "name",
      header: "Name",
      render: (role) => (
        <div>
          <div className="flex-1">
            <div className="font-semibold" style={{ color: colors.text }}>
              {role.name}
            </div>
          </div>
          <div className="text-[13px]" style={{ color: colors.text }}>
            {role.description}
          </div>
        </div>
      ),
    },
    {
      key: "isSystem",
      header: "System Role",
      render: (role) => (
        <span
          className="inline-flex items-center gap-1 rounded-full bg-grey-600/10 px-2 py-0.5 text-[16px]"
          style={{ color: colors.text }}
        >
          {role.isSystem ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (role) => {
        const isActive = role.status?.toLowerCase() === "active";

        return (
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-0.5 text-[14px] text-[#111827] ${
              isActive ? "bg-[#B9F6B5]" : "bg-[#F6C2B5]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isActive ? "bg-[#308A1E]" : "bg-[#BF3E17]"
              }`}
            />
            <span>{isActive ? "Active" : "Inactive"}</span>
          </span>
        );
      },
    },
    {
      key: "dT_Created",
      header: "Date Added",
      render: (role) =>
        role.dT_Created ? formatDateTime(role.dT_Created) : "-",
    },
    {
      key: "dT_Modified",
      header: "Date Modified",
      render: (role) =>
        role.dT_Modified ? formatDateTime(role.dT_Modified) : "-",
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
              className="inline-flex h-8 w-8 items-center justify-center"
              style={{ color: colors.text }}
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[180px] rounded-lg p-1 shadow-xl"
              style={{ backgroundColor: colors.card, color: colors.text }}
            >
              <DropdownMenu.Item
                onClick={() => {
                  setSelectedRole(role);
                  setConfirmOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                style={{ color: colors.text }}
              >
                <Eye className="w-4 h-4" />
                View details
              </DropdownMenu.Item>

              <PermissionGuard permission={PERMISSIONS.roleUpdate}>
                <DropdownMenu.Item
                  onClick={() => {
                    setSelectedRole(role);
                    setConfirmEditOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                  style={{ color: colors.text }}
                >
                  <Pencil className="w-4 h-4" />
                  Edit Role
                </DropdownMenu.Item>
              </PermissionGuard>

              <PermissionGuard permission={PERMISSIONS.roleUpdate}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedRole(role);
                    setConfirmUpdateStatusOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                  style={{ color: colors.text }}
                >
                  {role.status === "Active" ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-red-600">Deactivate</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Activate</span>
                    </>
                  )}
                </DropdownMenu.Item>
              </PermissionGuard>

              <PermissionGuard permission={PERMISSIONS.roleUpdate}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedRole(role);
                    setConfirmDeleteOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                  style={{ color: colors.text }}
                >
                  <Trash className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">Delete Role</span>
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
          <h1
            className="text-[18px] font-bold mb-1"
            style={{ color: colors.text }}
          >
            Roles
          </h1>
          <p className="text-[15px]" style={{ color: colors.text }}>
            Manage roles and permission assignments.
          </p>
        </div>

        <PermissionGuard permission={PERMISSIONS.roleCreate}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setConfirmEditOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 text-[16px] font-semibold rounded-lg"
            style={{ color: colors.card, backgroundColor: colors.accent }}
          >
            <Plus className="w-4 h-4" />
            New Role
          </motion.button>
        </PermissionGuard>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-[760px]">
            <input
              name="name"
              type="search"
              value={filters.name}
              onChange={(e) => updateFilter("name", e.target.value)}
              placeholder="Search by name"
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          <div className="min-w-0">
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value as StatusFilter);
                setIsFilter(true);
              }}
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
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
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 overflow-x-auto rounded-xl">
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
        open={confirmUpdateStatusOpen}
        onClose={handleCloseModal}
        onConfirm={handleUpdateStatus}
        title={selectedRole?.isActive ? "Deactivate Role" : "Activate Role"}
        description={`Are you sure you want to ${selectedRole?.isActive ? "deactivate" : "activate"} "${selectedRole?.name}"?`}
        confirmText={`Yes, ${selectedRole?.isActive ? "deactivate" : "activate"}`}
        cancelText="No"
        loading={isUpdating}
      />

      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteRole}
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
        permissions={permissions}
        permissionError={permissionError}
        onClose={handleCloseModal}
        onConfirm={selectedRole ? handleUpdateRole : handleCreateRole}
        setFieldErrors={setFieldErrors}
        onChange={onChange}
        handlePermissionToggle={handlePermissionToggle}
      />

      <DetailModal open={confirmOpen} role={form} onClose={handleCloseModal} />
    </div>
  );
}
