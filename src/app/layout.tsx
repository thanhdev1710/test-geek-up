import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Aside from "@/components/layouts/Aside";

const geistMontserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMontserrat.className} antialiased relative pt-16 bg-gray-50`}
      >
        <Header />
        <Aside />
        <main className="md:ml-[220px] p-8">{children}</main>
      </body>
    </html>
  );
}
