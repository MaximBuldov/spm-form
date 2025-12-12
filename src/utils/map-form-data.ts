import { IWork, IWorkState } from '../models/form.model';

const normalizePhone = (value: string) => value.replace(/\D/g, '');

export function mapFormData(
  data: IWork,
  result: number,
  truckFee: number,
  worker?: number | string | null
): IWork {
  if (data.acf?.customer_info) {
    data.acf.customer_info = {
      ...data.acf.customer_info,
      result: String(result),
      truck_fee: String(truckFee),
      customer_phone: normalizePhone(data.acf.customer_info.customer_phone),
      contact_phone: normalizePhone(data.acf.customer_info.contact_phone),
      wrapping_paper: +data.acf.customer_info.wrapping_paper,
      small_boxes: +data.acf.customer_info.small_boxes,
      medium_boxes: +data.acf.customer_info.medium_boxes
    };
    data.acf.state = IWorkState.CONFIRMED;
    data.acf.watched = true;
    data.acf.revision_author = '1';
  }
  if (worker) {
    data.author = Number(worker);
  }
  data.status = 'publish';
  return data;
}
