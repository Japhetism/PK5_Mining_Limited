import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { formatDateTime } from "@/app/utils/helper";
import { User } from "@/app/interfaces/user";
import { useTenant } from "@/tenants/useTenant";

type DetailModalProps = {
  user: User;
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
      <p className="text-[16px] font-semibold uppercase tracking-wide" style={{ color: colors.text }}>
        {label}
      </p>
      <p className="text-[15px] break-words" style={{ color: colors.text }}>
        {value || "-"}
      </p>
    </div>
  );
}

export function DetailModal({ user, open, onClose }: DetailModalProps) {
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
                User Information
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

          <div className="relative w-full h-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Name" value={`${user.firstName} ${user.lastName}`} />
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Username" value={user.username} />
              <DetailItem label="Role" value={user?.userRole?.name} />
              <DetailItem label="Department" value={user?.department?.name} />
              <DetailItem
                label="Status"
                value={user.isActive ? "Active" : "Inactive"}
              />
              <DetailItem
                label="Date Added"
                value={
                  user.dT_Created
                    ? formatDateTime(user.dT_Created)
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