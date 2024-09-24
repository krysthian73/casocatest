import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  divClassName?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, register, error, divClassName, ...props }) => {
  return (
    <div className={divClassName}>
      <label htmlFor={props.id} className="block text-gray-700 dark:text-gray-300 text-sm mb-2">
        {label}
      </label>
      <input
        {...register}
        {...props}
        className={`w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${error ? 'border-red-500' : ''} ${props.className}`}
      />
      {error && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};

export default CustomInput;
