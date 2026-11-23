import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";


export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = Number(id);
  if (Number.isNaN(eventId)) notFound();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) notFound();

  const seatsLeft = event.seats - event._count.registrations;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 text-sm">
        ← Back to events
      </Link>

      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600 mt-2">
        {event.date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        · {event.location}
      </p>

      <p className="mt-6">{event.description}</p>
      <p className="mt-4 text-sm text-gray-600">Seats available: {seatsLeft}</p>

      <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
        Register (coming soon)
      </button>
    </main>
  );
}