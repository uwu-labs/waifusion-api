import { IWaifusionRequest, IWaifusionReply } from "../../types/Fastify";
import { createWaifuObjectFromScrapeDataObject } from "../../util/dataTransformer";

export const getWaifuByTokenId = async (
  req: IWaifusionRequest,
  reply: IWaifusionReply
) => {
  const waifu = await createWaifuObjectFromScrapeDataObject(req.params.waifuId, true);

  reply.success(waifu);
};

export const filterWaifus = async (
  req: IWaifusionRequest,
  reply: IWaifusionReply
) =>  {

}