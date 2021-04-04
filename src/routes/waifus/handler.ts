import { IWaifusionRequest, IWaifusionReply } from "../../types/Fastify";
import { createWaifuObjectFromScrapeDataObject } from "../../util/dataTransformer";
import Config from "../../config.json";

export const getWaifuByTokenId = async (
  req: IWaifusionRequest,
  reply: IWaifusionReply
) => {
  const waifu = await createWaifuObjectFromScrapeDataObject(
    req.params.waifuId,
    true
  );

  reply.success(waifu);
};

export const filterWaifus = async (
  req: IWaifusionRequest,
  reply: IWaifusionReply
) => {
  const { limit, page, ...filterParams }: any = req.query;

  if (!limit || isNaN(limit) || limit > 50) {
    return reply.error(400, {
      code: "invalid_query",
      message: "limit query-parameter must be present and less than 50",
    });
  }

  const maxPageNumber = Math.floor(req.fastify.waifusData.length / limit);

  if (!page || isNaN(page) || page > maxPageNumber || page < 1) {
    return reply.error(400, {
      code: "invalid_query",
      message: `page query-parameter must be present and less than ${maxPageNumber}, but more than 0`,
    });
  }

  const filteredFullList = req.fastify.waifusData.filter((waifu) => {
    return (
      Object.keys(waifu.attributes).some((k) =>
        Object.keys(filterParams).includes(k)
      ) &&
      Object.entries(waifu.attributes).every(([k, v]) =>
        filterParams[k] ? filterParams[k] === v : true
      )
    );
  });

  const concentratedList = await Promise.all(
    filteredFullList
      .slice(
        (parseInt(page) - 1) * parseInt(limit),
        parseInt(page) * parseInt(limit)
      )
      .map(async (legacyWaifu) => {
        const index = Number(legacyWaifu.index) - Config.STARTING_INDEX;
        const nudged = index < 0 ? index + 16384 : index;

        return createWaifuObjectFromScrapeDataObject(
          nudged.toString(),
          false,
          legacyWaifu
        );
      })
  );

  reply.success({
    page: parseInt(page),
    maxPage: Math.floor(filteredFullList.length / parseInt(limit)) + 1,
    maxResults: filteredFullList.length,
    limit: parseInt(limit),
    results: concentratedList,
  });
};
