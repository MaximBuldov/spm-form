import {
  Autocomplete,
  Libraries,
  useJsApiLoader
} from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import { FieldPath, UseFormRegister } from 'react-hook-form';
import { IWork } from '../models/form.model';

const libraries = ['places'] as Libraries;

interface GoogleAutocompleteProps {
  name: FieldPath<IWork>;
  setZip: (zip?: string) => void;
  isDisabled: boolean;
  register: UseFormRegister<IWork>;
}

export const GoogleAutocomplete = ({
  name,
  setZip,
  isDisabled,
  register
}: GoogleAutocompleteProps) => {
  const [map, setMap] = useState<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS || '',
    language: 'en',
    libraries,
    region: 'us',
    id: 'google-map'
  });
  const onLoad = useCallback((map: google.maps.places.Autocomplete) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    if (map) {
      const zip = map
        .getPlace()
        ?.address_components?.find((el) =>
          el.types.includes('postal_code')
        )?.long_name;

      setZip(zip);
    }
  };
  return isLoaded ? (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={() => onPlaceChanged()}
      onUnmount={onUnmount}
    >
      {renderInput()}
    </Autocomplete>
  ) : (
    renderInput()
  );

  function renderInput() {
    return (
      <input
        disabled={isDisabled}
        type="text"
        className="form-control"
        placeholder="Street"
        {...register(name, {
          required: true
        })}
      />
    );
  }
};
