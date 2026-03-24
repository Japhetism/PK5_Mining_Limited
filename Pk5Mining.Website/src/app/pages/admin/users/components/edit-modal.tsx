import { motion } from "motion/react";
import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { User, UserErrors } from "@/app/interfaces/user";
import { PasswordInput } from "@/app/components/ui/password-input";

type EditModalProps = {
  form: User;
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  fieldErrors: any;
  onClose: () => void;
  onConfirm: () => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<UserErrors>>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
};

export function EditModal({
  form,
  open,
  loading = false,
  fieldErrors,
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
            <form
              // onSubmit={onSubmit}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    First Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.firstName)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          title: "Invalid first name",
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
                ${fieldErrors.firstName ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.firstName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Last Name
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.lastName)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          department: "Invalid last name",
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
                ${fieldErrors.lastName ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.lastName && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Email
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.email) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          location: "Email is required",
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
                ${fieldErrors.email ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Username
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.username) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          location: "Username is required",
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
                ${fieldErrors.username ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.username && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Role
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="role"
                    value={form.role}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.role) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          location: "Role is required",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.role;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.role ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.role && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.role}
                    </p>
                  )}
                </div>

                <PasswordInput
                  label="Temporary Password"
                  value={form.password || ""}
                  disabled
                  infoText="Copy and share this temporary password with the user"
                  canCopy={true}
                />
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
