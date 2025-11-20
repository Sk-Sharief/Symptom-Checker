export const Card = ({ children, className = '', ...rest }: any) => (
  <div className={`rounded-lg shadow-sm bg-white ${className}`} {...rest}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = '', ...rest }: any) => (
  <div className={`px-4 py-2 border-b ${className}`} {...rest}>
    {children}
  </div>
);

export const CardContent = ({ children, className = '', ...rest }: any) => (
  <div className={`p-4 ${className}`} {...rest}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...rest }: any) => (
  <h3 className={`text-lg font-semibold ${className}`} {...rest}>
    {children}
  </h3>
);

export default Card;
