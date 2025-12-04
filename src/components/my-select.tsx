import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import { FormValues, Option } from '../models/form.model';
import { ErrorMessage } from './error-message';

type Values = Pick<
  FormValues,
  | 'bedroom'
  | 'truck'
  | 'movers'
  | 'time'
  | 'payment'
  | 'type_of_residency'
  | 'packing'
  | 'supplies'
  | 'how_from'
  | 'heavy_items'
>;

interface MySelectProps {
  options: Option[];
  placeholder: string;
  name: keyof Values;
  isError: boolean;
  control?: Control<FormValues>;
  required?: boolean;
  isDisabled?: boolean;
}

export const MySelect = ({
  options,
  placeholder,
  name,
  isError,
  control,
  required = true,
  isDisabled
}: MySelectProps) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            isClearable
            isDisabled={isDisabled}
            options={options}
            value={options.find((opt) => opt.value === field.value) || null}
            onChange={(opt) => field.onChange(opt?.value ?? '')}
            placeholder={placeholder}
          />
        )}
      />
      {isError && <ErrorMessage />}
    </>
  );
};
