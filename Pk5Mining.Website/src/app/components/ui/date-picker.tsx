import * as React from "react";
import { format, parse, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DayPicker, type Matcher } from "react-day-picker";
import "react-day-picker/dist/style.css";

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
  fromYear = 2020,
  toYear = 2050,
  name,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const selectedDate = React.useMemo(() => {
    if (!value) return undefined;

    const parsed = parse(value, "dd/MM/yyyy", new Date());
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
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

    return matchers.length > 0 ? matchers : undefined;
  }, [disablePastDates, minDate, maxDate]);

  const handleSelect = (date?: Date) => {
    if (!date) return;

    onChange(format(date, "dd/MM/yyyy"));
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
              onSelect={handleSelect}
              captionLayout="buttons"
              fromYear={fromYear}
              toYear={toYear}
              disabled={disabledDays}
              classNames={{
                root: "text-sm text-gray-200",
                month: "space-y-3",
                caption:
                  "flex items-center justify-between mb-2 text-gray-200 font-semibold",
                nav: "flex items-center gap-1",
                day: "h-9 w-9 rounded-md p-0 font-normal text-gray-200 hover:bg-white/10",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
