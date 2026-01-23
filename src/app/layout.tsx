import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CouponBanner } from "@/components/home/CouponBanner";
import { FloatingFeedback } from "@/components/home/FloatingFeedback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KN Biosciences",
  description: "Microbial Micro-Precision Inventory & Sales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen pt-16`}
      >
        <CouponBanner />
        <Navbar />
        <main>
          {children}
        </main>
        <FloatingFeedback />
      </body>
    </html>
  );
}
