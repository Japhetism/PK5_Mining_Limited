import { useState } from "react";
import { Copy } from "lucide-react";

interface PasswordInputProps {
  label: string;
  value: string;
  infoText?: string;
  disabled?: boolean;
  disablePasting?: boolean;
  canCopy?: boolean;
  error?: string;
  onChange?: (val: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  value,
  infoText,
  disabled = false,
  disablePasting = false,
  canCopy = false,
  error,
  onChange,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-gray-300 mb-2">
        {label}
        {disabled && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          onPaste={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          autoComplete="off"
          className="w-full px-4 py-3 pr-10 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors border-gray-800 focus:border-[#c89b3c]"
        />

        {canCopy && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Copy size={16} />
          </button>
        )}
      </div>

      {infoText && (
        <span className="text-[10px] text-gray-500">
          {copied ? "Copied!" : infoText}
        </span>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
