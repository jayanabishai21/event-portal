import Link from "next/link";
import { prisma } from "@/lib/prisma";


export default async function Home() {
  const events = await prisma.event.findMany({ orderBy: { date: "asc" } });

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Upcoming Events</h1>
      <p className="text-gray-600 mb-6">Find an event and register.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            className="border rounded-lg p-4 hover:shadow-md transition"
          >
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {event.category}
            </span>
            <h2 className="text-xl font-semibold mt-3">{event.title}</h2>
            <p className="text-sm text-gray-600 mt-1">
              {event.date.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-600">{event.location}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}