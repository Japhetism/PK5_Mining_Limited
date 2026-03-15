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

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;

export function UserList() {
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
    onChange,
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
    setSelectedUser,
    handleDeleteUser,
    handleCreateuser,
    handleUpdateUser,
    setConfirmOpen,
    setConfirmEditOpen,
    setConfirmDeleteOpen,
    handleCloseModal,
    setFilters,
    setFieldErrors,
  } = useUserListViewModel();

  const columns: PaginatedTableColumn<User>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        render: (user) => (
          <div className="space-y-0.5">
            <div className="text-sm text-gray-100">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-400">{user.email}</div>
          </div>
        ),
      },
      {
        key: "phone",
        header: "Phone Number",
        render: (user) => (
          <span className="text-xs text-gray-300">{user.phone ?? "-"}</span>
        ),
      },
      {
        key: "isActive",
        header: "Status",
        render: (user) => (
          <span
            className={
              user.isActive
                ? "inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400"
                : "inline-flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-xs text-red-400"
            }
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {user.isActive ? "Active" : "Inactive"}
          </span>
        ),
      },
      {
        key: "dT_Created",
        header: "Date Added",
        render: (user) =>
          user.dT_Created ? formatDateTime(user.dT_Created) : "-",
      },
      {
        key: "dT_Updated",
        header: "Date Modified",
        render: (user) =>
          user.dT_Updated ? formatDateTime(user.dT_Updated) : "-",
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
                    setSelectedUser(user);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onClick={() => {
                    setSelectedUser(user);
                    setConfirmEditOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
                >
                  <Pencil className="w-4 h-4" />
                  Edit User
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedUser(user);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
                >
                  {user.isActive ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">Deactivate User</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Activate User</span>
                    </>
                  )}
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedUser(user);
                    setConfirmDeleteOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
                >
                  <Trash className="w-4 h-4 text-red-400" />
                  <span className="text-red-400">Delete User</span>
                </DropdownMenu.Item>

                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedUser(user);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-white/10 cursor-pointer outline-none focus:outline-none focus:bg-white/10"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Change Password</span>
                </DropdownMenu.Item>
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
          <p className="text-sm text-gray-400">
            Manage user accounts, status, and access.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setConfirmEditOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#c89b3c] text-black text-sm font-semibold rounded-lg hover:bg-[#d4a84a]"
        >
          <Plus className="w-4 h-4" />
          New User
        </motion.button>
      </div>

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
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              value={filters.phone}
              onChange={(e) => updateFilter("phone", e.target.value)}
              placeholder="Search by phone number"
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

      {/* Delete confirm */}
      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleDeleteUser()}
        title="Delete user"
        description={
          selectedUser
            ? `Are you sure you want to delete ${selectedUser?.firstName} ${selectedUser?.lastName}?`
            : undefined
        }
        confirmText="Delete"
        cancelText="Cancel"
        // loading={deleting}
      />

      {/* Activate/Deactivate confirm */}
      <ConfirmModal
        open={confirmOpen}
        onClose={handleCloseModal}
        onConfirm={() => handleUpdateUser()}
        title={selectedUser?.isActive ? "Deactivate user" : "Activate user"}
        description={
          selectedUser
            ? selectedUser?.isActive
              ? `This will prevent ${selectedUser?.email} from accessing the portal.`
              : `This will allow ${selectedUser?.email} to access the portal.`
            : undefined
        }
        confirmText={selectedUser?.isActive ? "Deactivate" : "Activate"}
        cancelText="Cancel"
        // loading={updating}
      />

      <EditModal
        open={confirmEditOpen}
        form={form}
        fieldErrors={fieldErrors}
        cancelText="Cancel"
        //loading={isUpdating}
        onClose={handleCloseModal}
        onConfirm={handleUpdateUser}
        setFieldErrors={setFieldErrors}
        onChange={onChange}
      />

      <DetailModal
        open={confirmOpen}
        user={form}
        onClose={handleCloseModal}
      />
    </div>
  );
}
