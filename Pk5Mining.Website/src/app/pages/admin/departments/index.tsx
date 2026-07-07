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
import { Department } from "@/app/interfaces/department";
import { DetailModal } from "./components/details-modal";
import { EditModal } from "./components/edit-modal";
import useDepartmentViewModel from "./viewmodel";
import { useTenant } from "@/tenants/useTenant";
import { PERMISSIONS } from "@/app/constants/permissions";
import { PermissionGuard } from "@/app/components/permission-guard";

export function Departments() {
  const { colors } = useTenant();
  const {
    departments,
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
    confirmViewOpen,
    selectedDepartment,
    isUpdating,
    queryClient,
    setConfirmOpen,
    setConfirmDeleteOpen,
    setConfirmEditOpen,
    setConfirmViewOpen,
    setSelectedDepartment,
    updateFilter,
    setIsFilter,
    setFilterStatus,
    onChangePage,
    onChangePageSize,
    // handleUpdateStatus,
    handleUpdateDepartmentStatus,
    setForm,
    setFieldErrors,
    onChange,
    handleCloseModal,
    handleDeleteDepartment,
    handleUpdateDepartment,
    handleCreateDepartment,
  } = useDepartmentViewModel();

  const columns: PaginatedTableColumn<Department>[] = [
    {
      key: "name",
      header: "Name",
      render: (dept) => (
        <div>
          <div className="flex-1">
            <div className="font-semibold" style={{ color: colors.text }}>
              {dept.name}
            </div>
          </div>
          <div
            className="max-w-xs truncate text-[15px]"
            style={{ color: colors.text }}
          >
            {dept.description}
          </div>
        </div>
      ),
    },
    {
      key: "isActive",
      header: "Status",
      render: (dept) => {
        const isActive = dept.isActive === true;

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
      render: (dept) =>
        dept.dT_Created ? formatDateTime(dept.dT_Created) : "-",
    },
    {
      key: "dT_Modified",
      header: "Date Modified",
      render: (dept) =>
        dept.dT_Modified ? formatDateTime(dept.dT_Modified) : "-",
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      className: "text-right",
      render: (dept) => (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center"
              style={{ color: colors.text, backgroundColor: colors.card }}
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={6}
              className="z-50 min-w-[180px] rounded-lg p-1 shadow-xl"
              style={{ backgroundColor: colors.card, border: colors.border }}
            >
              <DropdownMenu.Item
                onClick={() => {
                  setSelectedDepartment(dept);
                  setConfirmViewOpen(true);
                }}
                className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
              >
                <Eye className="w-4 h-4" />
                View details
              </DropdownMenu.Item>

              <PermissionGuard permission={PERMISSIONS.departmentUpdate}>
                <DropdownMenu.Item
                  onClick={() => {
                    setSelectedDepartment(dept);
                    setConfirmEditOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Department
                </DropdownMenu.Item>
              </PermissionGuard>

              <PermissionGuard permission={PERMISSIONS.departmentUpdate}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedDepartment(dept);
                    setConfirmOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                >
                  {dept.isActive ? (
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

              <PermissionGuard permission={PERMISSIONS.departmentUpdate}>
                <DropdownMenu.Item
                  onSelect={() => {
                    setSelectedDepartment(dept);
                    setConfirmDeleteOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-[16px] rounded-md hover:bg-black/5 cursor-pointer outline-none focus:outline-none focus:bg-black/5"
                >
                  <Trash className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">Delete Department</span>
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
          <h1 className="text-[18px] font-bold mb-1">Departments</h1>
          <p className="text-[15px] text-gray-400">
            Manage departments and their configurations.
          </p>
        </div>

        <PermissionGuard permission={PERMISSIONS.departmentCreate}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setConfirmEditOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-[16px] font-semibold rounded-lg"
            style={{ backgroundColor: colors.accent, color: colors.card }}
          >
            <Plus className="w-4 h-4" />
            New Department
          </motion.button>
        </PermissionGuard>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="w-full sm:w-[760px]">
            <input
              name="name"
              type="text"
              value={filters.name}
              onChange={(e) => updateFilter("name", e.target.value)}
              placeholder="Search by name"
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none"
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
              className="w-full rounded-lg px-4 py-3 text-[16px] outline-none"
              style={{
                backgroundColor: colors.textInputBgColor,
                color: colors.text,
              }}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label2}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="min-w-0 overflow-x-auto rounded-xl">
        <PaginatedTable<Department>
          data={departments}
          columns={columns}
          isLoading={isLoading}
          isFilter={isFilter}
          emptyTitle="No department yet. Click “New department” to create one."
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
        // onConfirm={handleUpdateStatus}
        onConfirm={handleUpdateDepartmentStatus}
        title={
          selectedDepartment?.isActive
            ? "Deactivate Department"
            : "Activate Department"
        }
        description={`Are you sure you want to ${selectedDepartment?.isActive ? "deactivate" : "activate"} "${selectedDepartment?.name}"?`}
        confirmText={`Yes, ${selectedDepartment?.isActive ? "deactivate" : "activate"}`}
        cancelText="No"
        loading={isUpdating}
      />

      <ConfirmModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleDeleteDepartment}
        title="Delete Department"
        description={`Are you sure you want to delete "${selectedDepartment?.name}"?`}
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
          selectedDepartment ? handleUpdateDepartment : handleCreateDepartment
        }
        setFieldErrors={setFieldErrors}
        onChange={onChange}
      />

      <DetailModal
        open={confirmViewOpen}
        department={form}
        onClose={handleCloseModal}
      />
    </div>
  );
}
