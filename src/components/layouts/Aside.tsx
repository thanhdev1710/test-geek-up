"use client";
import { NotebookTabs, BookUser, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Aside() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Overlay đen khi menu mở */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-20 left-4 z-40">
        <button
          className="text-gray-700 bg-white p-2 rounded-md shadow"
          onClick={toggleMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 h-screen w-[220px] bg-white px-4 py-6 z-50 transition-all duration-300 ease-in-out md:left-0 md:block ${
            isMenuOpen ? "left-0" : "-left-full"
          }
        `}
      >
        <Link href="/">
          <Image
            alt="Logo Geek Up"
            width={150}
            height={50}
            src="/geekup-logo-general.svg"
            className="h-8 w-auto"
          />
        </Link>

        <nav className="space-y-2 mt-8">
          <ul className="space-y-1">
            <li>
              <Link
                href="/albums"
                className={`${
                  pathname.startsWith("/albums")
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                } flex items-center font-medium gap-2 px-3 py-2 text-[14px] rounded-md hover:bg-blue-100 hover:text-blue-600 transition`}
                onClick={closeMenu}
              >
                <NotebookTabs size={16} /> <span>Albums</span>
              </Link>
            </li>
            <li>
              <Link
                href="/users"
                className={`${
                  pathname.startsWith("/users")
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700"
                } flex items-center font-medium gap-2 px-3 py-2 text-[14px] rounded-md hover:bg-blue-100 hover:text-blue-600 transition`}
                onClick={closeMenu}
              >
                <BookUser size={16} /> <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
