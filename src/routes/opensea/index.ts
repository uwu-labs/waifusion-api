import { IWaifusionInstance } from "../../types/Fastify";
import { getWaifuByTokenId } from "./handler";

export default (fastify: IWaifusionInstance, _opts: any, next: any) => {
  fastify.get("/:waifuId", getWaifuByTokenId);

  next();
}