import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Integrated Inspection Systems, Inc. | Innovative Machining & Inspection",
  description: "Founded in 1995, IIS provides precision machining, inspection, fixture design, and metrology services. AS9100D certified, ITAR registered, ISO 9001 compliant.",
  keywords: "precision machining, inspection services, fixture design, metrology, AS9100D, ITAR registered, ISO 9001, Metbase, Clackamas Oregon",
  openGraph: {
    title: "Integrated Inspection Systems, Inc. | Innovative Machining",
    description: "Quality is not inspected into a product but inherently designed and built into every process. AS9100D certified, ITAR registered.",
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
      </body>
    </html>
  );
}
