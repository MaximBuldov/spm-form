import { Option } from '../models/form.model';

export function setDisableOption(array: Option[], values: string[]) {
  return array.map((el) => {
    if (values.includes(el.value)) {
      return { ...el, isDisabled: true };
    } else {
      return el;
    }
  });
}
