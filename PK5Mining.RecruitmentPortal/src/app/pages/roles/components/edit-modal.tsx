import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { Role, RoleErrors } from "@/app/interfaces/role";
import { getGroupedPermissions } from "@/app/utils/helper";
import { Permission } from "@/app/interfaces/permission";
import { SearchableSelect } from "@/app/components/searchable-select";
import { useTenant } from "@/tenants/useTenant";

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
  onClose,
  onConfirm,
  setFieldErrors,
  onChange,
  handlePermissionToggle,
}: EditModalProps) {
  const { colors } = useTenant();
  const groupedPermissions = getGroupedPermissions(permissions);

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
              <p className="text-[18px] font-semibold truncate" style={{ color: colors.text }}>
                {form.id ? "Update" : "Create"} Role
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="p-2 rounded-md text-[15px]"
                style={{ color: colors.text }}
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-full">
            <form
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
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
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                      ${fieldErrors.name ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
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
                    <label className="text-[16px] font-semibold" style={{ color: colors.text }}>
                      Permissions
                    </label>
                    <span className="text-[14px] text-gray-500 italic" style={{ color: colors.text }}>
                      {form.permissionIds?.length || 0} selected
                    </span>
                  </div>

                  {/* Scrollable Table */}
                  <div
                    className="h-[350px] overflow-y-auto scrollbar-black border border-gray-800 rounded-lg"
                    style={
                      {
                        "--scrollbar-track": colors.bg,
                      } as React.CSSProperties
                    }
                  >
                    <table className="w-full text-left border-collapse">
                      {/* Sticky Header */}
                      <thead
                        className="sticky top-0 z-10 shadow-sm"
                        style={{ background: colors.card }}
                      >
                        <tr className="border-b border-gray-800">
                          <th className="px-4 py-3 text-[16px] font-bold" style={{ color: colors.text }}>
                            Resource / Group
                          </th>
                          <th className="px-4 py-3 text-[16px] font-bold" style={{ color: colors.text }}>
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

                                  <span className="text-[16px] font-bold" style={{ color: colors.text }}>
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
                                          className={`text-[14px] transition-colors ${
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
                  {fieldErrors.permissionIds && (
                    <p className="text-[14px] text-red-500 mt-1">
                      {fieldErrors.permissionIds}
                    </p>
                  )}
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
            className="px-6 py-2 rounded-lg border border-gray-700 text-[16px] disabled:opacity-50"
            style={{ color: colors.text }}
          >
            Close
          </button>

          <motion.button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="px-6 py-2 rounded-lg text-[16px] font-semibold disabled:opacity-70"
            style={{ color: colors.card, backgroundColor: colors.accent }}
          >
            {loading ? "Processing..." : form.id ? "Update" : "Create"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
