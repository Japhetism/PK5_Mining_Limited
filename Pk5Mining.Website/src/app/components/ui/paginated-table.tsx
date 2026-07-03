import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableSkeleton } from "./table-loader";
import { useTenant } from "@/tenants/useTenant";

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

  emptyTitle?: string;
  noResultsTitle?: string;

  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;

  pageSizeOptions?: number[];
};

export function PaginatedTable<T>({
  data,
  columns,
  isLoading = false,
  isFilter,

  emptyTitle = "No records found.",
  noResultsTitle = "No results found.",

  pageNumber,
  pageSize,
  totalCount,
  totalPages,

  setPageNumber,
  setPageSize,

  pageSizeOptions = [5, 10, 20, 50],
}: PaginatedTableProps<T>) {

  const { colors } = useTenant();

  const from =
    totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1;

  const to =
    totalCount === 0 ? 0 : Math.min(pageNumber * pageSize, totalCount);

  const emptyMessage =
    data.length === 0 && !isFilter ? emptyTitle : noResultsTitle;

  const actionsColumn = columns.find((c) => c.key === "actions");
  const dataColumns = columns.filter((c) => c.key !== "actions");

  return (
    <div className="space-y-4">

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          <TableSkeleton cols={1} />
        ) : data.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-6">
            {emptyMessage}
          </div>
        ) : (
          data.map((row, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 space-y-3"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >

              {/* Actions */}
              {actionsColumn && (
                <div className="flex justify-end">
                  {actionsColumn.render(row)}
                </div>
              )}

              {/* Fields */}
              {dataColumns.map((col) => (
                <div key={col.key} className="flex justify-between gap-4">
                  <span className="text-xs text-gray-500">
                    {col.header}
                  </span>

                  <span
                    className={`text-sm text-gray-200 text-right ${col.className ?? ""}`}
                  >
                    {col.render(row)}
                  </span>
                </div>
              ))}

            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block border rounded-xl overflow-hidden" style={{ backgroundColor: colors.card }}>
        <div className="overflow-x-auto">

          {isLoading ? (
            <TableSkeleton cols={columns.length} />
          ) : (
            <table className="min-w-full text-sm">

              <thead className="text-gray-300 h-[48px]" style={{ background: colors.tableHeaderBgColor, borderColor: colors.tableBorderColor, color: colors.text }}>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-4 font-medium text-left text-[16px] ${col.headerClassName ?? ""}`}
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
                      className="px-4 py-6 text-center text-sm"
                      style={{ color: colors.text }}
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t hover:bg-white/5"
                    >
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-4 py-3 ${col.className ?? ""}`}
                          style={{ color: colors.text, borderColor: colors.tableBorderColor }}
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
      </div>

      {/* PAGINATION (MOBILE + DESKTOP) */}
      {!isLoading && totalCount > 0 && (
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between px-4 py-4 border rounded-xl" style={{ background: colors.card, borderColor: colors.tableBorderColor }}>

          <div className="text-[12px]" style={{ color: colors.text }}>
            Showing {from}–{to} of {totalCount}
          </div>

          <div className="flex items-center gap-3">

            {/* Page Size */}
            <div
              className="rounded-full pr-3 px-3 py-1 border text-[12px]"
              style={{ backgroundColor: colors.card, borderColor: colors.tableBorderColor, color: colors.text }}
            >
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageNumber(1);
                }}
              >
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size} per page
                  </option>
                ))}
              </select>
            </div>

            {/* Previous */}
            <button
              onClick={() =>
                setPageNumber(Math.max(1, pageNumber - 1))
              }
              disabled={pageNumber === 1}
              className="inline-flex items-center hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-8 h-8" style={{ color: colors.paginatiionIconColor }} />
            </button>

            {/* Next */}
            <button
              onClick={() =>
                setPageNumber(Math.min(totalPages, pageNumber + 1))
              }
              disabled={pageNumber === totalPages}
              className="inline-flex items-center hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-8 h-8" style={{ color: colors.paginatiionIconColor }} />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
