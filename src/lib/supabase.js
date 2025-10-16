import { createClient } from '@supabase/supabase-js';

const supabaseURL = import.meta.env.VITE_projectURL;
const supabaseAPI = import.meta.env.VITE_anonPublicAPI;

export const supabase = createClient(supabaseURL, supabaseAPI);
