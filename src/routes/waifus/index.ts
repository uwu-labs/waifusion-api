import { IWaifusionInstance } from "../../types/Fastify";
import {
  filterWaifus,
  getBscWaifuByTokenId,
  getWaifuByTokenId,
} from "./handler";

export default (fastify: IWaifusionInstance, _opts: any, next: any) => {
  fastify.get("/:waifuId", getWaifuByTokenId);
  fastify.get("/bsc/:waifuId", getBscWaifuByTokenId);
  fastify.get("/filter", filterWaifus);

  next();
};
