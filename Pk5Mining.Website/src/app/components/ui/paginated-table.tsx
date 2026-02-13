// src/components/ui/admin-table.tsx
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableSkeleton } from "./table-loader";

export type PaginatedTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  headerClassName?: string;
  render: (row: T) => React.ReactNode;
};

type PaginatedTableProps<T> = {
  data: T[];
  columns: PaginatedTableColumn<T>[];
  isLoading?: boolean;

  // empty states
  emptyTitle?: string; // when data is empty
  noResultsTitle?: string; // when data exists but filtered result is empty

  // filtering (client-side)
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  searchPlaceholder?: string;
  statusValue?: string;
  onStatusChange?: (v: string) => void;
  statusOptions?: { value: string; label: string }[];

  onClearFilters?: () => void;

  // filtering function
  filterFn?: (row: T, q: string, status: string) => boolean;

  // pagination
  initialPageSize?: number;
  pageSizeOptions?: number[];
};

export function PaginatedTable<T>({
  data,
  columns,
  isLoading = false,

  emptyTitle = "No records found.",
  noResultsTitle = "No results found. Try changing your filters.",

  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",

  statusValue = "all",
  onStatusChange,
  statusOptions,

  onClearFilters,
  filterFn,

  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: PaginatedTableProps<T>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const q = (searchValue ?? "").trim().toLowerCase();
  const status = statusValue ?? "all";

  const filtered = useMemo(() => {
    if (!filterFn) return data;
    return data.filter((row) => filterFn(row, q, status));
  }, [data, filterFn, q, status]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, status]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  // Clamp page when result set shrinks
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const isFiltered = (searchValue ?? "").trim().length > 0 || status !== "all";

  return (
    <div className="space-y-4">
      {/* Optional Filters Row */}
      {(onSearchChange || onStatusChange || onClearFilters) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            {onSearchChange && (
              <div className="w-full sm:w-[360px]">
                <input
                  value={searchValue ?? ""}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
                />
              </div>
            )}

            {onStatusChange && statusOptions?.length ? (
              <select
                value={statusValue ?? "all"}
                onChange={(e) => onStatusChange(e.target.value)}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : null}
          </div>

          <div className="flex-1 text-right">
            {onClearFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-300 hover:bg-white/5"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <TableSkeleton cols={columns.length} />
          ) : (
            <table className="min-w-full text-sm">
              <thead className="bg-black/40 text-gray-300">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 font-medium text-left ${col.headerClassName ?? ""}`}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      {data.length === 0 && !isFiltered
                        ? emptyTitle
                        : noResultsTitle}
                    </td>
                  </tr>
                ) : (
                  paged.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-800 hover:bg-white/5"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-4 py-3 align-top text-gray-300 ${col.className ?? ""}`}
                        >
                          {col.render(row)}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        {/* {!isLoading && totalItems > 0 && totalPages > 1 && ( */}
        {!isLoading && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-black/20">
            <div className="text-xs text-gray-400">
              Showing {from}–{to} of {totalItems}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200"
              >
                {pageSizeOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} / page
                  </option>
                ))}
              </select>

              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-300 hover:bg-white/5 disabled:opacity-40 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-300 hover:bg-white/5 disabled:opacity-40 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
