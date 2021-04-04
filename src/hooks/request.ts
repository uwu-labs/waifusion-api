import { Error, IWaifusionInstance, IWaifusionReply, IWaifusionRequest } from "../types/Fastify";
import fp from "fastify-plugin";

export default fp((fastify: IWaifusionInstance, _opts: any, nextPlugin: any) => {
  fastify.addHook(
    "preHandler",
    async (req: IWaifusionRequest, reply: IWaifusionReply, next: () => void) => {
      req.fastify = fastify;

      reply.success = (data?: any) => {
        return reply.send(data ? { success: true, data } : { success: true });
      };

      reply.error = (statusCode: number, error: Error) => {
        return reply.status(statusCode).send({ success: false, error: error });
      };

      next();
    });

    nextPlugin();
});