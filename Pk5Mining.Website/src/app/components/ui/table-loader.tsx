import React from "react";

type TableSkeletonProps = {
  rows?: number;
  cols?: number;
  showHeader?: boolean;
  className?: string;
  colWidths?: string[];
};

const CellSkeleton = ({ className = "" }: { className?: string }) => (
  <div className={`h-4 bg-gray-800/60 rounded animate-pulse ${className}`} />
);

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 6,
  cols = 7,
  showHeader = true,
  className = "",
  colWidths,
}) => {
  const widths =
    colWidths && colWidths.length >= cols
      ? colWidths.slice(0, cols)
      : Array.from({ length: cols }).map((_, i) => {
          // nicer default variety
          if (i === 0) return "w-44";
          if (i === cols - 1) return "w-20 ml-auto";
          return i % 3 === 0 ? "w-22" : i % 3 === 1 ? "w-20" : "w-18";
        });

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full text-sm">
        {showHeader && (
          <thead className="bg-black/40 text-gray-300">
            <tr>
              {Array.from({ length: cols }).map((_, i) => (
                <th key={`h-${i}`} className="px-4 py-3 text-left font-medium">
                  <CellSkeleton className={`h-3 ${widths[i]}`} />
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {Array.from({ length: rows }).map((_, r) => (
            <tr
              key={`r-${r}`}
              className="border-t border-gray-800 hover:bg-white/5"
            >
              {Array.from({ length: cols }).map((_, c) => (
                <td key={`c-${r}-${c}`} className="px-4 py-3 align-top">
                  {c === 0 ? (
                    <div className="space-y-2">
                      <CellSkeleton className="w-32" />
                      <CellSkeleton className="w-48 h-3" />
                    </div>
                  ) : c === cols - 1 ? (
                    <div className="flex justify-end gap-2">
                      <CellSkeleton className="w-8 h-8 rounded-md" />
                      <CellSkeleton className="w-8 h-8 rounded-md" />
                      <CellSkeleton className="w-8 h-8 rounded-md" />
                    </div>
                  ) : (
                    <CellSkeleton className={widths[c]} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};