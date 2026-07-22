import { motion } from "motion/react";
import { X } from "lucide-react";
import { countries } from "countries-list";
import { Modal } from "@/app/components/ui/modal";
import { isValidName } from "@/app/utils/validator";
import { Subsidiary, SubsidiaryErrors } from "@/app/interfaces/subsidiary";
import { SearchableSelect } from "@/app/components/searchable-select";
import AddressAutocomplete from "@/app/components/address-autocomplete";
import { useTenant } from "@/tenants/useTenant";

type EditModalProps = {
  form: Subsidiary;
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  fieldErrors: any;
  onClose: () => void;
  onConfirm: () => void;
  setFieldErrors: React.Dispatch<React.SetStateAction<SubsidiaryErrors>>;
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
  const countryList = Object.entries(countries).map(([code, country]) => ({
    label: country.name,
    value: country.name,
  }));

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
                {form.id ? "Update" : "Create"} Subsidiary
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="p-2 rounded-md text-[15px]"
                title="Close"
                style={{ color: colors.text }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-full">
            <form
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
                    Code
                    <span className="ml-1 text-red-500">*</span>
                  </label>
                  <motion.input
                    name="code"
                    value={form.code}
                    disabled={true}
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
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                      ${fieldErrors.code ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                  {fieldErrors.code && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.code}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
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
                    className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                      ${fieldErrors.email ? "border-red-500" : "border-gray-800"}
                      focus:border-[#c89b3c]`}
                    style={{
                      backgroundColor: colors.textInputBgColor,
                      color: colors.text,
                    }}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <SearchableSelect
                  label="Country"
                  name="country"
                  value={form.country}
                  options={countryList}
                  required
                  error={fieldErrors.country}
                  placeholder="Select Country"
                  onChange={onChange}
                  className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
                    ${fieldErrors.country ? "border-red-500" : "border-gray-800"}
                    focus:border-[#c89b3c]`}
                  styles={{
                    backgroundColor: colors.textInputBgColor,
                    color: colors.text,
                  }}
                />
              </div>

              <AddressAutocomplete
                name="address"
                label="Address"
                required
                value={form.address ?? ""}
                onChange={(e) =>
                  onChange(e as React.ChangeEvent<HTMLInputElement>)
                }
                error={fieldErrors.address}
              />
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
            className="px-6 py-2 rounded-lg text-black text-[16px] font-semibold disabled:opacity-70"
            style={{
              backgroundColor: colors.accent,
              color: colors.card,
            }}
          >
            {loading ? "Processing..." : form.id ? "Update" : "Create"}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
