import Link from "next/link";
import { signup } from "@/app/auth/actions";

const inputClass = "w-full border rounded px-3 py-2";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next = "/" } = await searchParams;

  const message =
    error === "exists"
      ? "An account with this email already exists."
      : error
        ? "Enter your name, a valid email and a password of at least 6 characters."
        : null;

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create account</h1>

      {message && (
        <p className="mb-4 rounded bg-red-100 text-red-800 px-4 py-3 text-sm">{message}</p>
      )}

      <form action={signup} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <input name="name" placeholder="Full name" required className={inputClass} />
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
        <input name="password" type="password" placeholder="Password (min 6 characters)" required minLength={6} className={inputClass} />
        <button type="submit" className="w-full bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Sign up
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="text-blue-600">
          Log in
        </Link>
      </p>
    </main>
  );
}