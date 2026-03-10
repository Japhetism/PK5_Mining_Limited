import { motion } from "motion/react";
import { Modal } from "@/app/components/ui/modal";
import { X } from "lucide-react";
import useSubsidiaryListViewModel from "../list/viewmodel";
import { isValidName } from "@/app/utils/validator";
import { countries } from "@/app/constants";
import { useEffect } from "react";

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;

  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export function EditModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm action",
  confirmText = "Yes",
  cancelText = "No",
  loading = false,
}: EditModalProps) {
  const { form, fieldErrors, onChange, setFieldErrors, selectedSubsidiary } =
    useSubsidiaryListViewModel();

    console.log("form is ", form, selectedSubsidiary);

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
                Create Subsidiary
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
                          title: "Invalid subsidiary name",
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
                    Code
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="code"
                    value={form.code}
                    onChange={onChange}
                    onBlur={() => {
                      if (!isValidName(form.code)) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          department: "Invalid subsidiary code",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.code;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.code ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.code && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.code}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Country
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.select
                    name="country"
                    value={form.country}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.country) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          country: "Country is required",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.country;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                                            ${fieldErrors.country ? "border-red-500" : "border-gray-800"}
                                            focus:border-[#c89b3c]`}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </motion.select>
                  {fieldErrors.country && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Time Zone
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="timezone"
                    value={form.timezone}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.timezone) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          location: "Time zone is required",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.timezone;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.timezone ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.timezone && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.timezone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Address
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    onBlur={() => {
                      if (!form.address) {
                        setFieldErrors((prev) => ({
                          ...prev,
                          location: "Address is required",
                        }));
                      } else {
                        setFieldErrors((prev) => {
                          const updated = { ...prev };
                          delete updated.address;
                          return updated;
                        });
                      }
                    }}
                    className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
                ${fieldErrors.address ? "border-red-500" : "border-gray-800"}
                focus:border-[#c89b3c]`}
                  />
                  {fieldErrors.address && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.address}
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
            {cancelText}
          </button>

          <motion.button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            whileHover={!loading ? { scale: 1.02 } : undefined}
            whileTap={!loading ? { scale: 0.98 } : undefined}
            className="px-4 py-2 rounded-lg bg-[#c89b3c] text-black text-xs font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            {loading ? "Processing..." : confirmText}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
