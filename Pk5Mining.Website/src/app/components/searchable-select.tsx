import { useState, useMemo, useRef, useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  value: string;
  options: Option[];
  required?: boolean;
  error?: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  onBlur?: () => void;
};

export const SearchableSelect = ({
  label,
  name,
  value,
  options,
  required,
  error,
  onChange,
  onBlur,
}: Props) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find selected option
  const selectedOption = options.find((opt) => opt.value === value);

  // Sync input display with selected label
  useEffect(() => {
    if (selectedOption) {
      setQuery(selectedOption.label);
    } else {
      setQuery("");
    }
  }, [value, selectedOption]);

  // Filter options
  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, options]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {/* Input */}
      <input
        name={name}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={onBlur}
        placeholder={`Search ${label}`}
        className={`w-full px-4 py-3 bg-[#0f0f0f] border rounded-lg focus:outline-none transition-colors
          ${error ? "border-red-500" : "border-gray-800"}
          focus:border-[#c89b3c]`}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-[#0f0f0f] border border-gray-800 rounded-lg shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                onMouseDown={(e) => e.preventDefault()} // prevent blur before click
                onClick={() => {
                  // 🔥 Emit synthetic event (compatible with your onChange)
                  const syntheticEvent = {
                    target: {
                      name,
                      value: opt.value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>;

                  onChange(syntheticEvent);

                  setQuery(opt.label);
                  setOpen(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-[#1a1a1a]"
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No results</div>
          )}
        </div>
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
