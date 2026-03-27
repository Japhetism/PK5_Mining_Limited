import * as React from "react";
import { format, parse, startOfDay, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker, type Matcher } from "react-day-picker";
import "react-day-picker/dist/style.css";

const startYear = import.meta.env.VITE_START_DATE_YEAR as string;
const endYear = import.meta.env.VITE_END_DATE_YEAR as string;

type DatePickerProps = {
  value?: string;
  onChange: (value: string) => void;
  error?: boolean;
  placeholder?: string;
  disablePastDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  fromYear?: number;
  toYear?: number;
  name?: string;
};

export function DatePicker({
  value,
  onChange,
  error = false,
  placeholder = "DD/MM/YYYY",
  disablePastDates = false,
  minDate,
  maxDate,
  fromYear = Number(startYear),
  toYear = Number(endYear),
  name,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date>(new Date());

  const selectedDate = React.useMemo(() => {
    if (!value) return undefined;

    const parsed = parse(value, "dd/MM/yyyy", new Date());
    if (!isValid(parsed)) return undefined;

    return startOfDay(parsed);
  }, [value]);

  const disabledDays = React.useMemo<Matcher[] | undefined>(() => {
    const matchers: Matcher[] = [];
    const today = startOfDay(new Date());

    if (disablePastDates) {
      matchers.push({ before: today });
    } else if (minDate) {
      matchers.push({ before: startOfDay(minDate) });
    }

    if (maxDate) {
      matchers.push({ after: startOfDay(maxDate) });
    }

    return matchers.length ? matchers : undefined;
  }, [disablePastDates, minDate, maxDate]);

  React.useEffect(() => {
    if (open) {
      setMonth(selectedDate ?? new Date());
    }
  }, [open, selectedDate]);

  const handleSelect = (date?: Date) => {
    if (!date) return;

    const normalized = startOfDay(date);
    onChange(format(normalized, "dd/MM/yyyy"));
    setMonth(normalized);
    setOpen(false);
  };

  return (
    <div className="relative">
      {name ? <input type="hidden" name={name} value={value ?? ""} /> : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-lg border bg-[#0f0f0f] px-4 py-3 text-left transition-colors ${
          error ? "border-red-500" : "border-gray-800"
        } focus:border-[#c89b3c] focus:outline-none`}
      >
        <span className={value ? "text-gray-200" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-label="Close date picker"
          />

          <div className="absolute left-0 top-[calc(100%+8px)] z-50 rounded-xl border border-gray-800 bg-[#111111] p-3 shadow-2xl">
            <DayPicker
              mode="single"
              selected={selectedDate}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleSelect}
              captionLayout="buttons"
              fromYear={fromYear}
              toYear={toYear}
              disabled={disabledDays}
              showOutsideDays
              classNames={{
                root: "text-sm text-gray-200",
                month: "space-y-3",
                caption: "flex items-center justify-between mb-2",
                caption_label: "text-sm font-semibold text-gray-200",
                nav: "flex items-center gap-1",
                nav_button:
                  "h-8 w-8 rounded-md border border-gray-700 bg-transparent text-gray-200 hover:bg-white/10",
                nav_button_previous:
                  "h-8 w-8 rounded-md border border-gray-700 bg-transparent text-gray-200 hover:bg-white/10",
                nav_button_next:
                  "h-8 w-8 rounded-md border border-gray-700 bg-transparent text-gray-200 hover:bg-white/10",
                table: "w-full border-collapse",
                head_row: "",
                head_cell:
                  "h-9 w-9 text-xs font-medium text-gray-400 text-center",
                row: "",
                cell: "h-9 w-9 text-center",
                day: "h-9 w-9 rounded-md text-sm text-gray-200 hover:bg-white/10",
                day_today: "border border-[#c89b3c] text-[#c89b3c]",
                day_outside: "text-gray-600",
                day_disabled: "text-gray-600 opacity-50",
                dropdown:
                  "rounded-md border border-gray-700 bg-[#0f0f0f] px-2 py-1 text-sm text-gray-200",
              }}
              modifiersStyles={{
                selected: {
                  backgroundColor: "#c89b3c",
                  color: "#000000",
                  fontWeight: 600,
                  borderRadius: "0.375rem",
                },
                today: {
                  border: "1px solid #c89b3c",
                  borderRadius: "0.375rem",
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
