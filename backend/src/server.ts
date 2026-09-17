import Fastify from "fastify";
import cors from "@fastify/cors";
import { usersRoutes } from "./routes/users.ts";

const app = Fastify({ logger: true });

await app.register(cors, { origin: "*" });
await app.register(usersRoutes);

await app.listen({ port: 4000, host: "localhost" });
