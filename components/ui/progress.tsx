export const Progress = ({ value = 0, className = '', ...rest }: any) => (
  <progress value={value} max={100} className={className} {...rest} />
);

export default Progress;
