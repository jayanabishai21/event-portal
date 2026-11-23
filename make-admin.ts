import { prisma } from "./lib/prisma";

async function main() {
  const user = await prisma.user.update({
    where: { email: "admin@example.com" },
    data: { role: "ADMIN" },
  });
  console.log("Updated:", user.email, user.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());