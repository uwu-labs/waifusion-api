import { IWaifusionInstance, IWaifusionReply, IWaifusionRequest } from "../types/Fastify";
import fp from "fastify-plugin";

export default fp((fastify: IWaifusionInstance, _opts: any, next: any) => {
  fastify.addHook(
    "preHandler",
    async (req: IWaifusionRequest, _reply: IWaifusionReply, next: () => void) => {
      req.fastify = fastify;

      next();
    });

  next();
});