import { IWaifusionRequest, IWaifusionReply } from "../../types/Fastify";
import Config from "../../config.json";

export const getWaifuByTokenId = async (
  req: IWaifusionRequest,
  reply: IWaifusionReply
) => {
  const waifuId = req.params.waifuId;
  const revealedTokenIndex = (Number(waifuId) + Config.STARTING_INDEX) % 16384;

  const name = await req.fastify.waifusContract.methods
    .tokenNameByIndex(waifuId)
    .call({});
  const { attributes } = req.fastify.getWaifuByRevealedIndex(
    revealedTokenIndex
  );

  const openSeaFormattedAttributes = Object.entries(attributes).map(([trait_type, value]) => {
    return {
      trait_type,
      value
    }
  })

  const ipfsUrl = `${Config.IPFS_PREFIX}/${revealedTokenIndex}.png`;
  const detailUrl = `https://waifusion.sexy/detail/${revealedTokenIndex}`;

  reply.send({
    name,
    description:
      `Waifu #${req.params.tokenId} | You can claim WET and change your Waifu's name on [waifusion.sexy](https://waifusion.sexy).\n\nWarning: Waifu names can change at any time. Immediately before purchasing a Waifu, enter the Waifu's token ID into the tokenNameByIndex function on a site like Etherscan to verify that the blockchain indicates that the Waifu you're purchasing has the name you expect.`,
    image: ipfsUrl,
    external_url: detailUrl,
    attributes: openSeaFormattedAttributes,
  });
};
