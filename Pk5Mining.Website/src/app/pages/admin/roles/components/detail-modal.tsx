import { X } from "lucide-react";
import { Modal } from "@/app/components/ui/modal";
import { formatDateTime, getGroupedPermissions } from "@/app/utils/helper";
import { Role } from "@/app/interfaces/role";

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
  return (
    <div className="p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
        {label}
      </p>
      <p className="text-sm text-gray-200 break-words">{value || "-"}</p>
    </div>
  );
}

export function DetailModal({ role, open, onClose }: DetailModalProps) {
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
              <p className="text-sm font-semibold text-gray-200 truncate">
                Role Information
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
              <DetailItem label="Name" value={role.name} />
              <DetailItem label="Subsidiary" value={role.subsidiary?.name} />
              <DetailItem
                label="Status"
                value={role.isActive ? "Active" : "Inactive"}
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
                <label className="text-xs font-semibold text-gray-300 tracking-wider">
                  Permissions
                </label>
                <span className="text-[10px] text-gray-500 italic">
                  {role.permissions?.length || 0} assigned
                </span>
              </div>

              {role.permissions?.length === 0 ? (
                <p className="text-sm text-gray-500 italic">
                  No permissions assigned
                </p>
              ) : (
                <div className="max-h-[350px] overflow-y-auto pr-2 scrollbar-black border border-gray-800 rounded-lg">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-[#0f0f0f] z-10 shadow-sm">
                      <tr className="border-b border-gray-800">
                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest w-1/3">
                          Resource / Group
                        </th>
                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
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
                                <span className="text-xs font-bold text-gray-200 group-hover/row:text-[#c89b3c] transition-colors">
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
                                        className={`text-[11px] transition-colors ${
                                          isChecked
                                            ? "text-gray-200"
                                            : "text-gray-500 group-hover/item:text-gray-300"
                                        }`}
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
            className="px-4 py-2 rounded-lg border border-gray-700 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
