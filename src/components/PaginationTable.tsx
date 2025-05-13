"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function PaginationTable({
  totalItems,
  itemsPerPage,
  currentPage,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const visiblePages = 3;
  const router = useRouter();

  const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  const endPage = Math.min(
    currentPage + Math.floor(visiblePages / 2),
    totalPages
  );
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handlePageSizeChange = useCallback(
    (value: string) => {
      const newPageSize = parseInt(value);
      const currentItemIndex = (currentPage - 1) * itemsPerPage;
      const newPage = Math.floor(currentItemIndex / newPageSize) + 1;

      router.push(`?page=${newPage}&pageSize=${newPageSize}`);
    },
    [router, currentPage, itemsPerPage]
  );

  return (
    <div className="flex items-center justify-end px-6 py-3">
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="flex flex-wrap justify-center sm:justify-start gap-2">
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${
                currentPage > 1 ? currentPage - 1 : 1
              }&pageSize=${itemsPerPage}`}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink href={`?page=1&pageSize=${itemsPerPage}`}>
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationLink
                    href={`?page=${Math.max(
                      currentPage - 3,
                      1
                    )}&pageSize=${itemsPerPage}`}
                    className="group"
                  >
                    <span className="group-hover:hidden">...</span>
                    <span className="hidden group-hover:inline">{"<<"}</span>
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}&pageSize=${itemsPerPage}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${Math.min(
                  currentPage + 3,
                  totalPages
                )}&pageSize=${itemsPerPage}`}
                className="group"
              >
                <span className="group-hover:hidden">...</span>
                <span className="hidden group-hover:inline">{">>"}</span>
              </PaginationLink>
            </PaginationItem>
          )}

          {endPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href={`?page=${totalPages}&pageSize=${itemsPerPage}`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href={`?page=${
                currentPage < totalPages ? currentPage + 1 : totalPages
              }&pageSize=${itemsPerPage}`}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Select
        onValueChange={handlePageSizeChange}
        defaultValue={itemsPerPage.toString()}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 20, 50, 100].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size} / page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
