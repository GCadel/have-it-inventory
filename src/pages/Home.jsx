import { useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';
import { ButtonContainer } from '../shared/ButtonContainer';
import { CenteredText } from '../shared/CenteredText';
import tableDemo from '../assets/demo-img-01.png';
import assemblyDemo from '../assets/demo-img-02.png';

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-between">
      <div className="demo-image-holder">
        <img src={tableDemo} alt="Table Demo" />
        <img src={assemblyDemo} alt="Assembly Demo" />
      </div>
      <div>
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
      </div>
    </div>
  );
};
