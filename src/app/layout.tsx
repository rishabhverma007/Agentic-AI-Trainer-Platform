import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/lib/react-query-provider";

export const metadata: Metadata = {
  title: "ALLOCATOR.AI - Agentic AI Trainer Allocation Platform",
  description: "Enterprise SaaS platform powered by Gemini 1.5 Pro and Supabase pgvector to automate technical trainer allocation for universities and corporate bootcamps.",
  keywords: ["Agentic AI", "Trainer Allocation", "SaaS", "Next.js 15", "Supabase", "Gemini AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#09090B] text-foreground antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
