import fastifyPlugin from "fastify-plugin";
import { seed } from "./seed";
import { ServicesRepository } from "./repository";

// Modifying this file is not required to work on the interview task.

export const servicesRepository = fastifyPlugin((fastify, opts, next) => {
  const repository = new ServicesRepository(fastify.log);
  seed(repository);
  fastify.decorate("servicesRepository", repository);
  next();
});
