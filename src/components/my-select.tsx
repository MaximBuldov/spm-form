import { Control, Controller, FieldPath } from 'react-hook-form';
import Select from 'react-select';
import { IWork, Option } from '../models/form.model';
import { ErrorMessage } from './error-message';

interface MySelectProps {
  options: Option[];
  placeholder: string;
  name: FieldPath<IWork>;
  isError: boolean;
  control?: Control<IWork>;
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
