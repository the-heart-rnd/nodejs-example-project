import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";

export interface Command<T extends string> {
  cmd: T;
}

export type CommandHandlerFn<T extends Command<any>> = (
  command: T,
  connection: SocketStream,
  req: FastifyRequest
) => Promise<void> | void;

export class CommandHandlerRegistry {
  private reg = new Map<string, CommandHandlerFn<any>>();

  register<T extends Command<any>>(
    cmd: T["cmd"],
    handler: CommandHandlerFn<T>
  ) {
    this.reg.set(cmd, handler);
  }

  async handle(
    command: Command<any>,
    connection: SocketStream,
    req: FastifyRequest
  ) {
    const handler = this.reg.get(command.cmd);
    if (handler != null) {
      await handler(command, connection, req);
    } else {
      throw new Error("Unknown command");
    }
  }
}

export type Handler = Omit<CommandHandlerRegistry, "register">;

export const commandHandler = (
  applyStrategies: (registry: CommandHandlerRegistry) => void
) =>
  fastifyPlugin((fastify, opts, next) => {
    const registry = new CommandHandlerRegistry();
    applyStrategies(registry);
    fastify.decorate("commandHandler", registry);
    next();
  });
