import { useTenant } from "@/tenants/useTenant";
import { useState, useMemo, useRef, useEffect } from "react";

type Option = {
  label: string | number;
  value: string | number;
};

type Props = {
  label?: string;
  name: string;
  value: string | number;
  options: Option[];
  required?: boolean;
  error?: string;
  className: string;
  styles?: React.CSSProperties;
  placeholder?: string;
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
  className,
  placeholder,
  styles,
  onChange,
  onBlur,
}: Props) => {
  const { colors } = useTenant();
  const [query, setQuery] = useState<string | number>("");
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (selectedOption) {
      setQuery(selectedOption.label);
    } else {
      setQuery("");
    }
    setIsTyping(false);
  }, [value, selectedOption]);

  const filteredOptions = useMemo(() => {
    if (!isTyping) return options;

    return options.filter((opt) =>
      opt.label
        .toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase()),
    );
  }, [query, options, isTyping]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setIsTyping(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        <input
          name={name}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsTyping(true);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setIsTyping(false);
          }}
          onBlur={onBlur}
          placeholder={placeholder ?? `Search ${label ? label : ""}`}
          className={`${className} pr-10`}
          style={styles}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        {/* Dropdown Icon */}
        <div
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
          onClick={() => {
            setOpen((prev) => !prev);
            setIsTyping(false);
          }}
        >
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto border rounded-lg shadow-lg scrollbar-black"
          style={{ background: colors.textInputBgColor, border: colors.cardBorderColor, color: colors.text }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  const syntheticEvent = {
                    target: {
                      name,
                      value: opt.value,
                    },
                  } as React.ChangeEvent<HTMLInputElement>;

                  onChange(syntheticEvent);

                  setQuery(opt.label);
                  setOpen(false);
                  setIsTyping(false);
                }}
                className="px-4 py-2 cursor-pointer"
                onMouseEnter={() => setHovered(opt.value)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  backgroundColor:
                    value === opt.value
                      ? colors.card
                      : hovered === opt.value
                        ? colors.card
                        : "transparent",
                }}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No results</div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
