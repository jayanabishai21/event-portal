import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Portal",
  description: "Browse and register for events",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="border-b px-6 py-4 flex gap-6">
          <Link href="/" className="font-bold">
            EventPortal
          </Link>
          <Link href="/" className="text-gray-600">
            Events
          </Link>
          <Link href="/admin/events/new" className="text-gray-600">
            Create Event
          </Link>
        </nav>
        {children}
      </body>
    </html>
  );
}