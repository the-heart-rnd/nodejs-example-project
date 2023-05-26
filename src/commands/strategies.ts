import { Command, CommandHandlerRegistry } from "./handler";

export interface PingCommand extends Command<"ping"> {
  nonce: string;
}

export function registerCommands(registry: CommandHandlerRegistry) {
  registry.register<PingCommand>("ping", (command, connection) => {
    connection.socket.send(
      JSON.stringify({ cmd: "pong", nonce: command.nonce })
    );
  });
}
