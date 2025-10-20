import { Navbar } from '../features/Navbar/Navbar';

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
