import { useNavigate } from 'react-router';
import { Button } from '../shared/Button/Button';
import { Container } from '../shared/Container';

export const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>About</h2>
      <Container>
        <h3>What is Have-It?</h3>
        <p>
          Have-It is an online inventory management system. It allows you to:
        </p>
        <ul>
          <li>
            Create an inventory of things you want to track, such as:
            <ul>
              <li>Price</li>
              <li>SKUs</li>
              <li>Stock Levels</li>
            </ul>
          </li>
          <li>Make assemblies using parts you've created.</li>
          <li>Keeps your data yours, forever.</li>
        </ul>
        <h3>Why Have-It?</h3>
        <p>
          Since Have-It is an online inventory management system, it provides
          you instant access to your data, anywhere you have a connection.
        </p>
        <h3>Interested?</h3>
        <p>Well, what are you waiting for?</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            text={'Start Using Have-It'}
            buttonType={'primary'}
            action={() => navigate('/signup')}
          />
        </div>
      </Container>
    </>
  );
};
