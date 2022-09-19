import {forwardRef} from 'react';
import {splitFormProps, useField} from 'react-form';

import {MultiSelect} from '@/uikit';

const MultiSelectField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, {options, onChange, ...rest}] =
    splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    setValue,
  } = useField(field, fieldOptions);
  return (
    <>
      <MultiSelect
        {...rest}
        options={options}
        onChange={(value: any) => {
          onChange(value);
          setValue(value);
        }}
      />
      <div>
        {isValidating ? (
          <p className='validating'>Validating...</p>
        ) : isTouched && error ? (
          <p className='error'>{error}</p>
        ) : null}
      </div>
    </>
  );
});
MultiSelectField.displayName = 'MultiSelectField';

export default MultiSelectField;
