export interface IWaifu {
  id: string;
  name?: string;
  image: string;
  external_url: string;
  attributes: IWaifuAttribute[];
}

export interface IWaifuAttribute {
  trait_type: string;
  value: string;
}