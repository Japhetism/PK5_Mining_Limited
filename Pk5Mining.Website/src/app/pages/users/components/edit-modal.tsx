import { motion } from "motion/react";
import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { User, UserErrors } from "@/app/interfaces/user";
import { PasswordInput } from "@/app/components/ui/password-input";
import { Subsidiary } from "@/app/interfaces/subsidiary";
import { Role } from "@/app/interfaces/role";
import { SearchableSelect } from "@/app/components/searchable-select";
import { Department } from "@/app/interfaces/department";
import { useTenant } from "@/tenants/useTenant";

type EditModalProps = {
  form: User;
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  fieldErrors: any;
  roles: Role[];
  departments: Department[];
  onClose: () => void;
  onConfirm: () => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<UserErrors | null>>;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
};

export function EditModal({
  form,
  open,
  loading = false,
  fieldErrors,
  roles,
  departments,
  onClose,
  onConfirm,
  setFieldErrors,
  onChange,
}: EditModalProps) {
  const { colors } = useTenant();
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
                {form.id ? "Update" : "Create"} User
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
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.firstName)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          firstName: "Invalid first name",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.firstName;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                    ${fieldErrors?.firstName ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                  {fieldErrors?.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.lastName)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          lastName: "Invalid last name",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.lastName;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                    ${fieldErrors?.lastName ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                  {fieldErrors?.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    disabled={Boolean(form.id)}
                    onBlur={() => {
                      if (!form.email) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          email: "Email is required",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.email;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                    ${fieldErrors?.email ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                  {Boolean(form.id) && (
                    <span className="text-[10px] text-gray-500">
                      Email cannot be changed.
                    </span>
                  )}
                  {fieldErrors?.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Username <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    name="username"
                    value={form.username || ""}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.username) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          username: "Username is required",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.username;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                    ${fieldErrors?.username ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                  {fieldErrors?.username && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Department <span className="text-red-500">*</span>
                  </label>
                  <SearchableSelect
                    name="departmentId"
                    value={form.departmentId ?? ""}
                    options={departments.map((d) => ({
                      value: d.id,
                      label: d.name,
                    }))}
                    error={fieldErrors?.departmentId}
                    onChange={onChange}
                    placeholder="Select department"
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                      ${fieldErrors?.departmentId ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                    styles={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                </div>

                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Role <span className="text-red-500">*</span>
                  </label>
                  <SearchableSelect
                    name="roleId"
                    value={form.roleId ?? ""}
                    options={roles.map((r) => ({
                      value: r.id,
                      label: r.name,
                    }))}
                    error={fieldErrors?.roleId}
                    onChange={onChange}
                    placeholder="Select role"
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                      ${fieldErrors?.roleId ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                    styles={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 px-6 pb-6">
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
            style={{ backgroundColor: colors.accent, color: colors.text }}
          >
            {loading ? "Processing..." : form.id ? "Update" : "Create"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
