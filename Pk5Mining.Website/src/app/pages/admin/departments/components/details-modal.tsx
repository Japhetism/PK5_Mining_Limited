import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { formatDateTime } from "@/app/utils/helper";
import { Department } from "@/app/interfaces/department";

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
  return (
    <div className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
        {label}
      </p>
      <p className="text-sm text-gray-200 break-words">{value || "-"}</p>
    </div>
  );
}

export function DetailModal({ department, open, onClose }: DetailModalProps) {
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
                Department Information
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

          <div className="relative w-full h-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Name" value={department.name} />
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
                  department.dT_Updated
                    ? formatDateTime(department.dT_Updated)
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
            className="px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}