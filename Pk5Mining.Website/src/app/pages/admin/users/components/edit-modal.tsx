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
                {form.id ? "Update" : "Create"} User
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
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                    ${fieldErrors?.firstName ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                  />
                  {fieldErrors?.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                    ${fieldErrors?.lastName ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                  />
                  {fieldErrors?.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                    ${fieldErrors?.email ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
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
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                    ${fieldErrors?.username ? "border-red-500" : "border-gray-800"} focus:border-[#c89b3c]`}
                  />
                  {fieldErrors?.username && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors?.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                      ${fieldErrors?.departmentId ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
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
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                      ${fieldErrors?.roleId ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                  />
                </div>

                {/* <PasswordInput
                  label="Temporary Password"
                  value={form.password || ""}
                  disabled
                  infoText="Copy and share this temporary password with the user"
                  canCopy={true}
                /> */}
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
