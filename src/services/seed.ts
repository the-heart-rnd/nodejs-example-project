import { Service } from "./models";
import { ServicesRepository } from "./repository";

const initial: Service[] = [
  {
    id: "2f8d8268-9b1b-41e6-91b4-9ff6440f6cbb",
    group: "default",
    name: "discovery",
    IPs: ["172.10.45.125", "172.10.96.211"],
  },
  {
    id: "feb1abaf-696b-4b36-9457-9dcc466f0507",
    group: "default",
    name: "dns",
    IPs: ["172.10.76.3"],
  },
  {
    id: "36035616-0520-4c5d-8f4e-48f75b8b9d27",
    group: "development",
    name: "payments",
    IPs: ["172.10.78.144"],
  },
  {
    id: "42e7ca79-d464-4ebb-a8aa-49f4065c87bd",
    group: "development",
    name: "nginx-0",
    IPs: ["172.10.84.30", "172.10.21.102"],
  },
  {
    id: "54520805-4a62-42c5-82ab-1eef0fc608f6",
    group: "development",
    name: "web",
    IPs: ["172.10.28.90"],
  },
  {
    id: "bc122db8-8c3a-48c7-ab3d-2eca15146cf8",
    group: "production",
    name: "payments",
    IPs: ["172.10.81.241"],
  },
  {
    id: "4bb814c3-c4fa-448a-adc6-f0103d3c8028",
    group: "production",
    name: "nginx-0",
    IPs: ["172.10.98.2"],
  },
  {
    id: "1d2e6d41-72b6-4140-8ded-221d2f59f293",
    group: "production",
    name: "web",
    IPs: ["172.10.116.29"],
  },
];

const changes: Array<{
  type: "create" | "update" | "remove";
  service: Service;
}> = [
  {
    type: "update",
    service: {
      ...initial[0],
      IPs: ["172.10.45.125", "172.10.96.211", "172.10.70.164", "172.10.52.240"],
    },
  },
  {
    type: "remove",
    service: initial[7],
  },
  {
    type: "remove",
    service: initial[6],
  },
  {
    type: "remove",
    service: initial[5],
  },
  {
    type: "update",
    service: {
      ...initial[3],
      IPs: ["172.10.84.30"],
    },
  },
  {
    type: "remove",
    service: initial[4],
  },
  {
    type: "update",
    service: {
      ...initial[0],
      IPs: ["172.10.45.125", "172.10.96.211"],
    },
  },
  {
    type: "remove",
    service: initial[1],
  },
  { type: "create", service: initial[6] },
  { type: "create", service: initial[5] },
  { type: "create", service: initial[7] },
  {
    type: "update",
    service: {
      ...initial[3],
      IPs: ["172.10.84.30", "172.10.21.102"],
    },
  },
  { type: "create", service: initial[4] },
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function startGenerator(repository: ServicesRepository) {
  function applyChange(i: number) {
    setTimeout(() => {
      const change = changes[i];
      switch (change.type) {
        case "create":
          repository.create(change.service);
          break;
        case "update":
          repository.update(change.service);
          break;
        case "remove":
          repository.remove(change.service);
          break;
      }
      applyChange((i + 1) % changes.length);
    }, randomInt(4000, 8000));
  }

  applyChange(0);
}

export function seed(repository: ServicesRepository) {
  initial.forEach((service) => repository.create(service));
  startGenerator(repository);
}
