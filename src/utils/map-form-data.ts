import { FormPayload, FormValues } from '../models/form.model';

export function mapFormData(
  {
    bedroom,
    truck,
    movers,
    time,
    payment,
    type_of_residency,
    packing,
    supplies,
    how_from,
    heavy_items,
    customer,
    date,
    ...data
  }: FormValues,
  result: number,
  truck_fee: number,
  author?: string | null
): FormPayload {
  return {
    date,
    customer,
    state: 'confirmed',
    author: author || undefined,
    customer_info: {
      ...data,
      bedroom: bedroom?.value,
      truck: truck?.value,
      movers: movers?.value,
      time: time?.value,
      payment: payment?.value,
      type_of_residency: type_of_residency?.value,
      packing: packing?.value,
      supplies: supplies?.value,
      how_from: how_from?.value,
      heavy_items: heavy_items?.value,
      result: String(result),
      truck_fee: String(truck_fee)
    }
  };
}
