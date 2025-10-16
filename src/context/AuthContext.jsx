import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();
export function AuthContextProvider({ children }) {
  const [session, setSession] = useState(null);

  // For a new user
  async function signupNewUser(email) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      //   options: {
      //   emailRedirectTo: window.location.origin,
      // },
    });

    if (error) {
      console.log('Issue signing up');
      return { error };
    }
    return { error: null };
  }

  // For signing in, might not need
  async function login(email) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        console.error('Try Login error: ', error);
        return { error };
      }

      console.log('Login success', data);

      return { data };
    } catch (error) {
      console.error('Catch Login error: ', error);
    }
  }

  // For signing out
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Signout error:', error);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, signupNewUser, signout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
