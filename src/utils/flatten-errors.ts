import { FieldErrors } from 'react-hook-form';

export const flattenErrors = (errors: FieldErrors, prefix = ''): string[] => {
  return Object.keys(errors).flatMap((key) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = errors[key];

    if (value && typeof value === 'object' && !value.message && !value.type) {
      return flattenErrors(value as FieldErrors, fullKey);
    }

    return [fullKey];
  });
};
