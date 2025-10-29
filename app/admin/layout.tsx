import { AdminProvider } from './admin-provider';

export const metadata = {
  title: 'Tina CMS Admin - Precision Manufacturing',
  robots: 'noindex, nofollow', // Prevent indexing of admin panel
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <html>
        <body style={{ margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    </AdminProvider>
  );
}
