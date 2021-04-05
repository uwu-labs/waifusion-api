import Config from '../config.json';

const API_BASE = "https://api.opensea.io/api/v1/";

export interface OpenSeaAPIResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export const makeRequest = async (
  endpoint: string,
  {
    method = "GET",
    body: outboundBody,
    media,
  }: {
    method?: string;
    body?: any;
    media?: boolean;
  }
): Promise<OpenSeaAPIResponse> => {
  try {
    const headers: { [key: string]: string } = {
      accept: "application/json",
    };

    if (outboundBody)
      headers["Content-Type"] = media
        ? "multipart/form-data"
        : "application/json";

    const response: any = await fetch(API_BASE + endpoint, {
      method,
      headers,
      body: media
        ? outboundBody
        : outboundBody && method !== "GET" && method !== "HEAD"
        ? JSON.stringify(outboundBody)
        : null,
    }).then(async (res) =>
      res.json()
    );

   return {success: true, data: response};
  } catch (error) {
    console.error(error);

    return { success: false, error };
  }
};

export const getAsset = async (tokenId: string) => {
  return await makeRequest(`assets?asset_contract_address=${Config.WAIFUS_CONTRACT_ADDRESS}&limit=50&token_ids=${tokenId}`, {
    method: "GET",
  });
}