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
  title: "Precision Manufacturing | Aerospace & Defense Supplier",
  description: "ITAR-compliant precision manufacturing for aerospace, defense, and energy industries. Specializing in 5-axis machining, adaptive manufacturing, and ultra-precision tolerances.",
  keywords: "aerospace manufacturing, precision machining, ITAR compliant, 5-axis machining, defense contractor",
  openGraph: {
    title: "Precision Manufacturing | Aerospace & Defense Supplier",
    description: "ITAR-compliant precision manufacturing for aerospace, defense, and energy industries.",
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
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
