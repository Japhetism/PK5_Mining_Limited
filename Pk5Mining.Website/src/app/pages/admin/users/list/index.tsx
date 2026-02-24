import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Eye, Trash2, Power } from "lucide-react";

import { getUsers, deleteUser, updateUserStatus } from "@/app/api/users";
import { UsersQuery, UserDto } from "@/app/interfaces";
import {
  PaginatedTable,
  PaginatedTableColumn,
} from "@/app/components/ui/paginated-table";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { formatDateTime, toNumber } from "@/app/utils/helper";
import { UserStatusPill } from "@/app/components/ui/user-status-pill";
import useUserListViewModel from "./viewmodel";
import { set } from "date-fns";

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
    updateFilter,
    onChangePage,
    onChangePageSize,
    setFilterStatus,
    setIsFilter,
  } = useUserListViewModel();

  const columns: PaginatedTableColumn<UserDto>[] = useMemo(
    () => [
      {
        key: "name",
        header: "Name",
        render: (u) => (
          <div className="space-y-0.5">
            <div className="text-sm text-gray-100">
              {u.firstName} {u.lastName}
            </div>
            <div className="text-xs text-gray-400">{u.email}</div>
          </div>
        ),
      },
      {
        key: "role",
        header: "Role",
        render: (u) => (
          <span className="text-xs text-gray-300">{u.role ?? "-"}</span>
        ),
        className: "w-[160px]",
      },
      {
        key: "status",
        header: "Status",
        render: (u) => <UserStatusPill isActive={u.isActive} />,
        className: "w-[120px]",
      },
      {
        key: "dT_Created",
        header: "Created",
        render: (u) => (
          <span className="text-xs text-gray-400">
            {formatDateTime(u.dT_Created)}
          </span>
        ),
        className: "w-[170px]",
      },
      {
        key: "actions",
        header: "Actions",
        render: (u) => (
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/users/${u.id}`}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
            >
              <Eye size={14} />
              View
            </Link>

            <button
              type="button"
              // onClick={() => setToggleTarget(u)}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
            >
              <Power size={14} />
              {u.isActive ? "Deactivate" : "Activate"}
            </button>

            <button
              type="button"
              // onClick={() => setDeleteTarget(u)}
              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        ),
        className: "w-[320px]",
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
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="w-full sm:w-[500px]">
            <input
              name="search"
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="Search by name, email, subject..."
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as string);
              setIsFilter(true);
            }}
            className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
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

      <PaginatedTable<UserDto>
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
      {/* <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        title="Delete user"
        description={
          deleteTarget
            ? `Are you sure you want to delete ${deleteTarget.firstName} ${deleteTarget.lastName}?`
            : undefined
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteMutation.isPending}
      /> */}

      {/* Activate/Deactivate confirm */}
      {/* <ConfirmModal
        open={!!toggleTarget}
        onClose={() => setToggleTarget(null)}
        onConfirm={() =>
          toggleTarget &&
          toggleMutation.mutate({
            id: toggleTarget.id,
            isActive: !toggleTarget.isActive,
          })
        }
        title={toggleTarget?.isActive ? "Deactivate user" : "Activate user"}
        description={
          toggleTarget
            ? toggleTarget.isActive
              ? `This will prevent ${toggleTarget.email} from accessing the portal.`
              : `This will allow ${toggleTarget.email} to access the portal.`
            : undefined
        }
        confirmText={toggleTarget?.isActive ? "Deactivate" : "Activate"}
        cancelText="Cancel"
        loading={toggleMutation.isPending}
      /> */}
    </div>
  );
}
