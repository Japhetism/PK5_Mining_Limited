import { useTenant } from "@/tenants/useTenant";
import useAccountViewModel from "../viewmodel";

export function UserInfo() {
  const { colors } = useTenant();
  const { user } = useAccountViewModel();

  const Item = ({
    label,
    value,
  }: {
    label: string;
    value?: string | number | null;
  }) => (
    <div className="py-4 border-b border-gray-800 last:border-none">
      <p className="text-[16px]" style={{ color: colors.text }}>
        {label}
      </p>
      <p className="mt-1 text-[16px] font-medium" style={{ color: colors.text }}>
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="rounded-2xl px-6" style={{ background: colors.card }}>
      <div className="py-4 border-b border-gray-800">
        <h2 className="font-semibold text-[18px]" style={{ color: colors.text }}>
          Profile Information
        </h2>
      </div>

      <Item label="First Name" value={user?.firstName} />
      <Item label="Last Name" value={user?.lastName} />
      <Item label="Email Address" value={user?.email} />
      <Item label="Subsidiary" value={user?.subsidiary?.name} />
      <Item label="Department" value={user?.department?.name} />
      <Item label="Role" value={user?.role?.name} />
    </div>
  );
}
