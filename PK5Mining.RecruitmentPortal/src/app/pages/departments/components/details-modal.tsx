import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { formatDateTime } from "@/app/utils/helper";
import { Department } from "@/app/interfaces/department";
import { useTenant } from "@/tenants/useTenant";

type DetailModalProps = {
  department: Department;
  open: boolean;
  onClose: () => void;
};

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  const { colors } = useTenant();
  return (
    <div className="p-4">
      <p className="text-[16px] font-semibold uppercase tracking-wide mb-2" style={{ color: colors.text }}>
        {label}
      </p>
      <p className="text-[15px] break-words" style={{ color: colors.text }}>
        {value || "-"}
      </p>
    </div>
  );
}

export function DetailModal({ department, open, onClose }: DetailModalProps) {
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
                Department Information
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onClose()}
                className="p-2 rounded-md hover:bg-white/10 text-[15px]"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative w-full h-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Name" value={department.name} />
              <DetailItem label="Subsidiary" value={department.subsidiary?.name} />
              <DetailItem label="Description" value={department.description} />
              <DetailItem
                label="Status"
                value={department.isActive ? "Active" : "Inactive"}
              />
              <DetailItem
                label="Date Added"
                value={
                  department.dT_Created
                    ? formatDateTime(department.dT_Created)
                    : "-"
                }
              />
              <DetailItem
                label="Date Modified"
                value={
                  department.dT_Modified
                    ? formatDateTime(department.dT_Modified)
                    : "-"
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-gray-700 text-[16px] disabled:opacity-50"
            style={{ color: colors.text }}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}