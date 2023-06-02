import fastifyPlugin from "fastify-plugin";
import { CommandHandlerRegistry } from "./handler";

// Modifying this file is not required to work on the interview task.

export const commandHandler = (
  applyStrategies: (registry: CommandHandlerRegistry) => void
) =>
  fastifyPlugin((fastify, opts, next) => {
    const registry = new CommandHandlerRegistry();
    applyStrategies(registry);
    fastify.decorate("commandHandler", registry);
    next();
  });
