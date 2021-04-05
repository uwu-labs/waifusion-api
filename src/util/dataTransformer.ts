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
  fetchExternal?: boolean,
  prefilledObject?: WaifuScrabeDataObject
): Promise<IWaifu> => {
  const revealedTokenIndex = (Number(waifuId) + Config.STARTING_INDEX) % 16384;

  const name = fetchExternal
    ? await app.waifusContract.methods.tokenNameByIndex(waifuId).call({})
    : "";

  const owner = fetchExternal ? await getOwnerObjectForTokenId(waifuId) : null;

  const { attributes } =
    prefilledObject || app.getWaifuByRevealedIndex(revealedTokenIndex);

  const formattedAttributes: any[] = formatAttributesFromScrape(attributes);

  const imageUrl = `${Config.HAREM_CDN_PREFIX}/ETH_WAIFU/${waifuId}.png`;
  const detailUrl = `https://waifusion.io/waifu/${waifuId}`;

  return {
    id: waifuId,
    name,
    owner,
    image: imageUrl,
    external_url: detailUrl,
    attributes: formattedAttributes,
  };
};

export const getOwnerObjectForTokenId = async (tokenId: string): Promise<IWaifuOwner> => {
  const {
    data: {assets: [{owner}]},
  } = await getAsset(tokenId);

  return {
    address: owner.address,
    name: owner.user.username,
    icon: null
  }
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
