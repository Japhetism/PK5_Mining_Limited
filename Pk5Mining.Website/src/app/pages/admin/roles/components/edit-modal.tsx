import { motion } from "motion/react";
import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { Role, RoleErrors } from "@/app/interfaces/role";

type EditModalProps = {
  form: Role;
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  fieldErrors: any;
  onClose: () => void;
  onConfirm: () => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<RoleErrors>>;
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
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Description
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.description ?? "")) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          department: "Invalid role description",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.description;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.description ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.description}
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
