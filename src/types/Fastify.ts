import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export interface IWaifusionInstance extends FastifyInstance {
  web3?: Web3;
  waifusContract?: Contract;
  getWaifuByRevealedIndex?: (index: number) => any;
}

export interface IWaifusionRequest extends FastifyRequest {
  params: any;
  fastify: IWaifusionInstance;
}

export interface IWaifusionReply extends FastifyReply {

}