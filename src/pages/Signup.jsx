import { useEffect, useRef, useState } from 'react';
import { Button } from '../shared/Button/Button';

import { Link, useNavigate } from 'react-router';
import { ButtonContainer } from '../shared/ButtonContainer';
import FormField from '../shared/FormField';

export const Signup = () => {
  const navigate = useNavigate();
  const signupForm = useRef(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    alert(`Thanks for signing up, ${formData.get('name')}`);
  }

  return (
    <>
      <h2>Get Started With Have-It</h2>
      <p>Create an account now!</p>
      <form id="signup-form" ref={signupForm} onSubmit={handleSubmit}>
        <div>
          {error ? <p>Something went wrong: {`${error}`}</p> : ``}
          {success ? <p>Please check your email for your magic link</p> : ''}
        </div>
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
