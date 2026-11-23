"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createEvent(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const date = String(formData.get("date") ?? "");
  const seats = Number(formData.get("seats"));

  if (
    !title ||
    !description ||
    !location ||
    !category ||
    !date ||
    !Number.isInteger(seats) ||
    seats < 1
  ) {
    throw new Error("Please fill in all fields correctly.");
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      location,
      category,
      date: new Date(date),
      seats,
    },
  });

  revalidatePath("/");
  redirect(`/events/${event.id}`);
}