import { IWork } from '../models/form.model';

export function mapFormData(
  data: IWork,
  result: number,
  truckFee: number,
  worker?: string | null
): IWork {
  if (data.acf?.customer_info) {
    data.acf.customer_info.result = String(result);
    data.acf.customer_info.truck_fee = String(truckFee);
  }
  if (worker) {
    data.author = Number(worker);
  }
  return data;
}
