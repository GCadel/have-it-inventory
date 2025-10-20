import { useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';
import { ButtonContainer } from '../shared/ButtonContainer';
import { CenteredText } from '../shared/CenteredText';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <CenteredText>
        <h2>Have-It</h2>
        <p>Manage your inventory anywhere</p>
      </CenteredText>
      <br />
      <ButtonContainer>
        <Button
          text={'Login'}
          action={() => navigate('/login')}
          buttonType={'secondary'}
        />
        <Button
          text={'Get Started'}
          action={() => navigate('/signup')}
          buttonType={'primary'}
        />
      </ButtonContainer>
    </>
  );
};
