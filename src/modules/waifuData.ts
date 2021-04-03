import { IWaifusionInstance } from "../types/Fastify";
import { FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import fs from "fs";
import path from "path";
import WaifuData from '../data/waifu_attribute_scrape_2.json';
import WaifuProvenanceData from '../data/eth_provenance.json';

const waifusDataFile = fs.readFileSync(path.join(__dirname, "/../data/waifu_attribute_scrape_2.json"));
const waifusData = JSON.parse(waifusDataFile.toString());

const waifusProvenanceDataFile = fs.readFileSync(path.join(__dirname, "/../data/eth_provenance.json"));
const waifusProvenanceData = JSON.parse(waifusProvenanceDataFile.toString());

const getWaifuByRevealedIndex = (index: number) => {
  return waifusData.filter((w: any) => w.index === index)[0];
}

const paginateProvenance = (limit: number, page: number) => {
  return waifusProvenanceData.slice((page - 1) * limit, page * limit);
}

export default fp((fastify: IWaifusionInstance, _opts: FastifyPluginOptions, next: any) => {
  fastify.decorate("waifusData", waifusData);
  fastify.decorate("getWaifuByRevealedIndex", getWaifuByRevealedIndex);
  
  fastify.decorate("paginateProvenance", paginateProvenance);

  next();
});