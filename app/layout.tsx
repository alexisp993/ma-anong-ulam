import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Nav } from "@/components/layout/Nav";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { AuthSessionProvider } from "@/components/layout/AuthSessionProvider";
import { tipForDay } from "@/components/layout/TipOfTheDayCard";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ma, Anong Ulam?",
  description: "Decide what to cook today, in under a minute.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resolved here (server) rather than inside the client Sidebar, so the tip
  // can't differ between the SSR pass and hydration.
  const tip = tipForDay(new Date().getDay());

  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-sans">
        <AuthSessionProvider>
          <div className="md:flex md:min-h-screen">
            <Sidebar tip={tip} />
            <div className="flex-1">
              <div className="md:hidden">
                <Header />
                <Nav />
              </div>
              <Topbar />
              <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
            </div>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
