import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from "fastify/types/utils";
import { FastifyBaseLogger } from "fastify/types/logger";
import {
  FastifyTypeProvider,
  FastifyTypeProviderDefault,
} from "fastify/types/type-provider";
import { CommandHandlerRegistry } from "../handler";

// Modifying this file is not required to work on the interview task.

declare module "fastify" {
  export interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger extends FastifyBaseLogger = FastifyBaseLogger,
    TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault
  > {
    commandHandler: Omit<CommandHandlerRegistry, "register">;
  }
}
