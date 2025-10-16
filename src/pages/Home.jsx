import { useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';
import { ButtonContainer } from '../shared/ButtonContainer';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Home</h2>
      <p>This is the home page</p>
      <ButtonContainer>
        <Button
          text={'Login'}
          action={() => navigate('/login')}
          buttonType={'secondary'}
        />
        <Button
          text={'Sign Up'}
          action={() => navigate('/signup')}
          buttonType={'primary'}
        />
      </ButtonContainer>
    </>
  );
};
