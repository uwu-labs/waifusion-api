export interface IWaifu {
  id: string;
  name?: string;
  image: string;
  external_url: string;
  attributes: IWaifuAttribute[];
  owner?: IWaifuOwner;
}

export interface IWaifuAttribute {
  trait_type: string;
  value: string;
}

export interface IWaifuOwner {
  address: string;
  name?: string;
  icon?: string;
}