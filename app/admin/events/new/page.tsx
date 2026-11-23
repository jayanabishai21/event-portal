import Link from "next/link";
import { createEvent } from "./actions";

const inputClass = "w-full border rounded px-3 py-2";

export default function NewEventPage() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <Link href="/" className="text-blue-600 text-sm">
        ← Back to events
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">Create Event</h1>

      <form action={createEvent} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input id="title" name="title" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <input id="date" name="date" type="date" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-1">
            Location
          </label>
          <input id="location" name="location" required className={inputClass} />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select id="category" name="category" required className={inputClass}>
            <option value="Technology">Technology</option>
            <option value="Cultural">Cultural</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div>
          <label htmlFor="seats" className="block text-sm font-medium mb-1">
            Total seats
          </label>
          <input
            id="seats"
            name="seats"
            type="number"
            min={1}
            required
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </main>
  );
}