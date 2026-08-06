import { useMemo } from "react";
import { motion } from "motion/react";
import {
  Eye,
  MoreVerticalIcon,
  Pencil,
  XCircle,
  CheckCircle2,
  Trash,
  Plus,
  KeyRound,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { formatDateTime } from "@/app/utils/helper";
import useUserListViewModel from "./viewmodel";
import { User } from "@/app/interfaces/user";
import { StatusFilter } from "@/app/interfaces";
import { EditModal } from "./components/edit-modal";
import { DetailModal } from "./components/detail-modal";
import { ChangePasswordModal } from "./components/change-password-modal";
import { useTenant } from "@/tenants/useTenant";
import { PermissionGuard } from "@/app/components/permission-guard";
import { PERMISSIONS } from "@/app/constants/permissions";

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export function UserList() {
  const { colors } = useTenant();
  const {
    users,
    totalCount,
    totalPages,
    filters,
    filterStatus,
    isFilter,
    pageNumber,
    pageSize,
    isLoading,
    selectedUser,
    form,
    fieldErrors,
    confirmOpen,
    confirmEditOpen,
    confirmDeleteOpen,
    changePasswordOpen,
    isProcessing,
    confirmUpdateStatusOpen,
    roles,
    departments,
    onChange,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
    setSelectedUser,
    handleDeleteUser,
    handleCreateUser,
    handleUpdateUser,
    setConfirmOpen,
    setConfirmEditOpen,
    setConfirmDeleteOpen,
    handleCloseModal,
    setFieldErrors,
    setChangePasswordOpen,
    handleChangeUserPassword,
    handleActivateDeactivateUser,
    setConfirmUpdateStatusOpen,
  } = useUserListViewModel();

  const columns: PaginatedTableColumn<User>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        render: (user) => (
          <div className="space-y-0.5">
            <div
              className="font-semibold capitalize text-[16px]"
              style={{ color: colors.text }}
            >
              {user.firstName} {user.lastName}
            </div>
            <div className="text-[15px]" style={{ color: colors.text }}>
              {user.email}
            </div>
          </div>
        ),
      },
      {
        key: "role",
        header: "Role",
        render: (user) => (
          <span className="text-[16px]" style={{ color: colors.text }}>
            {user.userRole?.name ?? "-"}
          </span>
        ),
      },
      {
        key: "department",
        header: "Department",
        render: (user) => (
          <span className="text-[16px]" style={{ color: colors.text }}>
            {user.department?.name ?? "-"}
          </span>
        ),
      },
      {
        key: "isActive",
        header: "Status",
        render: (user) => {
          const isActive = user.isActive;

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
        render: (user) =>
          user.dT_Created ? formatDateTime(user.dT_Created) : "-",
      },
      {
        key: "actions",
        header: "Actions",
        headerClassName: "text-right",
        className: "text-right",
        render: (user) => (
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
                style={{ backgroundColor: colors.card }}
              >
                <DropdownMenu.Item
                  onClick={() => {
                    setSelectedUser(user);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                  style={{ color: colors.text }}
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </DropdownMenu.Item>

                <PermissionGuard permission={PERMISSIONS.userUpdate}>
                  <DropdownMenu.Item
                    onClick={() => {
                      setSelectedUser(user);
                      setConfirmEditOpen(true);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                    style={{ color: colors.text }}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit User
                  </DropdownMenu.Item>
                </PermissionGuard>

                <PermissionGuard permission={PERMISSIONS.userUpdate}>
                  <DropdownMenu.Item
                    onSelect={() => {
                      setSelectedUser(user);
                      setConfirmUpdateStatusOpen(true);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                    style={{ color: colors.text }}
                  >
                    {user.isActive ? (
                      <>
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="text-red-600">Deactivate User</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Activate User</span>
                      </>
                    )}
                  </DropdownMenu.Item>
                </PermissionGuard>

                <PermissionGuard permission={PERMISSIONS.userUpdate}>
                  <DropdownMenu.Item
                    onSelect={() => {
                      setSelectedUser(user);
                      setConfirmDeleteOpen(true);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                    style={{ color: colors.text }}
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                    <span className="text-red-600">Remove User</span>
                  </DropdownMenu.Item>
                </PermissionGuard>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold mb-1">Users</h1>
          <p className="text-[18px]" style={{ color: colors.text }}>
            Manage user accounts, status, and access.
          </p>
        </div>
        <PermissionGuard permission={PERMISSIONS.userCreate}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSelectedUser(null); // Resets form for "New User"
              setConfirmEditOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2 text-[16px] font-semibold rounded-lg"
            style={{ backgroundColor: colors.accent, color: colors.card }}
          >
            <Plus className="w-4 h-4" />
            New User
          </motion.button>
        </PermissionGuard>
      </div>

      <div className="space-y-3 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <div className="min-w-0">
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Name
            </label>
            <input
              name="name"
              type="text"
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
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Email
            </label>
            <input
              name="email"
              type="text"
              value={filters.email}
              onChange={(e) => updateFilter("email", e.target.value)}
              placeholder="Search by email"
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none focus:border-[#c89b3c]"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            />
          </div>

          <div className="min-w-0">
            <label
              className="block text-[16px] font-semibold mb-2"
              style={{ color: colors.text }}
            >
              Status
            </label>
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
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <PaginatedTable<User>
        columns={columns}
        data={users}
        isLoading={isLoading}
        pageNumber={pageNumber}
        pageSize={pageSize}
        totalPages={totalPages}
        totalCount={totalCount}
        isFilter={isFilter}
        setPageNumber={onChangePage}
        setPageSize={onChangePageSize}
        emptyTitle="No users found"
        noResultsTitle="No results found. Try changing your filters."
      />

      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteUser}
        loading={isProcessing}
        title="Remove User"
        description={
          selectedUser
            ? `Are you sure you want to remove ${selectedUser.firstName} ${selectedUser.lastName} from this application?`
            : undefined
        }
        confirmText="Remove"
        cancelText="Cancel"
      />

      <ConfirmModal
        open={confirmUpdateStatusOpen && !!selectedUser}
        onClose={handleCloseModal}
        onConfirm={() => handleActivateDeactivateUser(!selectedUser?.isActive)}
        loading={isProcessing}
        title={selectedUser?.isActive ? "Deactivate user" : "Activate user"}
        description={
          selectedUser?.isActive
            ? `This will prevent ${selectedUser.email} from accessing the portal.`
            : `This will allow ${selectedUser?.email} to access the portal.`
        }
        confirmText={selectedUser?.isActive ? "Deactivate" : "Activate"}
        cancelText="Cancel"
      />

      <EditModal
        open={confirmEditOpen}
        form={form}
        fieldErrors={fieldErrors}
        roles={roles}
        departments={departments}
        onClose={handleCloseModal}
        onConfirm={selectedUser ? handleUpdateUser : handleCreateUser}
        setFieldErrors={setFieldErrors}
        onChange={onChange}
        loading={isProcessing}
      />

      <DetailModal
        open={confirmOpen && !!selectedUser}
        user={form}
        onClose={handleCloseModal}
      />

      <ChangePasswordModal
        user={selectedUser}
        open={changePasswordOpen}
        isUpdating={isProcessing}
        onClose={handleCloseModal}
        onConfirm={handleChangeUserPassword}
      />
    </div>
  );
}
