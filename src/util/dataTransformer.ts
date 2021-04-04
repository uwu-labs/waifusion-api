import { WaifuScrabeDataAttributes, WaifuScrabeDataObject } from "../types/ScrapeData";
import { IWaifu, IWaifuAttribute } from "../types/Waifusion";
import Config from "../config.json";
import { app } from "..";

export const createWaifuObjectFromScrapeDataObject = async (waifuId: string, fetchName?: boolean, prefilledObject?: WaifuScrabeDataObject): Promise<IWaifu> => {
  const revealedTokenIndex = (Number(waifuId) + Config.STARTING_INDEX) % 16384;

  const name = fetchName ? await app.waifusContract.methods
  .tokenNameByIndex(waifuId)
  .call({}) :  "";

  const { attributes } = prefilledObject || app.getWaifuByRevealedIndex(
    revealedTokenIndex
  );

  const formattedAttributes: any[] = formatAttributesFromScrape(attributes);

  const imageUrl = `${Config.HAREM_CDN_PREFIX}/ETH_WAIFU/${waifuId}.png`;
  const detailUrl = `https://waifusion.io/waifu/${waifuId}`;

  return {
    id: waifuId,
    name,
    image: imageUrl,
    external_url: detailUrl,
    attributes: formattedAttributes
  }
}

export const formatAttributesFromScrape = (legacyAttributes: WaifuScrabeDataAttributes) => {
  return Object.entries(legacyAttributes).map(([trait_type, value]) => {
    return {
      trait_type,
      value
    }
  });
}