import { useNavigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';
import { ButtonContainer } from '../shared/ButtonContainer';
import { Button } from '../shared/Button/Button';

export const Dashboard = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();

  return (
    <>
      <h2>
        Welcome, {session ? session.user.user_metadata.displayName : 'User'}
      </h2>
      <p style={{ textAlign: 'center' }}>Let's get started</p>
      <br />
      <ButtonContainer>
        <Button
          text={'Create New Assemblies'}
          buttonType={'secondary'}
          action={() => navigate('/assemblies')}
        />
        <Button
          text={'Manage Your Inventory'}
          buttonType={'primary'}
          action={() => navigate('/parts')}
        />
      </ButtonContainer>
    </>
  );
};
