import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export default async function MyEventsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const registrations = await prisma.registration.findMany({
    where: { userId: user.id },
    include: { event: true },
    orderBy: { event: { date: "asc" } },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">My Events</h1>
      <p className="text-gray-600 mb-6">Events you have registered for.</p>

      {registrations.length === 0 ? (
        <p className="text-gray-600">
          You haven&apos;t registered for any events yet.{" "}
          <Link href="/" className="text-blue-600">
            Browse events
          </Link>
        </p>
      ) : (
        <div className="grid gap-4">
          {registrations.map((reg) => (
            <Link
              key={reg.id}
              href={`/events/${reg.event.id}`}
              className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {reg.event.category}
              </span>
              <h2 className="text-xl font-semibold mt-3">{reg.event.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {reg.event.date.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-gray-600">{reg.event.location}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}