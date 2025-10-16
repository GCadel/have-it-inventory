import { supabase } from './supabase';

// This whole file may not be needed... we'll see
export async function sendMagicLink(email) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    return { error };
  }
  return { error: null };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getUser() {
  return await supabase.auth.getUser();
}

// Passing the user data back to the callback
export function onAuthStateChange(callback) {
  getUser().then(({ data }) => {
    callback(data.user);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session.user || null);
  });
  return subscription;
}
