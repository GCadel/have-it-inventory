export const ButtonContainer = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </div>
  );
};
