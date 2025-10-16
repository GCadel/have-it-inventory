import { useNavigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';
import { Button } from '../shared/Button/Button';

export const Dashboard = () => {
  const { session, logout } = UserAuth();
  const navigate = useNavigate();

  async function handleLogoff(e) {
    e.preventDefault();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logoff error occurred:', error);
    }
  }
  return (
    <>
      <h2>
        Welcome, {session ? session.user.user_metadata.displayName : 'User'}
      </h2>
      <Button text={'Logoff'} action={handleLogoff} buttonType={'secondary'} />
    </>
  );
};
