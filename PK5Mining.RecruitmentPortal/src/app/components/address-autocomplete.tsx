import { useTenant } from "@/tenants/useTenant";
import { useState } from "react";

type Props = {
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  label?: string;
};

export default function AddressAutocomplete({
  name,
  value,
  onChange,
  placeholder = "Enter address...",
  error,
  required,
  label,
}: Props) {
  const { colors } = useTenant();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const triggerChange = (val: string) => {
    onChange({
      target: {
        name,
        value: val,
      },
    });
  };

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=ng`,
      );
      const data = await res.json();

      setSuggestions(data.map((item: any) => item.display_name));
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const handleChange = (val: string) => {
    triggerChange(val);
    fetchSuggestions(val);
  };

  const handleSelect = (val: string) => {
    triggerChange(val);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-[16px] font-semibold mb-2" style={{ color: colors.text }}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg text-[16px] focus:outline-none transition-colors
          ${error ? "border-red-500" : "border-gray-800"}
          focus:border-[#c89b3c]`}
        style={{
          backgroundColor: colors.textInputBgColor,
          color: colors.text,
        }}
      />

      {suggestions.length > 0 && (
        <div
          className="absolute z-50 w-full mt-1 rounded-lg max-h-60 overflow-y-auto"
          style={{ background: colors.textInputBgColor }}
        >
          {loading && (
            <div className="p-3 text-[13px]" style={{ color: colors.text }}>
              Loading...
            </div>
          )}

          {suggestions.map((item, index) => (
            <div
              key={index}
              className="p-3 text-[15px] cursor-pointer hover:bg-white/50"
              onClick={() => handleSelect(item)}
              style={{ color: colors.text }}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
