import { Option } from './form.model';

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

export interface IWork {
  id: number;
  slug: string;
  author: number;
  date: string;
  acf: {
    customer_info: ICustomerInfo;
    date: string;
    state: IWorkState;
  };
}

export interface ICustomerInfo {
  bedroom: string;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  dropoff_address: IAddress[];
  heavyItems: string;
  howfrom: string;
  medium_boxes: number;
  movers: string;
  note: string;
  packing: string;
  payment: string;
  pickup_address: IAddress[];
  result: string;
  small_boxes: number;
  supplies: string;
  time: string;
  truck: string;
  truck_fee: string;
  typeofresidency: string;
  wrapping_paper: number;
}

export enum IWorkState {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ASSIGN_WORKERS = 'assignWorkers',
  COMPLETED = 'completed'
}

export enum IWorkStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed'
}

export interface IAddress {
  full_address: string;
  unit: string;
  zip: string;
}
