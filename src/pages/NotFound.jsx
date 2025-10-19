import { useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';
import { UserAuth } from '../context/AuthContext';

export const NotFound = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  return (
    <>
      <main>
        <h2>404</h2>
        <p>Did you follow the yellow-brick road, Dorothy?</p>
        <Button
          buttonType={'primary'}
          action={() => (session ? navigate('/dashboard') : navigate('/'))}
          text={'Go Home'}
        />
      </main>
    </>
  );
};
