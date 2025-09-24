import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CMSIndicator from "@/components/cms-indicator";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Precision Manufacturing | Aerospace & Defense Supplier",
  description: "ITAR-compliant precision manufacturing for aerospace, defense, and energy industries. AS9100D certified with tolerances to ±0.0001\". Since 1995.",
  keywords: "precision manufacturing, aerospace manufacturing, defense contractor, AS9100D, ITAR registered, ISO 9001, CNC machining, metrology",
  openGraph: {
    title: "Precision Manufacturing | Aerospace & Defense",
    description: "ITAR-compliant precision manufacturing with 5-axis machining, adaptive manufacturing, and ultra-precision tolerances.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen lg:pt-32 pt-20">
          {children}
        </main>
        <Footer />
        <CMSIndicator />
      </body>
    </html>
  );
}
