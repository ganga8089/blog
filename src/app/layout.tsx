import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oronium Blog | Discover Stories & Ideas",
  description: "A premium, full-fledged blog application built with Next.js 15 (App Router), React Query, and Tailwind CSS.",
  openGraph: {
    title: "Oronium Blog | Discover Stories & Ideas",
    description: "Explore the latest insights on design, AI, business, technology, and lifestyle.",
    type: "website",
    locale: "en_US",
    url: "https://oronium-blog.vercel.app",
    siteName: "Oronium Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oronium Blog | Discover Stories & Ideas",
    description: "Explore the latest insights on design, AI, business, technology, and lifestyle.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
