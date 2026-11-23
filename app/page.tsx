import Link from "next/link";
import { events } from "@/lib/events";

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
        Upcoming Events
      </h1>
      <p style={{ color: "#9ca3af", marginBottom: "2rem" }}>
        Pick an event to see the details.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/events/${event.id}`}
            style={{
              display: "block",
              padding: "1.25rem",
              border: "1px solid #333",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
              {event.title}
            </h2>
            <p style={{ color: "#9ca3af", margin: "0.5rem 0" }}>
              {event.date} · {event.location}
            </p>
            <p style={{ fontSize: "0.9rem" }}>{event.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}