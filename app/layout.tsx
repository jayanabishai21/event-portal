import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getCurrentUser } from "@/lib/session";
import { logout } from "./auth/actions";

export const metadata: Metadata = {
  title: "Event Portal",
  description: "Browse and register for events",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <nav className="border-b px-6 py-4 flex items-center gap-6">
          <Link href="/" className="font-bold">EventPortal</Link>
          <Link href="/" className="text-gray-600">Events</Link>
          {user && <Link href="/my-events" className="text-gray-600">My Events</Link>}
          {user?.role === "ADMIN" && (
            <>
              <Link href="/admin" className="text-gray-600">Dashboard</Link>
              <Link href="/admin/events/new" className="text-gray-600">Create Event</Link>
            </>
          )}

          <div className="ml-auto flex items-center gap-4 text-sm">
            {user ? (
              <>
                <span className="text-gray-600">{user.name}</span>
                <form action={logout}>
                  <button type="submit" className="text-blue-600">Log out</button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-600">Log in</Link>
                <Link href="/signup" className="text-blue-600">Sign up</Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}