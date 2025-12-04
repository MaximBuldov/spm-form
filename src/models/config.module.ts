import { IWork, Option } from './form.model';

export interface IConfig {
  key: string;
  name: string;
  value: string;
}

export interface IPricesMapped {
  price: number;
  moverPrice: number;
  nonCashPrice: number;
  weekendPrice: number;
  smallBox: number;
  mediumBox: number;
  wrappingPaper: number;
  heavyItems: number;
  truckFee: number;
}

export interface IOptions {
  bedroom: Option[];
  heavyItems: Option[];
  findUs: Option[];
  supplies: Option[];
  packing: Option[];
  residency: Option[];
  payment: Option[];
  time: Option[];
  movers: Option[];
  truck: Option[];
}

export interface IConfigResponse {
  prices: IPricesMapped;
  work: IWork | null | undefined;
}
