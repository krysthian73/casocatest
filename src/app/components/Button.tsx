import React, { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, className, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full bg-primary text-white p-2 rounded hover:bg-secondary transition-colors ${className}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
