import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "ALLOCATOR.AI — Agentic AI Trainer Allocation Platform",
  description:
    "Enterprise SaaS platform powered by Gemini 1.5 Pro and Supabase pgvector to automate technical trainer allocation for universities and corporate bootcamps.",
  keywords: [
    "Agentic AI",
    "Trainer Allocation",
    "SaaS",
    "Next.js 15",
    "Supabase",
    "Gemini AI",
    "Enterprise",
  ],
  openGraph: {
    title: "ALLOCATOR.AI — Agentic AI Trainer Allocation",
    description:
      "Match universities and corporate bootcamps with world-class technical trainers in seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLOCATOR.AI — Agentic AI Trainer Allocation",
    description:
      "Match universities and corporate bootcamps with world-class technical trainers in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased selection:bg-cyan-500/30 selection:text-white font-sans">
        <ReactQueryProvider>
          <AuthProvider>
            <CustomCursor />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
