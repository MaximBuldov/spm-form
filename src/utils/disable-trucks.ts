import { Option } from '../models/form.model';
import { setDisableOption } from './set-disable-options';

export function disableTrucks(truckOptions: Option[], bedroom?: string | null) {
  let options: string[] = [];

  switch (bedroom) {
    case 'Studio':
    case '1 bedroom':
      options = ['20 feet', '26 feet'];
      break;
    case '2 bedroom':
      options = ['16 feet'];
      break;
    case '3 bedroom':
      options = ['16 feet', '20 feet'];
      break;
    case '4 bedroom':
    case '5 bedroom':
    case '6 bedroom':
      options = ['16 feet', '20 feet'];
      break;
  }

  return setDisableOption(truckOptions, options);
}
