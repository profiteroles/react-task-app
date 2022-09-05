
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { HTMLInputTypeAttribute } from 'react'
import { FieldErrors, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface InputFieldProps<T extends Record<string, any>> {
    name:Path<T> & keyof T
    placeholder?:string
    register:UseFormRegister<T>
    registerOptions?: RegisterOptions<T,Path<T>>
    errors?:FieldErrors<T>
    type?:HTMLInputTypeAttribute 
}

export function InputField<T extends Record<string, any>> ({
    name,
    placeholder,
    register,
    registerOptions,
    errors,
    type
}:InputFieldProps<T>) {

    const error = errors && errors[name]
  return (
        <FormControl 
        isInvalid={!!error}
        isRequired={!!registerOptions?.required}
        >
            <Input
            id={name}
            background='transparent'
            placeholder={placeholder}
            type={type || 'text'}
            isRequired={false}
            {...register(name, {...registerOptions, disabled:false})}
            />
            <FormErrorMessage>{error?.message?.toString()}</FormErrorMessage>
        </FormControl>
    )
}

export default InputField