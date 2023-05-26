import fastify from "fastify";
import pino from "pino";
import fastifyws from "@fastify/websocket";
import { onConnection } from "./connections";
import { commandHandler } from "./commands/handler";
import { registerCommands } from "./commands/strategies";

const server = fastify({
  logger: pino({ level: "trace" }),
});

server.register(fastifyws);
server.register(commandHandler(registerCommands));
server.register(async (fastify) => {
  fastify.get("/", { websocket: true }, onConnection);
});

server.listen({ port: 8080 }, (err) => {
  if (err) {
    process.exit(1);
  }
});
