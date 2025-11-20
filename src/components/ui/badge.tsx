export const Badge = ({ children, className = '', ...rest }: any) => (
  <span className={`inline-block px-2 py-0.5 rounded-md text-xs ${className}`} {...rest}>
    {children}
  </span>
);

export default Badge;
