import Link from "next/link";
import { login } from "@/app/auth/actions";

const inputClass = "w-full border rounded px-3 py-2";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next = "/" } = await searchParams;

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Log in</h1>

      {error && (
        <p className="mb-4 rounded bg-red-100 text-red-800 px-4 py-3 text-sm">
          Incorrect email or password.
        </p>
      )}

      <form action={login} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
        <input name="password" type="password" placeholder="Password" required className={inputClass} />
        <button type="submit" className="w-full bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Log in
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        No account?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="text-blue-600">
          Sign up
        </Link>
      </p>
    </main>
  );
}