"use client";

import React, { useState } from "react";
import { GlassCard } from "./glass-card";
import { TableSkeleton } from "./skeleton-loader";
import { EmptyState } from "./empty-state";
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  filterKey?: keyof T;
  pageSize?: number;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  searchPlaceholder = "Search records...",
  filterKey,
  pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return <TableSkeleton rows={pageSize} />;
  }

  // Search filtering
  const filteredData = data.filter((row) => {
    if (!search) return true;
    const term = search.toLowerCase();
    if (filterKey && row[filterKey]) {
      return String(row[filterKey]).toLowerCase().includes(term);
    }
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(term)
    );
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key?: keyof T) => {
    if (!key) return;
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <GlassCard hoverEffect={false} className="p-0 overflow-hidden border-white/10">
      {/* Header Search Bar */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
        <div className="text-xs text-gray-400 font-mono">
          Total: <span className="text-cyan-400 font-bold">{filteredData.length}</span> entries
        </div>
      </div>

      {/* Table Body */}
      {paginatedData.length === 0 ? (
        <div className="p-8">
          <EmptyState
            title="No Records Found"
            description="No items match your current search query or active filter."
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10 text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    onClick={() => col.sortable && handleSort(col.accessorKey)}
                    className={`px-4 py-3.5 ${
                      col.sortable ? "cursor-pointer hover:text-white transition select-none" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.header}</span>
                      {col.sortable && sortKey === col.accessorKey && (
                        sortOrder === "asc" ? (
                          <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                        )
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedData.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="hover:bg-white/[0.03] transition-colors group"
                >
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-4 py-3.5 text-gray-200">
                      {col.cell ? col.cell(row) : col.accessorKey ? String(row[col.accessorKey]) : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer Pagination */}
      <div className="p-3 bg-white/[0.01] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
        <div>
          Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
}
