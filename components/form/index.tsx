export interface BaseUploadProps {
  onChange?: (name: string, filePath: string) => void;
  accept?: string;
  isLoading?: boolean;
  loadingSize?: 'mini' | 'regular' | 'large';
}

import {FC, forwardRef, memo, useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {splitFormProps, useField} from 'react-form';

import {Loading} from '../loading';
import {UploadComp} from './styles';

import {uploadFile} from '@/services/file';
import {Checkbox, IconInput, Radio, RadioGroup, TextArea} from '@/uikit';
import {showTip, IMessageType} from '@/utils';

export const UploadPonents: FC<BaseUploadProps> = memo(
  ({children, onChange, accept, isLoading, loadingSize, ...props}) => {
    const [loading, setLoading] = useState<boolean>(false);

    const onDrop = useCallback(async (acceptedFiles) => {
      if (!acceptedFiles.length) {
        showTip({
          type: IMessageType.ERROR,
          content: 'File types supported: JPG, PNG, GIF, SVG. Max size: 20 MB',
        });
        return;
      }
      if (acceptedFiles && acceptedFiles.length) {
        const file = acceptedFiles[0];
        if (file.size > 20 * 1024 * 1024) {
          showTip({
            type: IMessageType.ERROR,
            content: 'The file is too large!',
          });
          return;
        }
        setLoading(true);
        // 上传接口
        const formDate = new FormData();
        // originFileObj
        formDate.append('file', file);
        uploadFile(formDate).then((res: any) => {
          onChange && onChange(file.name, res?.data || '');
          setLoading(false);
        });
      }
    }, []);
    const {getRootProps, getInputProps} = useDropzone({
      accept,
      onDrop,
    });
    return (
      <UploadComp
        {...getRootProps({className: 'dropzone'})}
        {...(props as any)}
      >
        {children}
        <input {...getInputProps()} />
        {loading && isLoading ? (
          <div
            className='loading'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <Loading size={loadingSize} />
            </div>
          </div>
        ) : null}
      </UploadComp>
    );
  }
);

UploadPonents.displayName = 'UploadPonents';

UploadPonents.defaultProps = {
  onChange: () => {},
  accept: '',
  isLoading: true,
  loadingSize: 'mini',
};

export const InputField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    getInputProps,
  } = useField(field, fieldOptions);
  const inputProps: any = getInputProps({ref, ...rest});
  inputProps.value = inputProps.value || '';
  return (
    <>
      <IconInput
        placeholder={props.placeholder}
        {...inputProps}
        type={props.type}
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
InputField.displayName = 'InputField';

export const TextareaField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, rest] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    getInputProps,
  } = useField(field, fieldOptions);
  const inputProps: any = getInputProps({ref, ...rest});
  inputProps.value = inputProps.value || '';
  return (
    <>
      <TextArea {...inputProps} paddingBottom='8px' paddingTop='8px' rows={5} />
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
TextareaField.displayName = 'TextareaField';

export const CheckBoxField = forwardRef((props: any, ref: any) => {
  const [field, fieldOptions, {...rest}] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    setValue,
  } = useField(field, fieldOptions);
  return (
    <>
      <Checkbox
        {...rest}
        onChange={(e: any) => {
          setValue(e.target.checked);
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
CheckBoxField.displayName = 'CheckBoxField';

export const RadioGroupField = forwardRef((props: any, ref: any) => {
  const [isOriginal, setIsOriginal] = useState<string>(props.isOriginal);
  const [field, fieldOptions] = splitFormProps(props);
  const {
    meta: {error, isTouched, isValidating},
    setValue,
  } = useField(field, fieldOptions);
  return (
    <>
      <RadioGroup
        value={isOriginal}
        onChange={(value: any) => {
          setValue(value);
          setIsOriginal(value);
        }}
      >
        <Radio mr={32} name='payment' value='Pay upfront' onChange={() => {}}>
          Pay upfront
        </Radio>
        <Radio name='payment' value='Split revenue' onChange={() => {}}>
          Split revenue
        </Radio>
      </RadioGroup>
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
RadioGroupField.displayName = 'RadioGroupField';
