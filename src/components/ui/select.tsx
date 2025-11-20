export const Select = ({ children, className = '', ...rest }: any) => (
  <div className={`inline-block relative ${className}`} {...rest}>
    {children}
  </div>
);

export const SelectTrigger = ({ children, className = '', ...rest }: any) => (
  <button className={`border px-2 py-1 rounded ${className}`} {...rest}>
    {children}
  </button>
);

export const SelectValue = ({ children, className = '', ...rest }: any) => (
  <span className={`ml-2 ${className}`} {...rest}>
    {children}
  </span>
);

export const SelectContent = ({ children, className = '', ...rest }: any) => (
  <div className={`absolute left-0 mt-1 bg-white shadow rounded ${className}`} {...rest}>
    {children}
  </div>
);

export const SelectItem = ({ children, className = '', ...rest }: any) => (
  <div className={`px-3 py-2 hover:bg-gray-100 ${className}`} {...rest}>
    {children}
  </div>
);

export default Select;
