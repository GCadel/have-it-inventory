import { useEffect, useRef, useState } from 'react';
import { Button } from '../shared/Button/Button';
import { sendMagicLink } from '../lib/auth';

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [success, setSuccess] = useState(false);
  const loginForm = useRef(null);

  useEffect(() => {
    async function handleSubmit() {
      const formData = new FormData(loginForm.current);
      const email = formData.get('email');

      if (!email) return;
      setLoading(true);

      const { error } = await sendMagicLink(email);

      if (error) {
        setSubmitError(error);
        setSuccess(false);
      } else {
        setSuccess(true);
        setSubmitError('');
      }
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
        id="login-form"
        ref={loginForm}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
        }}
      >
        <div>
          {submitError ? <p>`${submitError.message}`</p> : ``}
          {success ? <p>Please check your email for a login link</p> : ''}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" required />
        </div>
        <Button
          text={loading ? 'Submitting' : 'Sign Up'}
          buttonType={'primary'}
          disabled={loading}
        />
      </form>
    </>
  );
};
