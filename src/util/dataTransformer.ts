import { WaifuScrabeDataObject } from "../types/ScrapeData";
import { IWaifu, IWaifuAttribute } from "../types/Waifusion";
import Config from "../config.json";
import { app } from "..";

export const createWaifuObjectFromScrapeDataObject = async (waifuId: string, fetchName?: boolean): IWaifu => {
  const revealedTokenIndex = (Number(waifuId) + Config.STARTING_INDEX) % 16384;

  let name = "";
  if(fetchName) {
    name = await app.waifusContract.methods
    .tokenNameByIndex(waifuId)
    .call({});
  }

  const { attributes } = app.getWaifuByRevealedIndex(
    revealedTokenIndex
  );

  const formattedAttributes: any[] = Object.entries(attributes).map(([trait_type, value]) => {
    return {
      trait_type,
      value
    }
  });

  const imageUrl = `${Config.HAREM_CDN_PREFIX}/ETH_WAIFU/${revealedTokenIndex}.png`;
  const detailUrl = `https://waifusion.io/waifu/${revealedTokenIndex}`;

  return {
    id: waifuId,
    name,
    image: imageUrl,
    external_url: detailUrl,
    attributes: formattedAttributes
  }
}