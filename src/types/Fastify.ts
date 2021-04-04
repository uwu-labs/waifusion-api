import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { WaifuScrabeDataObject } from "ScrapeData";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export interface IWaifusionInstance extends FastifyInstance {
  web3?: Web3;
  waifusContract?: Contract;
  getWaifuByRevealedIndex?: (index: number) => any;
  waifusData?: WaifuScrabeDataObject[];
}

export interface IWaifusionRequest extends FastifyRequest {
  params: any;
  fastify: IWaifusionInstance;
}

export interface IWaifusionReply extends FastifyReply {
  success: (data?: any) => void;
  error: (statusCode: number, error: Error) => void;
}

export interface Error {
  code: string,
  message: string
}
