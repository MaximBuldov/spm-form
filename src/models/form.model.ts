export interface Option {
  value: string;
  label: string;
  isDisabled?: boolean;
}

export interface BoolOption {
  value: boolean;
  label: string;
}

export interface Address {
  unit?: string;
  zip: string;
  street: string;
}

export interface FormValues {
  bedroom: Option | null;
  truck: Option | null;
  movers: Option | null;
  date: string;
  time: Option | null;
  payment: Option | null;
  type_of_residency: Option | null;
  packing: Option | null;
  supplies?: Option | null;
  how_from: Option | null;
  heavy_items: Option | null;
  pickup_address: Address[];
  dropoff_address: Address[];
  customer: Customer;
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  small_boxes?: number;
  medium_boxes?: number;
  wrapping_paper?: number;
  note?: string;
}

export interface FormPayload {
  customer_info: CustomerInfo;
  date?: string;
  customer: Customer;
  state: string;
  author?: string;
}

export type AddressTypes = 'pickup_address' | 'dropoff_address';

interface Customer {
  name: string;
  phone: string;
  email: string;
}

interface CustomerInfo {
  bedroom?: string;
  truck?: string;
  movers?: string;
  time?: string;
  payment?: string;
  type_of_residency?: string;
  packing?: string;
  supplies?: string;
  how_from?: string;
  heavy_items?: string;
  pickup_address?: Address[];
  dropoff_address?: Address[];
  contact_name?: string;
  contact_phone?: string;
  contact_email?: string;
  small_boxes?: number;
  medium_boxes?: number;
  wrapping_paper?: number;
  note?: string;
  result: string;
  truck_fee: string;
}
