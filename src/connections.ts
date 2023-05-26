import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";

export function onConnection(connection: SocketStream, req: FastifyRequest) {
  connection.socket.on("message", async (data: ArrayBuffer) => {
    try {
      await onMessage(data, connection, req);
    } catch (err) {
      req.log.error(err);
      connection.socket.send(JSON.stringify({ error: err.message }));
    }
  });
}

async function onMessage(
  data: ArrayBuffer,
  connection: SocketStream,
  req: FastifyRequest
) {
  const message = data.toString();
  req.log.debug(`Received message: ${message}`);
  const command = JSON.parse(message);
  if (!("cmd" in command)) {
    throw new Error("Incorrect command structure");
  }
  return req.server.commandHandler.handle(command, connection, req);
}
