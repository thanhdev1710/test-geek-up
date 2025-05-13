import TableCustom from "@/components/TableCustom";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/services/api";
import { Eye } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users | NextJS",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; pageSize: string }>;
}) {
  const users = await getUsers();

  return (
    <TableCustom
      data={users}
      searchParams={searchParams}
      columns={[
        {
          key: "id",
          title: "ID",
          className: "w-[80px]",
        },
        {
          key: "avatar",
          title: "Avatar",
          render: (item) => (
            <Image
              width={32}
              height={32}
              alt={`Avatar ${item.name}`}
              src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${encodeURIComponent(
                item.name
              )}`}
              className="rounded-full"
            />
          ),
        },
        {
          key: "name",
          title: "Name",
        },
        {
          key: "email",
          title: "Email",
          render: (item) => (
            <Link
              href={`mailto:${item.email}`}
              className="text-blue-600 hover:underline"
            >
              {item.email}
            </Link>
          ),
        },
        {
          key: "phone",
          title: "Phone",
          render: (item) => (
            <Link
              href={`tel:${item.phone}`}
              className="text-blue-600 hover:underline"
            >
              {item.phone}
            </Link>
          ),
        },
        {
          key: "website",
          title: "Website",
          render: (item) => (
            <Link
              href={`http://${item.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {item.website}
            </Link>
          ),
        },
        {
          key: "actions",
          title: "Actions",
          className: "text-right",
          render: (item) => (
            <Button asChild>
              <Link href={`/users/${item.id}`} className="cursor-pointer">
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
