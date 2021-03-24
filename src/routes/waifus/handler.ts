import { IWaifusionRequest, IWaifusionReply, IWaifusionInstance } from "../../types/Fastify";

export const getWaifuByTokenId = async (req: IWaifusionRequest, reply: IWaifusionReply) => {
  const waifuId = req.params.waifuId;
  const revealedTokenIndex = Number(waifuId) + 11595 % 16384;

  const name = await req.fastify.waifusContract.methods.tokenNameByIndex(waifuId).call({});
  const {attributes} = req.fastify.getWaifuByRevealedIndex(revealedTokenIndex);


  reply.send({name, attributes});
}