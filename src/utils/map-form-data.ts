import { IWork, IWorkState } from '../models/form.model';

const normalizePhone = (value: string) => value.replace(/\D/g, '');

export function mapFormData(
  data: IWork,
  result: number,
  truckFee: number,
  worker?: number | string | null
): IWork {
  if (data.acf?.customer_info) {
    data.acf.customer_info.result = String(result);
    data.acf.customer_info.truck_fee = String(truckFee);
    data.acf.customer_info.customer_phone = normalizePhone(
      data.acf.customer_info.customer_phone
    );
    data.acf.customer_info.contact_phone = normalizePhone(
      data.acf.customer_info.contact_phone
    );
    data.acf.state = IWorkState.CONFIRMED;
  }
  if (worker) {
    data.author = Number(worker);
  }
  data.status = 'publish';
  return data;
}
