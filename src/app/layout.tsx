import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/CookieBanner";
import { DisclaimerBanner } from "@/components/DisclaimerBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "RobloxCal | Multi-Game Calculator Network",
    template: "%s | RobloxCal"
  },
  description: "Free calculators and tools for popular Roblox games. AFSE Training Optimizer, Bomb Chip Odds Calculator, Craft a Brainrot Profit Calculator, and more.",
  keywords: [
    "roblox calculator",
    "afse calculator",
    "bomb chip calculator",
    "craft a brainrot calculator",
    "roblox tools",
    "roblox game tools"
  ],
  authors: [{ name: "RobloxCal Team" }],
  creator: "RobloxCal",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RobloxCal",
    images: ['/og-image.png'],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
        suppressHydrationWarning
      >
        <DisclaimerBanner />
        {children}
        <CookieBanner />
        <Toaster />
      </body>
    </html>
  );
}


