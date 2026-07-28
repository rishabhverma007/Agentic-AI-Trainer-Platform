import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { JsonLd } from "@/components/ui/json-ld";

const BASE_URL = "https://allocator.ai";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "ALLOCATOR.AI — Agentic AI Trainer Allocation Platform for Universities & Bootcamps",
  description:
    "Enterprise SaaS platform powered by Gemini 1.5 Pro and Supabase pgvector that automates technical trainer allocation for universities and corporate bootcamps in under 4 seconds.",
  keywords: [
    "Agentic AI",
    "Trainer Allocation",
    "AI Matching Engine",
    "University Bootcamp",
    "Technical Trainer",
    "Gemini 1.5 Pro",
    "Supabase pgvector",
    "SaaS Platform",
    "Enterprise AI",
    "Next.js 15",
    "FastAPI",
    "Vector Search",
    "Automated Allocation",
  ],
  authors: [{ name: "ALLOCATOR.AI", url: BASE_URL }],
  creator: "ALLOCATOR.AI",
  publisher: "ALLOCATOR.AI",
  applicationName: "ALLOCATOR.AI",
  generator: "Next.js 15",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ALLOCATOR.AI",
    title: "ALLOCATOR.AI — Agentic AI Trainer Allocation Platform",
    description:
      "Match universities and corporate bootcamps with world-class technical trainers in seconds. Powered by Gemini 1.5 Pro autonomous agents & vector search.",
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ALLOCATOR.AI — Agentic AI Trainer Allocation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLOCATOR.AI — Agentic AI Trainer Allocation",
    description:
      "Match universities and corporate bootcamps with world-class technical trainers in seconds.",
    site: "@allocator_ai",
    creator: "@allocator_ai",
    images: [`${BASE_URL}/og-image.png`],
  },
  category: "technology",
  classification: "Enterprise SaaS",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "ALLOCATOR.AI",
    "format-detection": "telephone=no",
    "theme-color": "#050508",
    "msapplication-TileColor": "#050508",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href={BASE_URL} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-cyan-500/30 selection:text-white font-sans">
        <ReactQueryProvider>
          <AuthProvider>
            <CustomCursor />
            {/* JSON-LD: WebApplication */}
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: "ALLOCATOR.AI",
                alternateName: "ALLOCATOR AI Trainer Allocation Platform",
                url: BASE_URL,
                description:
                  "Enterprise SaaS platform powered by Gemini 1.5 Pro and Supabase pgvector that automates technical trainer allocation for universities and corporate bootcamps.",
                applicationCategory: "BusinessApplication",
                operatingSystem: "All",
                browserRequirements: "Requires modern browser with JavaScript enabled",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                },
                author: {
                  "@type": "Organization",
                  name: "ALLOCATOR.AI Inc.",
                  url: BASE_URL,
                },
                creator: {
                  "@type": "Organization",
                  name: "ALLOCATOR.AI Inc.",
                  url: BASE_URL,
                },
                about: {
                  "@type": "Thing",
                  name: "AI-Powered Trainer Allocation",
                  description:
                    "Autonomous multi-agent system using Gemini 1.5 Pro to match technical trainers with universities and bootcamps.",
                },
                softwareVersion: "2.4",
                featureList: [
                  "Multi-Agent AI Orchestration",
                  "Supabase pgvector Semantic Search",
                  "Enterprise Role-Based Governance",
                  "Instant Digital Contract Generation",
                  "Real-Time Availability & Calendar Sync",
                  "Predictive Analytics & Demand Forecasting",
                ],
                screenshot: `${BASE_URL}/og-image.png`,
              }}
            />
            {/* JSON-LD: Organization */}
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "ALLOCATOR.AI",
                alternateName: "ALLOCATOR AI",
                url: BASE_URL,
                logo: `${BASE_URL}/og-image.png`,
                description:
                  "Enterprise Agentic AI platform that automates technical trainer allocation for universities and corporate bootcamps.",
                foundingDate: "2026",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "hello@allocator.ai",
                },
                sameAs: [
                  "https://twitter.com/allocator_ai",
                  "https://linkedin.com/company/allocator-ai",
                  "https://github.com/rishabhverma007/Agentic-AI-Trainer-Platform",
                ],
              }}
            />
            {/* JSON-LD: BreadcrumbList */}
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Dashboard",
                    item: `${BASE_URL}/dashboard`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "AI Matching Engine",
                    item: `${BASE_URL}/dashboard/matching`,
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Trainer Directory",
                    item: `${BASE_URL}/dashboard/trainers`,
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    name: "Assignments & Contracts",
                    item: `${BASE_URL}/dashboard/assignments`,
                  },
                ],
              }}
            />
            {children}
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
