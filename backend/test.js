import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "./generated/prisma/client.ts";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("mdp", 10);

  const user = await prisma.user.create({
    data: {
      name: "Kamil",
      email: "kamil@example.com",
      password: hash,
    },
  });

  console.log(user);
}

main();
