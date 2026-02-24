import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Trash2, Power, KeyRound, Save } from "lucide-react";
import { ConfirmModal } from "@/app/components/ui/confirm-modal";
import { formatDateTime } from "@/app/utils/helper";
import { UserStatusPill } from "@/app/components/ui/user-status-pill";
import { ResetPasswordModal } from "@/app/components/ui/reset-password-modal";
import useUserDetailsViewModel from "./viewmodel";

export function UserDetails() {
  const {
    user,
    fullName,
    canSave,
    form,
    toggleOpen,
    resetOpen,
    deleteOpen,
    resetting,
    updating,
    deleting,
    isLoading,
    setResetOpen,
    setToggleOpen,
    setDeleteOpen,
    setForm,
    handleDeleteUser,
    handleResetPassword,
    handleUpdateStatus,
    handleUpdateUser,
  } = useUserDetailsViewModel();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to users
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setResetOpen(true)}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
          >
            <KeyRound size={16} />
            Reset password
          </button>

          <button
            onClick={() => setToggleOpen(true)}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
          >
            <Power size={16} />
            {user?.isActive ? "Deactivate" : "Activate"}
          </button>

          <button
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-800 bg-[#0f0f0f] hover:bg-[#151515]"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      {/* View card */}
      <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-base font-semibold">{fullName}</h1>
            <p className="text-xs text-gray-400">{user?.email}</p>
            <div className="pt-1">
              <UserStatusPill isActive={user?.isActive ?? false} />
            </div>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <div>Created: {formatDateTime(user?.dT_Created)}</div>
            <div>Updated: {formatDateTime(user?.dT_Updated)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-gray-800 bg-black/20 p-3">
            <div className="text-[11px] text-gray-400">Role</div>
            <div className="text-sm text-gray-100">{user?.role ?? "-"}</div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-black/20 p-3">
            <div className="text-[11px] text-gray-400">User ID</div>
            <div className="text-sm text-gray-100">{user?.id}</div>
          </div>
        </div>
      </div>

      {/* Edit card */}
      <div className="rounded-xl border border-gray-800 bg-[#0f0f0f] p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Edit user</h2>

          <motion.button
            type="button"
            // onClick={() => updateMutation.mutate(form)}
            disabled={!canSave}
            whileHover={canSave ? { scale: 1.02 } : undefined}
            whileTap={canSave ? { scale: 0.98 } : undefined}
            className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg bg-[#c89b3c] text-black font-semibold hover:bg-[#d4a84a] disabled:opacity-70"
          >
            <Save size={14} />
            {updating ? "Saving..." : "Save changes"}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">First name</label>
            <input
              value={form.firstName}
              onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
              className="w-full rounded-lg border border-gray-800 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Last name</label>
            <input
              value={form.lastName}
              onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
              className="w-full rounded-lg border border-gray-800 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full rounded-lg border border-gray-800 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Role</label>
            <input
              value={form.role ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
              className="w-full rounded-lg border border-gray-800 bg-black/30 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#c89b3c]"
              placeholder="e.g. Admin"
            />
          </div>
        </div>
      </div>

      {/* Confirm: delete */}
      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => handleDeleteUser}
        title="Delete user"
        description={`Are you sure you want to delete ${fullName}?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
      />

      {/* Confirm: activate/deactivate */}
      <ConfirmModal
        open={toggleOpen}
        onClose={() => setToggleOpen(false)}
        onConfirm={() => handleUpdateStatus(!user?.isActive)}
        title={user?.isActive ? "Deactivate user" : "Activate user"}
        description={
          user?.isActive
            ? `This will prevent ${user?.email} from accessing the portal.`
            : `This will allow ${user?.email} to access the portal.`
        }
        confirmText={user?.isActive ? "Deactivate" : "Activate"}
        cancelText="Cancel"
        loading={updating}
      />

      {/* Reset password */}
      <ResetPasswordModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        userEmail={user?.email}
        loading={resetting}
        onConfirm={() => handleResetPassword()}
      />
    </div>
  );
}