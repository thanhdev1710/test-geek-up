import TableCustom from "@/components/TableCustom";
import { Button } from "@/components/ui/button";
import { getAlbums, getUsers } from "@/services/api";
import { Eye } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Albums | NextJS",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; pageSize: string }>;
}) {
  const [albums, users] = await Promise.all([getAlbums(), getUsers()]);

  return (
    <TableCustom
      data={albums}
      searchParams={searchParams}
      columns={[
        {
          key: "id",
          title: "ID",
          className: "w-[80px]",
        },
        {
          key: "title",
          title: "Title",
        },
        {
          key: "userId",
          title: "User",
          render: (item) => {
            const user = users.find((u) => u.id === item.userId);
            const name = user?.name || "No name";
            return (
              <Link
                href={`/users/${item.userId}`}
                className="flex items-center gap-3 text-blue-600 hover:underline font-medium"
              >
                <Image
                  width={32}
                  height={32}
                  alt={`Avatar ${name}`}
                  src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(
                    name
                  )}`}
                  className="rounded-full"
                />
                <span>{name}</span>
              </Link>
            );
          },
        },
        {
          key: "actions",
          title: "Actions",
          className: "text-right",
          render: (item) => (
            <Button asChild>
              <Link href={`/albums/${item.id}`} className="cursor-pointer">
                <Eye className="w-4 h-4" />
                <span>Show</span>
              </Link>
            </Button>
          ),
        },
      ]}
    />
  );
}
