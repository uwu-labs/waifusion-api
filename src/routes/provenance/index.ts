import { IWaifusionInstance } from "../../types/Fastify";
import { listProvenanceData } from "./handler";

export default (fastify: IWaifusionInstance, _opts: any, next: any) => {
  fastify.get("/list", listProvenanceData);

  next();
}