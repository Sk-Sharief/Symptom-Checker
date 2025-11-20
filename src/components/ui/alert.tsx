import React from 'react';

export const Alert: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`rounded-md p-3 border ${className}`} {...(rest as any)}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '', ...rest }) => {
  return (
    <div className={`text-sm ${className}`} {...(rest as any)}>
      {children}
    </div>
  );
};

export default Alert;
