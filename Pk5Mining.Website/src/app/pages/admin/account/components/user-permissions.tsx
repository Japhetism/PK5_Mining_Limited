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
    <div className="rounded-2xl p-4 sm:p-6" style={{ background: colors.card }}>
      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10">
          <ShieldCheck className="h-5 w-5 text-green-400" />
        </div>

        <div className="min-w-0">
          <h2 className="text-[18px] font-semibold" style={{ color: colors.text }}>
            Permissions
          </h2>

          <p className="text-[15px] mt-1" style={{ color: colors.subtext }}>
            Access rights assigned to your account.
          </p>

          <p className="mt-1 text-[13px]" style={{ color: colors.subtext }}>
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
                className="group flex min-h-[56px] bg-[#E5E7EB] items-center gap-3 rounded-xl p-3"
                title={details?.description}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-200">
                  <Check className="h-3.5 w-3.5 text-green-800" />
                </div>

                <span className="break-words text-[14px] leading-snug" style={{ color: colors.text }}>
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
