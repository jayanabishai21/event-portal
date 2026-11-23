import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { registerForEvent, cancelRegistration } from "./actions";



const messages: Record<string, { text: string; style: string }> = {
  duplicate: { text: "You are already registered for this event.", style: "bg-yellow-100 text-yellow-800" },
  full: { text: "Sorry, this event is full.", style: "bg-red-100 text-red-800" },
  cancelled: { text: "Your registration was cancelled.", style: "bg-gray-100 text-gray-800" },
};

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { id } = await params;
  const { status } = await searchParams;

  const eventId = Number(id);
  if (Number.isNaN(eventId)) notFound();

  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { registrations: true } } },
  });
  if (!event) notFound();

  const user = await getCurrentUser();
  const myRegistration = user
    ? await prisma.registration.findUnique({
        where: { userId_eventId: { userId: user.id, eventId } },
      })
    : null;

  const seatsLeft = event.seats - event._count.registrations;
  const message = status ? messages[status] : undefined;
  const loginUrl = `/login?next=${encodeURIComponent(`/events/${event.id}`)}`;
  const signupUrl = `/signup?next=${encodeURIComponent(`/events/${event.id}`)}`;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <Link href="/" className="text-blue-600 text-sm">← Back to events</Link>

      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600 mt-2">
        {event.date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}{" "}
        · {event.location}
      </p>

      <p className="mt-6">{event.description}</p>
      <p className="mt-4 text-sm text-gray-600">
        Seats left: {seatsLeft} of {event.seats}
      </p>

      {message && (
        <p className={`mt-6 rounded px-4 py-3 text-sm ${message.style}`}>{message.text}</p>
      )}

      <div className="mt-6">
        {myRegistration ? (
          <div className="space-y-3">
            <p className="rounded bg-green-100 text-green-800 px-4 py-3 text-sm">
              You&apos;re registered for this event.
            </p>
            <form action={cancelRegistration}>
              <input type="hidden" name="eventId" value={event.id} />
              <button type="submit" className="text-sm text-red-600 underline">
                Cancel my registration
              </button>
            </form>
          </div>
        ) : seatsLeft <= 0 ? (
          <p className="font-medium text-red-600">This event is full.</p>
        ) : !user ? (
          <p className="text-sm text-gray-600">
            <Link href={loginUrl} className="text-blue-600">Log in</Link> or{" "}
            <Link href={signupUrl} className="text-blue-600">sign up</Link> to register.
          </p>
        ) : (
          <form action={registerForEvent}>
            <input type="hidden" name="eventId" value={event.id} />
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
              Register
            </button>
          </form>
        )}
      </div>
    </main>
  );
}