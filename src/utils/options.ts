import { IOptions } from '../models/config.module';

export const OPTIONS: IOptions = {
  bedroom: [
    { value: 'Studio', label: 'Studio' },
    { value: '1 bedroom', label: '1 bedroom' },
    { value: '2 bedroom', label: '2 bedroom' },
    { value: '3 bedroom', label: '3 bedroom' },
    { value: '4 bedroom', label: '4 bedroom' },
    { value: '5 bedroom', label: '5 bedroom' },
    { value: '6 bedroom', label: '6 bedroom' }
  ],

  truck: [
    { value: 'No truck just a labor', label: 'No truck just a labor' },
    { value: '16 feet', label: '16 feet' },
    { value: '20 feet', label: '20 feet' },
    { value: '26 feet', label: '26 feet' }
  ],

  movers: [
    { value: '2 movers', label: '2 movers' },
    { value: '3 movers', label: '3 movers' },
    { value: '4 movers', label: '4 movers' },
    { value: '5 movers', label: '5 movers' },
    { value: '6 movers', label: '6 movers' }
  ],

  time: [
    { value: '07:00', label: '7 am' },
    { value: '08:00', label: '8 am' },
    { value: '09:00', label: '9 am' },
    { value: '10:00', label: '10 am' },
    { value: '11:00', label: '11 am' },
    { value: '12:00', label: '12 pm' },
    { value: '13:00', label: '13 pm' },
    { value: '14:00', label: '14 pm' },
    { value: '15:00', label: '15 pm' },
    { value: '16:00', label: '16 pm' },
    { value: '17:00', label: '17 pm' },
    { value: '18:00', label: '18 pm' },
    { value: '19:00', label: '19 pm' }
  ],

  payment: [
    { value: 'cash', label: 'Cash' },
    { value: 'Credit card', label: 'Credit card' },
    { value: 'Venmo', label: 'Venmo' },
    { value: 'Zelle', label: 'Zelle' }
  ],

  residency: [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'House', label: 'House' },
    { value: 'Townhouse', label: 'Townhouse' },
    { value: 'Storage', label: 'Storage' },
    { value: 'Office', label: 'Office' },
    { value: 'Other', label: 'Other' }
  ],

  packing: [
    { value: 'No Packing', label: 'No Packing' },
    {
      value: 'Partial Packing',
      label: 'Partial packing (included into the rate)'
    },
    { value: 'Full Packing', label: 'Full packing (included)' }
  ],

  supplies: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ],

  findUs: [
    { value: 'Yelp', label: 'Yelp' },
    { value: 'Google', label: 'Google' },
    { value: 'Referral', label: 'Referral' },
    { value: 'Moved', label: 'Moved' },
    { value: 'Thumbtack', label: 'Thumbtack' },
    { value: 'Other', label: 'Other' }
  ],

  heavyItems: [
    { value: 'Piano', label: 'Piano' },
    { value: 'Safe', label: 'Safe' },
    { value: 'Other', label: 'Other' },
    { value: 'No', label: 'No' }
  ]
};
