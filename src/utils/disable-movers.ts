import { Option } from '../models/form.model';
import { setDisableOption } from './set-disable-options';

export function disableMovers(
  moversOptions: Option[],
  bedroom?: string | null
) {
  let options: string[] = [];

  switch (bedroom) {
    case '3 bedroom':
    case '4 bedroom':
    case '5 bedroom':
    case '6 bedroom':
      options = ['2 movers'];
      break;
  }

  return setDisableOption(moversOptions, options);
}
