export const Alert = ({ children, className = '', ...rest }: any) => (
  <div className={`rounded-md p-3 border ${className}`} {...rest}>
    {children}
  </div>
);

export const AlertDescription = ({ children, className = '', ...rest }: any) => (
  <div className={`text-sm ${className}`} {...rest}>
    {children}
  </div>
);

export default Alert;
