import bcrypt from "bcrypt";
import {
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
import { prisma } from "../db.js";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export async function usersRoutes(app: FastifyInstance) {
  app.get("/users", async (_req: FastifyRequest, reply: FastifyReply) => {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true },
    });
    reply.send(users);
  });

  app.post<{ Body: RegisterBody }>(
    "/register",
    async (
      req: FastifyRequest<{ Body: RegisterBody }>,
      reply: FastifyReply,
    ) => {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hash },
        select: { id: true, name: true, email: true },
      });
      reply.send(user);
    },
  );
}
