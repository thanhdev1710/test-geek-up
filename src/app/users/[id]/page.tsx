import TableCustom from "@/components/TableCustom";
import { Button } from "@/components/ui/button";
import { getAlbumsByUserId, getUserById } from "@/services/api";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);

  return {
    title: `#${id} User Profile | NextJS`,
    description: `View profile of user "${user.name}" with email ${user.email}`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page: string; pageSize: string }>;
}) {
  const { id } = await params;
  const [user, albums] = await Promise.all([
    getUserById(id),
    getAlbumsByUserId(Number(id)),
  ]);

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">Users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
        <Image
          src={`https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
            user.name
          )}`}
          alt={`Avatar ${user.name}`}
          width={32}
          height={32}
          className="rounded-full"
        />
        <div>
          <h2 className="text-lg font-semibold mb-1">{user.name}</h2>
          <p className="text-gray-600">
            📧{" "}
            <Link
              href={`mailto:${user.email}`}
              className="text-blue-600 hover:underline"
            >
              {user.email}
            </Link>
          </p>
        </div>
      </div>

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
    </div>
  );
}
