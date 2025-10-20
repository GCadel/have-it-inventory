import { UserAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router';
import Loader from '../shared/Loader/Loader';

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (!session) {
    <Loader />;
  }

  return <>{session ? <Outlet /> : <Navigate to={'/signup'} />}</>;
};

export default PrivateRoute;
