export function UserStatusPill({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`text-[11px] rounded-full border px-2 py-0.5 ${
        isActive
          ? "border-emerald-900/50 bg-emerald-900/10 text-emerald-200"
          : "border-red-500 bg-black/20 text-red-300"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
