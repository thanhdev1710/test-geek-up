import { getAlbumById, getUserById } from "@/services/api";
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
  const album = await getAlbumById(id);
  return {
    title: `#${id} Show Albums | NextJS`,
    description: `View details of album "${album.title}"`,
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = await getAlbumById(id);
  const user = await getUserById(album.userId.toString());

  return (
    <div className="p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/albums">Albums</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{album.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold">{album.title}</h2>
        <p className="text-gray-600">Owned by: {user.name}</p>
        <p className="text-gray-600">User Email: {user.email}</p>

        <div className="flex items-center gap-4">
          <Image
            src={`https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
              user.name
            )}`}
            alt={`Avatar ${user.name}`}
            width={64}
            height={64}
            className="rounded-full"
          />
          <Link
            href={`/users/${user.id}`}
            className="text-blue-600 hover:underline"
          >
            <span>View user profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
