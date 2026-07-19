import { motion } from "motion/react";
import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { Department, DepartmentErrors } from "@/app/interfaces/department";
import { useTenant } from "@/tenants/useTenant";

type EditModalProps = {
  form: Department;
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  fieldErrors: any;
  onClose: () => void;
  onConfirm: () => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<DepartmentErrors>>;
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
                {form.id ? "Update" : "Create"} Department
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
                          title: "Invalid department name",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.name;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 text-[16px] rounded-lg focus:outline-none transition-colors
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
                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Description
                  </label>
                  <motion.textarea
                    name="description"
                    value={form.description}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.description ?? "")) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          department: "Invalid department description",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.description;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                      ${fieldErrors.description ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
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
            style={{ backgroundColor: colors.accent, color: colors.card }}
          >
            {loading ? "Processing..." : form.id ? "Update" : "Create"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
