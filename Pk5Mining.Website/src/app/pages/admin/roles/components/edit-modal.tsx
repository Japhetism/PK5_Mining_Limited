import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { Role, RoleErrors } from "@/app/interfaces/role";
import { getGroupedPermissions } from "@/app/utils/helper";
import { Permission } from "@/app/interfaces/permission";
import { Subsidiary } from "@/app/interfaces/subsidiary";
import { SearchableSelect } from "@/app/components/searchable-select";

type EditModalProps = {
  form: Role;
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  fieldErrors: any;
  permissions: Permission[];
  permissionError: any;
  subsidiaries: Subsidiary[];
  onClose: () => void;
  onConfirm: () => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<RoleErrors>>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  handlePermissionToggle: (newPermissions: number[]) => void;
};

export function EditModal({
  form,
  open,
  loading = false,
  fieldErrors,
  permissions,
  permissionError,
  subsidiaries,
  onClose,
  onConfirm,
  setFieldErrors,
  onChange,
  handlePermissionToggle,
}: EditModalProps) {
  const groupedPermissions = getGroupedPermissions(permissions);

  console.log("subsidiaries in modal", subsidiaries);

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="lg"
      height="md"
      showCloseButton={false}
      panelClassName="h-auto"
    >
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-200 truncate">
                {form.id ? "Update" : "Create"} Role
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="p-2 rounded-md hover:bg-white/10 text-gray-300"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-full">
            <form
              // onSubmit={onSubmit}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Subsidiary
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <SearchableSelect
                    name="subsidiaryId"
                    value={form.subsidiaryId ?? ""}
                    options={subsidiaries.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    error={fieldErrors.subsidiaryId}
                    onChange={onChange}
                    placeholder="Select subsidiary"
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                      ${fieldErrors.subsidiaryId ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.name)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          title: "Invalid role name",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.name;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.name ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-4 flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                    <label className="text-xs font-semibold text-gray-300 tracking-wider">
                      Permissions
                    </label>
                    <span className="text-[10px] text-gray-500 italic">
                      {form.permissionIds?.length || 0} selected
                    </span>
                  </div>

                  {/* Scrollable Table */}
                  <div className="h-[350px] overflow-y-auto pr-2 scrollbar-black border border-gray-800 rounded-lg">
                    <table className="w-full text-left border-collapse">
                      {/* Sticky Header */}
                      <thead className="sticky top-0 bg-[#0f0f0f] z-10 shadow-sm">
                        <tr className="border-b border-gray-800">
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-1/3">
                            Resource / Group
                          </th>
                          <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      {/* Body */}
                      <tbody className="divide-y divide-gray-800/50">
                        {groupedPermissions.map((group) => {
                          const currentPerms = form.permissionIds || [];

                          const selectedInGroup = group.permissions.filter(
                            (p) => currentPerms.includes(p.id),
                          );

                          const isAllSelected =
                            selectedInGroup.length === group.permissions.length;

                          const isIndeterminate =
                            selectedInGroup.length > 0 && !isAllSelected;

                          return (
                            <tr
                              key={group.key}
                              className="hover:bg-white/[0.02] transition-colors group/row"
                            >
                              {/* Group Label & Select All */}
                              <td className="px-4 py-4 align-top">
                                <div
                                  className="flex items-center gap-3 cursor-pointer"
                                  onClick={() => {
                                    const groupIds = group.permissions.map(
                                      (p) => p.id,
                                    );

                                    const next = isAllSelected
                                      ? currentPerms.filter(
                                          (id) => !groupIds.includes(id),
                                        )
                                      : Array.from(
                                          new Set([
                                            ...currentPerms,
                                            ...groupIds,
                                          ]),
                                        );

                                    handlePermissionToggle(next);
                                  }}
                                >
                                  <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                      isAllSelected || isIndeterminate
                                        ? "bg-[#c89b3c] border-[#c89b3c]"
                                        : "border-gray-600 group-hover/row:border-gray-400"
                                    }`}
                                  >
                                    {isAllSelected && (
                                      <Check className="w-3 h-3 text-black stroke-[3px]" />
                                    )}
                                    {isIndeterminate && (
                                      <div className="w-2 h-0.5 bg-black" />
                                    )}
                                  </div>

                                  <span className="text-xs font-bold text-gray-200 group-hover/row:text-[#c89b3c] transition-colors">
                                    {group.name}
                                  </span>
                                </div>
                              </td>

                              {/* Individual Permissions */}
                              <td className="px-4 py-4">
                                <div className="flex flex-wrap gap-x-6 gap-y-3">
                                  {group.permissions.map((perm) => {
                                    const isChecked = currentPerms.includes(
                                      perm.id,
                                    );

                                    const label =
                                      perm.name?.split(".")[1]?.toUpperCase() ||
                                      perm.name.toUpperCase();

                                    return (
                                      <label
                                        key={perm.id}
                                        className="flex items-center gap-2.5 cursor-pointer group/item"
                                      >
                                        <input
                                          type="checkbox"
                                          className="sr-only"
                                          checked={isChecked}
                                          onChange={() => {
                                            const next = isChecked
                                              ? currentPerms.filter(
                                                  (id) => id !== perm.id,
                                                )
                                              : [...currentPerms, perm.id];

                                            handlePermissionToggle(next);
                                          }}
                                        />

                                        <div
                                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all ${
                                            isChecked
                                              ? "bg-[#c89b3c] border-[#c89b3c]"
                                              : "border-gray-700 group-hover/item:border-gray-500"
                                          }`}
                                        >
                                          {isChecked && (
                                            <Check className="w-2.5 h-2.5 text-black stroke-[4px]" />
                                          )}
                                        </div>

                                        <span
                                          className={`text-[11px] transition-colors ${
                                            isChecked
                                              ? "text-gray-200"
                                              : "text-gray-500 group-hover/item:text-gray-300"
                                          }`}
                                        >
                                          {label}
                                        </span>
                                      </label>
                                    );
                                  })}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Close
          </button>

          <motion.button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            {loading ? "Processing..." : form.id ? "Update" : "Create"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
