import fastify from "fastify";
import pino from "pino";
import pretty from "pino-pretty";
import { onConnection } from "./connections";
import { commandHandler } from "./commands/handler";
import { registerCommands } from "./commands/strategies";
import { join } from "path";

const server = fastify({
  logger: pino(
    { level: "trace" },
    pretty({
      colorize: true,
    })
  ),
});

server.register(import("@fastify/static"), {
  root: join(__dirname, "public"),
});
server.register(import("@fastify/websocket"));
server.register(commandHandler(registerCommands));

server.get("/", function (req, reply) {
  reply.sendFile("index.html");
});

server.register(async (fastify) => {
  fastify.get("/ws", { websocket: true }, onConnection);
});

server.listen({ port: 3010 }, (err) => {
  if (err) {
    process.exit(1);
  }
});
