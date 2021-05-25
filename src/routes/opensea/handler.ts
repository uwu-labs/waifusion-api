import { IWaifusionRequest, IWaifusionReply } from "../../types/Fastify";
import Config from "../../config.json";

export const getWaifuByTokenId = async (
  req: IWaifusionRequest,
  reply: IWaifusionReply
) => {
  const waifuId = req.params.waifuId;
  const revealedTokenIndex =
    (Number(waifuId) + Config.ETH.STARTING_INDEX) % 16384;

  const name = await req.fastify.waifusContract.methods
    .tokenNameByIndex(waifuId)
    .call({});
  const { attributes } = req.fastify.getWaifuByRevealedIndex(
    Number(waifuId)
  );

  const ownerAddr = await req.fastify.waifusContract.methods
    .ownerOf(waifuId)
    .call({});
    
  const openSeaFormattedAttributes: any[] = attributes.map(
    (obj: any) => {
      if (ownerAddr !== "0x0000000000000000000000000000000000080085" && obj.value != "") {
        return {
          trait_type: obj.trait_type,
          value: obj.value,
        };
      } else {
        return null
      }
    }
  );
  const filteredAttributes = openSeaFormattedAttributes.filter(t => !!t);

  let status = "freed" 
  if (ownerAddr === "0x0000000000000000000000000000000000080085") {
    status = "burned"
  } else if (ownerAddr.toLowerCase() === "0xb291984262259bcfe6aa02b66a06e9769c5c1ef3") {
    status = "dungeon"
  }
  filteredAttributes.push({
    trait_type: "Status",
    value: status,
  })

  const ipfsUrl = `${Config.ETH.IPFS_PREFIX}/${revealedTokenIndex}.png`;
  const detailUrl = `https://waifusion.io/waifu/${waifuId}`;

  reply.send({
    name,
    description: `Waifu #${req.params.waifuId}\n\nYou can claim WET and change your Waifu's name on [waifusion.io](https://waifusion.io).\n\nWaifusion is a community-run digital Waifu NFT project with deflationary mechanics. There are 16,384 guaranteed-unique Waifusion NFTs. They’re just like you; a beautiful work of art, but 2-D and therefore, superior, Anon-kun. Each Waifu is wholly unique and yours forever... unless you sell them... Baka.\n\n**Warning**: Waifu names can change at any time. Immediately before purchasing a Waifu, enter the Waifu's token ID into the tokenNameByIndex function on a site like Etherscan to verify that the blockchain indicates that the Waifu you're purchasing has the name you expect.`,
    image: ipfsUrl,
    external_url: detailUrl,
    attributes: filteredAttributes,
  });
};
