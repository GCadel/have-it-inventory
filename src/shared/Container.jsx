export const Container = ({
  children,
  bgColor = 'light',
  padding = 'default',
}) => {
  return <div className={`container ${bgColor} ${padding}`}>{children}</div>;
};
