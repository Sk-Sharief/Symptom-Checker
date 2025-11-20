export const Checkbox = ({ className = '', checked, onCheckedChange, id, ...rest }: any) => (
  <input id={id} type="checkbox" checked={checked} onChange={(e) => onCheckedChange?.(e.target.checked)} className={className} {...rest} />
);

export default Checkbox;
