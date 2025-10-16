import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [session, setSession] = useState(null);

  // Sign up
  async function signupNewUser(email, password, displayName) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            displayName: displayName,
          },
        },
      });

      if (error) {
        console.error('Attempt sign up error:', error);
      } else {
        console.log('signup success');
      }
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  }

  // Log off
  async function logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Attempt logout error:', error);
      } else {
        console.log('Logout success');
      }
      return error;
    } catch (error) {
      console.error('Logout error:', error);
      return { error };
    }
  }

  // Log in
  async function login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Attempt login error:', error);
        return error;
      } else {
        console.log('Login success');
        return data;
      }
    } catch (error) {
      console.error('Login error:', error);
      return { error };
    }
  }

  // Listen for auth events and set the status, like logging in and signing out
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, signupNewUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
