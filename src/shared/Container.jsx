export const Container = ({ children, bgColor = 'light' }) => {
  return <div className={`container ${bgColor}`}>{children}</div>;
};
