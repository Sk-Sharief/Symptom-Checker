import React from 'react';

export const Button = ({ children, className = '', ...rest }: any) => {
  return (
    <button className={`inline-flex items-center justify-center rounded-md px-3 py-1 ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
