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
  isFilter: boolean;

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
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
};

export function PaginatedTable<T>({
  data,
  columns,
  isLoading = false,
  isFilter,

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

  pageSizeOptions = [5, 10, 20, 50],
  pageNumber,
  pageSize,
  totalCount,
  totalPages,

  setPageNumber,
  setPageSize,
}: PaginatedTableProps<T>) {

  const from =
  totalCount === 0
    ? 0
    : (pageNumber - 1) * pageSize + 1;

const to =
  totalCount === 0
    ? 0
    : Math.min(pageNumber * pageSize, totalCount);
  
  return (
    <div className="space-y-4">
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
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-6 text-center text-sm text-gray-500"
                    >
                      {data.length === 0 && !isFilter
                        ? emptyTitle
                        : noResultsTitle}
                    </td>
                  </tr>
                ) : (
                  data.map((row, i) => (
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
        {(!isLoading && data.length > 0) && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800 bg-black/20">
            <div className="text-xs text-gray-400">
              Showing {from}–{to} of {totalCount}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageNumber(1);
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
                onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                disabled={pageNumber === 1}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg border border-gray-800 text-gray-300 hover:bg-white/5 disabled:opacity-40 disabled:text-gray-600 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
                disabled={pageNumber === totalPages}
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
