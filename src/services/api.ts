import { Albums, Users } from "@/interfaces/api";

export async function getAlbums(): Promise<Albums[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Lấy dữ liệu thất bại");
  }
  const data = await res.json();

  return data;
}

export async function getAlbumById(id: string): Promise<Albums> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Lấy dữ liệu thất bại");
  }
  const data = await res.json();

  return data;
}

export async function getUsers(): Promise<Users[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Lấy dữ liệu thất bại");
  }
  const data = await res.json();

  return data;
}

export async function getUserById(id: string): Promise<Users> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Lấy dữ liệu thất bại");
  }
  const data = await res.json();

  return data;
}

export async function getAlbumsByUserId(userId: number): Promise<Albums[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums", {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Lấy dữ liệu thất bại");
  }
  const data: Albums[] = await res.json();

  return data.filter((item) => item.userId === userId);
}
