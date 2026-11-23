"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function registerForEvent(formData: FormData) {
  const eventId = Number(formData.get("eventId"));
  if (!Number.isInteger(eventId)) redirect("/");

  const page = `/events/${eventId}`;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(page)}`);

  const result = await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { registrations: true } } },
    });
    if (!event) return "missing";

    const existing = await tx.registration.findUnique({
      where: { userId_eventId: { userId: user.id, eventId } },
    });
    if (existing) return "duplicate";

    if (event._count.registrations >= event.seats) return "full";

    await tx.registration.create({ data: { userId: user.id, eventId } });
    return "success";
  });

  if (result === "missing") redirect("/");

  revalidatePath(page);
  redirect(`${page}?status=${result}`);
}

export async function cancelRegistration(formData: FormData) {
  const eventId = Number(formData.get("eventId"));
  if (!Number.isInteger(eventId)) redirect("/");

  const user = await getCurrentUser();
  if (!user) redirect("/login");

  await prisma.registration.deleteMany({
    where: { userId: user.id, eventId },
  });

  revalidatePath(`/events/${eventId}`);
  redirect(`/events/${eventId}?status=cancelled`);
}