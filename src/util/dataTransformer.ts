import {
  WaifuScrabeDataAttributes,
  WaifuScrabeDataObject,
} from "../types/ScrapeData";
import { IWaifu, IWaifuAttribute, IWaifuOwner } from "../types/Waifusion";
import Config from "../config.json";
import { app } from "..";
import { getAsset } from "./openseaApi";

export const createWaifuObjectFromScrapeDataObject = async (
  waifuId: string,
  bsc: boolean,
  fetchExternal?: boolean,
  prefilledObject?: WaifuScrabeDataObject
): Promise<IWaifu> => {
  const revealedTokenIndex =
    (Number(waifuId) + Config[bsc ? "BSC" : "ETH"].STARTING_INDEX) % 16384;

  const waifuContract = bsc ? app.bscWaifusContract : app.waifusContract;
  const name = fetchExternal
    ? await waifuContract.methods.tokenNameByIndex(waifuId).call({})
    : "";

  const owner = fetchExternal && !bsc ? await getOwnerObjectForTokenId(waifuId) : null;

  const { attributes } = prefilledObject || (bsc ? 
    app.getBSCWaifuByRevealedIndex(Number(waifuId)) : app.getWaifuByRevealedIndex(Number(waifuId))
  );

  const formattedAttributes: any[] = attributes.filter((atr: IWaifuAttribute) => atr.value);
  
  let status = "freed" 
  if (fetchExternal && owner.address === "0x0000000000000000000000000000000000080085") {
    status = "burned"
  } else if (fetchExternal && owner.address.toLowerCase() === "0xb291984262259bcfe6aa02b66a06e9769c5c1ef3") {
    status = "dungeon"
  }
  if (fetchExternal) {
    formattedAttributes.push({
      trait_type: "Status",
      value: status,
    })
  }

  const imageUrl = `${Config[bsc ? "BSC" : "ETH"].HAREM_CDN_PREFIX}/${waifuId}.png`;
  const detailUrl = !bsc ? `https://waifusion.io/waifu/${waifuId}` : `https://waifusionbsc.sexy/app/detail/${waifuId}`;

  return {
    id: waifuId,
    name,
    owner,
    image: imageUrl,
    external_url: detailUrl,
    attributes: formattedAttributes,
  };
};

export const getOwnerObjectForTokenId = async (
  tokenId: string,
): Promise<IWaifuOwner> => {
  const {
    data: {
      assets: [{ owner }],
    },
  } = await getAsset(tokenId);

  return {
    address: owner.address,
    name: owner.user?.username || null,
    icon: null,
  };
};

export const formatAttributesFromScrape = (
  legacyAttributes: WaifuScrabeDataAttributes
) => {
  return Object.entries(legacyAttributes).map(([trait_type, value]) => {
    return {
      trait_type,
      value,
    };
  });
};
