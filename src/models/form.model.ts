export interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface IWork {
  id?: number;
  slug?: string;
  author?: number;
  date?: string;
  acf?: {
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

export type AddressTypes = 'pickup_address' | 'dropoff_address';
