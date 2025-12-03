import { Option } from '../models/form.model';
import { setDisableOption } from './set-disable-options';

export function disableTime(timeOptions: Option[], isWeekend?: boolean) {
  const options: string[] = isWeekend ? ['11', '12'] : [];

  return setDisableOption(timeOptions, options);
}
