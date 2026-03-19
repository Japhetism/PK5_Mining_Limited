import useAccountViewModel from "../viewmodel";

export function UserInfo() {
  const { user } = useAccountViewModel();

  const Item = ({
    label,
    value,
  }: {
    label: string;
    value?: string | number | null;
  }) => (
    <div className="py-4 border-b border-gray-800 last:border-none">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 text-sm text-white font-medium">{value || "-"}</p>
    </div>
  );

  return (
    <div className="rounded-2xl border border-gray-800 bg-[#1a1a1a] px-6">
      <div className="py-4 border-b border-gray-800">
        <h2 className="text-white font-semibold">Profile Information</h2>
      </div>

      <Item label="First Name" value={user?.firstName} />
      <Item label="Last Name" value={user?.lastName} />
      <Item label="Email Address" value={user?.email} />
      <Item label="Phone Number" value={user?.phoneNumber} />
      <Item label="Role" value={user?.role} />
    </div>
  );
}
