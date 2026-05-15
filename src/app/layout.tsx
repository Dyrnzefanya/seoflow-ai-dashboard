import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SEOFlow — AI Search Visibility Platform",
    template: "%s · SEOFlow",
  },
  description:
    "Track your brand's visibility across Google, ChatGPT, Perplexity, and Gemini. Get daily AI-powered recommendations that actually move the needle.",
  keywords: ["SEO dashboard", "AI visibility", "GEO optimization", "AEO", "search analytics", "ChatGPT SEO"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "SEOFlow — AI Search Visibility Platform",
    description: "Monitor SEO, track AI visibility across 5 platforms, and get daily recommendations powered by Claude AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="h-full bg-[#080d1a]">{children}</body>
    </html>
  );
}
