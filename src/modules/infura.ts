import { IWaifusionInstance } from "../types/Fastify";
import { FastifyPluginOptions } from "fastify";
import fp from "fastify-plugin";
import Web3 from "web3";
import fs from "fs";
import Config from "../config.json";

const waifusContractJson = fs.readFileSync(
  __dirname + "/../../data/abi/Waifus.json"
);
const waifusContractAbi = JSON.parse(waifusContractJson.toString());

export default fp(
  (fastify: IWaifusionInstance, _opts: FastifyPluginOptions, next: any) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(Config.ETH.INFURA_URL)
    );
    const waifusContract = new web3.eth.Contract(
      waifusContractAbi,
      Config.ETH.WAIFUS_CONTRACT_ADDRESS
    );

    fastify.decorate("web3", web3);
    fastify.decorate("waifusContract", waifusContract);

    next();
  }
);
