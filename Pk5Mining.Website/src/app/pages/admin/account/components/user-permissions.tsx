import { ShieldCheck, Check } from "lucide-react";
import { PERMISSION_DETAILS, PERMISSIONS } from "@/app/constants/permissions";
import useAccountViewModel from "../viewmodel";
import { useTenant } from "@/tenants/useTenant";

type PermissionValue = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export function UserPermissions() {
  const { colors } = useTenant();
  const { user } = useAccountViewModel();

  const permissions = (user?.userPermissions ?? []) as PermissionValue[];

  return (
    <div className="rounded-2xl border border-gray-800 p-4 sm:p-6" style={{ background: colors.card }}>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10">
          <ShieldCheck className="h-5 w-5 text-green-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-base font-semibold text-white">Permissions</h2>

          <p className="text-sm text-gray-400">
            Access rights assigned to your account.
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {permissions.length} permission
            {permissions.length !== 1 ? "s" : ""} assigned
          </p>
        </div>
      </div>

      {permissions.length > 0 ? (
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {permissions.map((permission) => {
            const details = PERMISSION_DETAILS[permission];

            return (
              <div
                key={permission}
                className="group flex min-h-[56px] items-center gap-3 rounded-xl border border-gray-800 p-3"
                title={details?.description}
                style={{ background: colors.bg }}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                  <Check className="h-3.5 w-3.5 text-green-400" />
                </div>

                <span className="break-words text-sm text-gray-300 leading-snug">
                  {details?.name ?? permission}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-700 py-10 text-center">
          <ShieldCheck className="mx-auto mb-3 h-8 w-8 text-gray-600" />
          <p className="text-sm text-gray-400">No permissions assigned.</p>
        </div>
      )}
    </div>
  );
}
