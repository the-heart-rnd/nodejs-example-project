import { Service } from "./models";
import { FastifyBaseLogger } from "fastify/types/logger";

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
