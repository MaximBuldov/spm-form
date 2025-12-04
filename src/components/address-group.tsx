import {
  Control,
  FieldArrayPath,
  FieldErrors,
  get,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue
} from 'react-hook-form';
import { IWork } from '../models/form.model';
import { ErrorMessage } from './error-message';
import { GoogleAutocomplete } from './google-address';

interface AddressGroupProps {
  name: FieldArrayPath<IWork>;
  control?: Control<IWork>;
  title: string;
  register: UseFormRegister<IWork>;
  errors: FieldErrors<IWork>;
  isDisabled: boolean;
  setValue: UseFormSetValue<IWork>;
}

export const AddressGroup = ({
  control,
  name,
  title,
  register,
  errors,
  isDisabled,
  setValue
}: AddressGroupProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });
  const setZip = (index: number, zip?: string) =>
    zip && setValue(`${name}.${index}.zip`, zip);
  return (
    <div className="row">
      <div className="row">
        <div className="col-md-auto">
          <h5>{title}</h5>
        </div>
        <div className="col-md-auto">
          <button
            type="button"
            disabled={isDisabled}
            className="btn btn-success btn-sm"
            onClick={() => append({ full_address: '', zip: '', unit: '' })}
          >
            {`+ Add ${title}`}
          </button>
        </div>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="row">
          <div className="col-md-6">
            <GoogleAutocomplete
              isDisabled={isDisabled}
              register={register}
              name={`${name}.${index}.full_address`}
              setZip={(zip?: string) => setZip(index, zip)}
            />
            {get(errors, `${name}.${index}.full_address`) && <ErrorMessage />}
          </div>
          <div className="col-md-2">
            <input
              disabled={isDisabled}
              type="text"
              className="form-control"
              placeholder="Unit"
              {...register(`${name}.${index}.unit`)}
            />
          </div>
          <div className="col-md-3">
            <input
              disabled={isDisabled}
              type="text"
              className="form-control"
              placeholder="Zip Code"
              {...register(`${name}.${index}.zip`, {
                required: true
              })}
            />
            {get(errors, `${name}.${index}.zip`) && <ErrorMessage />}
          </div>
          {index !== 0 && (
            <div className="col-md-1">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)}
              >
                x
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
