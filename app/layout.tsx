import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/pos/Sidebar";
import { TopNav } from "@/components/pos/TopNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Supermarket POS",
  description: "MVP cashier interface",
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 ml-20">
            <TopNav pageTitle="Dashboard" />
            <main className="pt-22 min-h-screen">
              {children}
              <Toaster richColors position="top-right" />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
