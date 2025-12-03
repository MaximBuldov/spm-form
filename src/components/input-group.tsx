import { UseFormRegister } from 'react-hook-form';
import { FormValues } from '../models/form.model';
import { ErrorMessage } from './error-message';

interface InputGroupProps {
  prepend: string;
  append: string;
  error: boolean;
  register: UseFormRegister<FormValues>;
  name: keyof FormValues;
}

export const InputGroup = ({
  prepend,
  append,
  error,
  register,
  name
}: InputGroupProps) => {
  return (
    <>
      <div className="input-group">
        <div className="input-group-prepend input-group-text">{prepend}</div>
        <input
          type="number"
          min={0}
          className="form-control"
          placeholder="0"
          {...register(name)}
        />
        <div className="input-group-append input-group-text">{append}</div>
      </div>
      {error && <ErrorMessage />}
    </>
  );
};
