import { prisma } from "../lib/prisma";

async function main() {
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();

  await prisma.event.createMany({
    data: [
      {
        title: "Tech Fest 2026",
        date: new Date("2026-12-10"),
        location: "Main Auditorium, Coimbatore",
        category: "Technology",
        seats: 200,
        description: "A full-day festival with talks, demos and coding contests.",
      },
      {
        title: "Music Night",
        date: new Date("2026-12-15"),
        location: "Open Air Theatre",
        category: "Cultural",
        seats: 500,
        description: "An evening of live music from student and guest bands.",
      },
      {
        title: "Startup Pitch Day",
        date: new Date("2027-01-05"),
        location: "Seminar Hall B",
        category: "Business",
        seats: 80,
        description: "Teams pitch their startup ideas to a panel of mentors.",
      },
    ],
  });

  console.log("Seeded events");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1)
  })
  .finally(() => prisma.$disconnect());