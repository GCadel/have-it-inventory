import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';
import FormField from '../shared/FormField';
import { ButtonContainer } from '../shared/ButtonContainer';
import { Button } from '../shared/Button/Button';
import ErrorBox from '../shared/ErrorBox';
import { CenteredText } from '../shared/CenteredText';

export const Login = () => {
  const navigate = useNavigate();
  const loginForm = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, session } = UserAuth();

  useEffect(() => {
    if (session) {
      navigate('/dashboard');
    }
  }, [session]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const { error } = await login(
        formData.get('email'),
        formData.get('password')
      );

      if (error) {
        setError('Incorrect email or password');
      } else {
        setError(null);
        navigate('/dashboard');
      }
    } catch (error) {
      setError('An error has occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <CenteredText>
        <h2>Welcome back to Have-It</h2>
      </CenteredText>
      <form id="login-form" ref={loginForm} onSubmit={handleLogin}>
        <FormField
          name="email"
          type={'email'}
          placeholder={'example@example.com'}
          displayText={'Email'}
        />
        <FormField name="password" type={'password'} displayText={'Password'} />
        <ErrorBox error={error} />
        <ButtonContainer>
          <Link to={'/signup'}>Don't have an account?</Link>
          <Button
            text={loading ? 'Logging In' : 'Login'}
            buttonType={'primary'}
            disabled={loading}
          />
        </ButtonContainer>
      </form>
    </>
  );
};
