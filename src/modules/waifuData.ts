import { IWaifusionInstance } from "../types/Fastify";
import { FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import fs from "fs";
import path from "path";
import WaifuData from '../data/waifu_attribute_scrape_2.json';

const waifusDataFile = fs.readFileSync(path.join(__dirname, "/../data/waifu_attribute_scrape_2.json"));
const waifusData = JSON.parse(waifusDataFile.toString());

const getWaifuByRevealedIndex = (index: number) => {
  return waifusData.filter((w: any) => w.index === index)[0];
}

export default fp((fastify: IWaifusionInstance, _opts: FastifyPluginOptions, next: any) => {
  fastify.decorate("waifusData", waifusData);
  fastify.decorate("getWaifuByRevealedIndex", getWaifuByRevealedIndex);

  next();
});