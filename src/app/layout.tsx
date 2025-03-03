"use client";
import { usePathname } from "next/navigation";
import MainNavbar from "@/_mycomponents/navigation/MainNavbar";
import Footer from "@/components/layout/Footer";
import ReduxStoreProvider from "@/_mycomponents/providers/ReduxStoreProvider";
import "./globals.css"; // ✅ Ensure styles apply globally
import SessionProvider from "@/_mycomponents/providers/SessionProvider"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ If it's an admin route, do NOT render RootLayout
  if (pathname.startsWith("/admin")) {
    return <>{children}</>; // ✅ Let `AdminLayout` handle admin pages
  }

  return (
    <html lang="en">
      <body className="dark:bg-[#111423] min-h-screen flex flex-col">
        <ReduxStoreProvider>
        <SessionProvider>
          <MainNavbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          </SessionProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}

// <SessionProvider>
//import SessionProvider from "@/_mycomponents/providers/SessionProvider"; 