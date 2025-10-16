import { useEffect, useRef, useState } from 'react';
import { Button } from '../shared/Button/Button';

import { Link, useNavigate } from 'react-router';
import { ButtonContainer } from '../shared/ButtonContainer';
import { UserAuth } from '../context/AuthContext';

export const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);
  const signupForm = useRef(null);
  const navigate = useNavigate();

  const { session, signupNewUser } = UserAuth();

  console.log(session);

  useEffect(() => {
    async function handleSubmit() {
      const formData = new FormData(signupForm.current);
      const email = formData.get('email');

      if (!email) return;
      setLoading(true);

      try {
        const { error } = await signupNewUser(email);
        console.log(error);

        if (!error) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Signup error: ', error);
        setSubmitError(error);
      }

      // const { error } = await sendMagicLink(email);
      // const { error } = await signupNewUser(email);

      // if (error) {
      //   setSubmitError(error);
      //   setSuccess(false);
      // } else {
      //   setSuccess(true);
      //   setSubmitError('');
      // }
      setSubmitting(false);
      setLoading(false);
    }

    if (submitting) {
      handleSubmit();
    }
  }, [submitting]);

  return (
    <>
      <h2>Get Started With Have-It</h2>
      <p>Create an account now!</p>
      <form
        id="signup-form"
        ref={signupForm}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
        }}
      >
        <div>
          {submitError ? <p>`${submitError.message}`</p> : ``}
          {success ? <p>Please check your email for your magic link</p> : ''}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required />
        </div>
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
