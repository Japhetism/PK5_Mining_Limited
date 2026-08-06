import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { formatDateTime, getGroupedPermissions } from "@/app/utils/helper";
import { Role } from "@/app/interfaces/role";
import { useTenant } from "@/tenants/useTenant";

type DetailModalProps = {
  role: Role;
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
      <p className="text-[15px] break-words" style={{ color: colors.text }}>{value || "-"}</p>
    </div>
  );
}

export function DetailModal({ role, open, onClose }: DetailModalProps) {
  const { colors } = useTenant();
  const groupedPermissions = getGroupedPermissions(role.permissions || []);
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
                Role Information
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
              <DetailItem label="Name" value={role.name} />
              <DetailItem label="Subsidiary" value={role.subsidiary?.name} />
              <DetailItem
                label="Status"
                value={role.status}
              />
              <DetailItem
                label="Date Added"
                value={role.dT_Created ? formatDateTime(role.dT_Created) : "-"}
              />
              <DetailItem
                label="Date Modified"
                value={
                  role.dT_Modified ? formatDateTime(role.dT_Modified) : "-"
                }
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <label className="text-[16px] font-semibold" style={{ color: colors.text }}>
                  Permissions
                </label>
                <span className="text-[14px] italic" style={{ color: colors.text }}>
                  {role.permissions?.length || 0} assigned
                </span>
              </div>

              {role.permissions?.length === 0 ? (
                <p className="text-[15px] italic" style={{ color: colors.text }}>
                  No permissions assigned
                </p>
              ) : (
                <div className="max-h-[350px] overflow-y-auto scrollbar-black border border-gray-800 rounded-lg">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 shadow-sm" style={{ background: colors.card }}>
                      <tr className="border-b border-gray-800">
                        <th className="px-4 py-3 text-[16px] font-bold uppercase tracking-widest w-1/3" style={{ color: colors.text }}>
                          Resource / Group
                        </th>
                        <th className="px-4 py-3 text-[16px] font-bold uppercase tracking-widest" style={{ color: colors.text }}>
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-800/50">
                      {groupedPermissions.map((group) => {
                        const currentPerms = role.permissionIds || [];

                        return (
                          <tr
                            key={group.key}
                            className="hover:bg-white/[0.02] transition-colors group/row"
                          >
                            <td className="px-4 py-4 align-top">
                              <div className="flex items-center gap-3 cursor-pointer">
                                <span className="text-[16px] font-bold group-hover/row:text-[#c89b3c] transition-colors" style={{ color: colors.text }}>
                                  {group.name}
                                </span>
                              </div>
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-x-6 gap-y-3">
                                {group.permissions.map((perm) => {
                                  const isChecked = currentPerms.includes(
                                    perm.id,
                                  );

                                  const label =
                                    perm.name?.split(".")[1]?.toUpperCase() ||
                                    perm.name.toUpperCase();

                                  return (
                                    <label
                                      key={perm.id}
                                      className="flex items-center gap-2.5 cursor-pointer group/item"
                                    >
                                      <span
                                        className="text-[16px] transition-colors"
                                        style={{ color: colors.text }}
                                      >
                                        {label}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
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
