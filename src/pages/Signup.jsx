import { useRef, useState } from 'react';
import { Button } from '../shared/Button/Button';

import { Link, useNavigate } from 'react-router';
import { ButtonContainer } from '../shared/ButtonContainer';
import FormField from '../shared/FormField';
import { UserAuth } from '../context/AuthContext';

export const Signup = () => {
  const navigate = useNavigate();
  const signupForm = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signupNewUser } = UserAuth();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    try {
      const result = await signupNewUser(
        formData.get('email'),
        formData.get('password'),
        formData.get('name')
      );

      if (error) {
        console.error('Signup unsuccessful', result);
      }
      navigate('/dashboard');
    } catch (error) {
      setError('An error has occurred');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2>Get Started With Have-It</h2>
      <p>Create an account now!</p>
      <form id="signup-form" ref={signupForm} onSubmit={handleSignup}>
        <div>{error ? <p>Something went wrong: {`${error}`}</p> : ``}</div>
        <FormField
          name="name"
          type={'text'}
          placeholder={'John Doe'}
          displayText={'Your name'}
        />
        <FormField
          name="email"
          type={'email'}
          placeholder={'example@example.com'}
          displayText={'Email'}
        />
        <FormField
          name="password"
          type={'password'}
          displayText={'Password'}
          min={8}
        />
        <ButtonContainer>
          <Link to={'/login'}>Have an account?</Link>
          <Button
            text={loading ? 'Submitting' : 'Sign Up'}
            buttonType={'primary'}
            disabled={loading}
          />
        </ButtonContainer>
      </form>
    </>
  );
};
