import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout wraps ALL routes but should NOT render html/body
  // because route groups (like (payload) and (site)) provide their own
  return children;
}
