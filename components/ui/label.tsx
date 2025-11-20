export const Label = ({ children, className = '', ...rest }: any) => (
  <label className={`text-sm font-medium ${className}`} {...rest}>
    {children}
  </label>
);

export default Label;
