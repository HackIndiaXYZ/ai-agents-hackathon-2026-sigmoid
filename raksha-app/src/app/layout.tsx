import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Raksha AI — Disaster Survival Copilot",
  description: "AI-powered disaster survival platform. Find shelter, reach safety, protect your family.",
  keywords: ["emergency response", "AI", "safety", "SOS", "crisis management", "disaster survival"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark overflow-x-hidden">
      <body className="overflow-hidden bg-[var(--bg-void)] text-[#ffffff] antialiased">
        <div className="flex flex-col h-screen w-full relative">
          <div className="aurora-bg">
            <div className="aurora-1" />
            <div className="aurora-2" />
            <div className="particles-overlay" />
          </div>
          <TopNav />
          <div className="flex-1 flex flex-col overflow-hidden min-w-0 relative z-10">
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
