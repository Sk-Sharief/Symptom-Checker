export const Textarea = ({ className = '', ...rest }: any) => (
  <textarea className={`border px-2 py-1 rounded ${className}`} {...rest} />
);

export default Textarea;
