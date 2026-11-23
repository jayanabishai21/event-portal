"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, deleteSession } from "@/lib/session";

function safeNext(value: FormDataEntryValue | null) {
  const next = String(value ?? "");
  const ok = next.startsWith("/") && !next.startsWith("//") && !next.startsWith("/\\");
  return ok ? next : "/";
}

export async function signup(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));
  const back = `next=${encodeURIComponent(next)}`;

  if (!name || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
    redirect(`/signup?error=invalid&${back}`);
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) redirect(`/signup?error=exists&${back}`);

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await createSession(user.id);
  redirect(next);
}

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));

  const user = await prisma.user.findUnique({ where: { email } });
  const valid = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if (!user || !valid) {
    redirect(`/login?error=invalid&next=${encodeURIComponent(next)}`);
  }

  await createSession(user.id);
  redirect(next);
}

export async function logout() {
  await deleteSession();
  redirect("/");
}