interface StatusConfirmationProps {
  isConfirmed: boolean;
  setIsConfirmed: (isConfirmed: boolean) => void;
}

export function StatusConfirmation({
  isConfirmed,
  setIsConfirmed,
}: StatusConfirmationProps) {
  return (
    <div>
      {/* Confirmation Checkbox Box */}
      <label className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 cursor-pointer mb-6">
        <input
          type="checkbox"
          checked={isConfirmed}
          onChange={(e) => setIsConfirmed(e.target.checked)}
          className="mt-0.5 w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
        />
        <span className="text-xs text-gray-700 font-medium leading-relaxed">
          I confirm that I have reviewed this candidate's application and
          supporting documents.
        </span>
      </label>
    </div>
  );
}
