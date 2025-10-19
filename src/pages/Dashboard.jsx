import { Link, useNavigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';
import PartTable from '../features/PartTable/PartTable';

export const Dashboard = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>
        Welcome, {session ? session.user.user_metadata.displayName : 'User'}
      </h2>
      <PartTable />
    </>
  );
};
