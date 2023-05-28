import { Service } from "./models";
import fastifyPlugin from "fastify-plugin";
import { FastifyBaseLogger } from "fastify/types/logger";
import { seed } from "./seed";

export class ServicesRepository {
  private services = new Map<string, Service>();

  constructor(private log: FastifyBaseLogger) {}

  create(service: Service) {
    if (this.services.has(service.id)) {
      throw new Error("This service already exists in repository");
    }
    this.services.set(service.id, service);
    this.log.trace(
      `Service ${service.group}/${service.name} (${service.id}) created`
    );
  }

  update(service: Service) {
    if (!this.services.has(service.id)) {
      throw new Error("This service does not exist in repository");
    }
    this.services.set(service.id, service);
    this.log.trace(
      `Service ${service.group}/${service.name} (${service.id}) updated`
    );
  }

  remove(service: Service) {
    if (!this.services.has(service.id)) {
      throw new Error("This service does not exist in repository");
    }
    this.services.delete(service.id);
    this.log.trace(
      `Service ${service.group}/${service.name} (${service.id}) removed`
    );
  }
}

export const servicesRepository = fastifyPlugin((fastify, opts, next) => {
  const repository = new ServicesRepository(fastify.log);
  seed(repository);
  fastify.decorate("servicesRepository", repository);
  next();
});
