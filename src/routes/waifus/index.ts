import { IWaifusionInstance } from "../../types/Fastify";
import { filterWaifus, getWaifuByTokenId } from "./handler";

export default (fastify: IWaifusionInstance, _opts: any, next: any) => {
  fastify.get("/:waifuId", getWaifuByTokenId);
  fastify.get("/filter", filterWaifus);

  next();
}