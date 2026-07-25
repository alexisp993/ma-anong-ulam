import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Nav } from "@/components/layout/Nav";
import { Sidebar } from "@/components/layout/Sidebar";
import { AuthSessionProvider } from "@/components/layout/AuthSessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ma, Anong Ulam?",
  description: "Decide what to cook today, in under a minute.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <AuthSessionProvider>
          <div className="md:flex md:min-h-screen">
            <Sidebar />
            <div className="flex-1">
              <div className="md:hidden">
                <Header />
                <Nav />
              </div>
              <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">{children}</main>
            </div>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
