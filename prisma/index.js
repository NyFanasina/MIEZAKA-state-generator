import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  // const users = await prisma.user.create({
  //   data: {
  //     email: "test@gmail.com",
  //     name: "test",
  //     password: "2b$10$iPklITK3uACBoWP1RNDK2efFHYChPu/JdnHelY8aElg4abfWnt.dC",
  //   },
  // });

  const users = await prisma.user.findMany();

  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
