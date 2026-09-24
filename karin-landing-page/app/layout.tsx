import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Southlake Home Value & Selling Strategy Review | Karin Kilburn",
  description:
    "Considering selling a $1M+ home in Southlake or DFW? Request a private Home Value & Selling Strategy Review with Karin Kilburn, REALTOR® and Home Staging Expert®.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Karin Kilburn",
    title: "Before You List Your Southlake Home | Karin Kilburn",
    description:
      "A private Home Value & Selling Strategy Review for $1M+ properties in Southlake and DFW.",
    url: SITE.url,
  },
  twitter: {
    card: "summary",
    title: "Your Private Seller Review | Karin Kilburn",
    description:
      "Understand your property’s position before you list. Southlake & DFW luxury real estate.",
  },
  robots: { index: SITE.indexable, follow: SITE.indexable },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/editorial.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/interface.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
