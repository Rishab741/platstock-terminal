import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Platstock | AI-Native Capital Terminal",
  description:
    "Democratizing the Wall Street Edge. An AI-Native B2B Capital Tracking & Portfolio Analytics Terminal productizing elite quantitative modeling and secure sovereign infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        fraunces.variable,
        plexMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-[#0A0E17] text-white">
        {children}
      </body>
    </html>
  );
}
