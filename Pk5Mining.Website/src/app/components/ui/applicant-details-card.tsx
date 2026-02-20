import React from "react";
import { ChevronLeft, ChevronRight, Eye, FileText, Mail, Phone } from "lucide-react";

/**
 * Simple skeleton for cards (swap with your own if you have one).
 */
function CardListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-full">
              <div className="h-4 w-2/3 bg-white/10 rounded mb-2" />
              <div className="h-3 w-1/2 bg-white/10 rounded" />
            </div>
            <div className="h-6 w-14 bg-white/10 rounded-full" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-3 w-3/4 bg-white/10 rounded" />
            <div className="h-3 w-2/3 bg-white/10 rounded" />
          </div>

          <div className="mt-4 flex gap-2">
            <div className="h-9 w-full bg-white/10 rounded-lg" />
            <div className="h-9 w-full bg-white/10 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export type PaginatedCardColumn<T> = {
  key: string;
  label?: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type PaginatedCardProps<T> = {
  data: T[];
  columns?: PaginatedCardColumn<T>[]; // optional if you use renderCard
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
  gridClassName?: string;
  cardClassName?: string;

  renderCard?: (row: T) => React.ReactNode;
};

export function PaginatedCard<T>({
  data,
  columns,
  isLoading = false,
  isFilter,

  emptyTitle = "No records found.",
  noResultsTitle = "No results found. Try changing your filters.",

  pageSizeOptions = [6, 9, 12, 24],
  pageNumber,
  pageSize,
  totalCount,
  totalPages,

  setPageNumber,
  setPageSize,

  gridClassName = "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
  cardClassName = "bg-[#1a1a1a] border border-gray-800 rounded-xl p-4",

  renderCard,
}: PaginatedCardProps<T>) {
  const from = totalCount === 0 ? 0 : (pageNumber - 1) * pageSize + 1;
  const to = totalCount === 0 ? 0 : Math.min(pageNumber * pageSize, totalCount);

  return (
    <div className="space-y-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4">
          {isLoading ? (
            <CardListSkeleton count={Math.min(pageSize, 6)} />
          ) : data.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-500">
              {!isFilter ? emptyTitle : noResultsTitle}
            </div>
          ) : (
            <div className={gridClassName}>
              {data.map((row, i) => (
                <div key={i} className={cardClassName}>
                  {renderCard ? (
                    renderCard(row)
                  ) : (
                    <div className="space-y-3">
                      {columns?.map((col) => (
                        <div key={col.key} className={col.className ?? ""}>
                          {col.label ? (
                            <div className="text-xs text-gray-400 mb-1">{col.label}</div>
                          ) : null}
                          <div className="text-sm text-gray-200">{col.render(row)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoading && data.length > 0 && (
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

              <div className="text-xs text-gray-400 hidden sm:block">
                Page {pageNumber} of {totalPages}
              </div>

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

/**
 * Tiny helper to render a nice status pill without depending on your Badge component.
 * Swap to your <Badge /> if you want.
 */
export function StatusPill({ text }: { text: string }) {
  const t = (text ?? "").toLowerCase();

  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border";

  // keep the palette consistent with your dark UI; not too colorful
  if (t.includes("new"))
    return <span className={`${base} border-gray-700 text-gray-200 bg-black/30`}>New</span>;

  if (t.includes("review"))
    return <span className={`${base} border-gray-700 text-gray-200 bg-black/30`}>In review</span>;

  if (t.includes("short"))
    return <span className={`${base} border-gray-700 text-gray-200 bg-black/30`}>Shortlisted</span>;

  if (t.includes("reject"))
    return <span className={`${base} border-gray-700 text-gray-200 bg-black/30`}>Rejected</span>;

  return (
    <span className={`${base} border-gray-700 text-gray-200 bg-black/30`}>
      {text || "Unknown"}
    </span>
  );
}