import { Link, useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <h2>404</h2>
        <p>Did you follow the yellow-brick road, Dorothy?</p>
        <Button
          buttonType={'primary'}
          action={() => navigate('/')}
          text={'Go Home'}
        />
      </main>
    </>
  );
};
