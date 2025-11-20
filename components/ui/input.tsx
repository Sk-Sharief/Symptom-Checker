export const Input = ({ className = '', ...rest }: any) => (
  <input className={`border px-2 py-1 rounded ${className}`} {...rest} />
);

export default Input;
