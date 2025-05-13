/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationTable from "./PaginationTable";

type Column<T> = {
  key: keyof T | string;
  title: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

type TableCustomProps<T> = {
  data: T[];
  columns: Column<T>[];
  searchParams: Promise<{ page: string; pageSize: string }>;
};

export default async function TableCustom<T>({
  data,
  columns,
  searchParams,
}: TableCustomProps<T>) {
  const { page = "1", pageSize = "20" } = await searchParams;

  let pageInt = parseInt(page, 10);
  let pageSizeInt = parseInt(pageSize, 10);

  if (pageInt <= 0 || pageSizeInt <= 0) {
    pageInt = 1;
    pageSizeInt = 20;
  }

  const paginatedData = data.slice(
    (pageInt - 1) * pageSizeInt,
    pageInt * pageSizeInt
  );

  return (
    <div className="rounded-xl shadow-lg bg-white overflow-x-auto">
      <table className="w-full text-sm table-auto border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={`px-6 py-4 text-left ${col.className || ""}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition-colors duration-150 border-t"
            >
              {columns.map((col, cidx) => (
                <td key={cidx} className={`px-6 py-4 ${col.className || ""}`}>
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationTable
        currentPage={pageInt}
        itemsPerPage={pageSizeInt}
        totalItems={data.length}
      />
    </div>
  );
}
