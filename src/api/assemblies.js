const TABLE = 'assemblies';

import { supabase } from '../lib/supabase';

export async function createAssembly(assemblyEntry, userId) {
  const { error, data } = await supabase
    .from(TABLE)
    .insert(assemblyEntry)
    .select();
  return { error, data };
}

export async function getAllAssemblies(userId) {
  const { error, data } = await supabase
    .from(TABLE)
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: 'true' });

  return { error, data };
}

export async function getAssemblyById(assemblyId, userId) {
  const { error, data } = await supabase
    .from(TABLE)
    .select()
    .eq('id', assemblyId)
    .eq('user_id', userId)
    .single();

  return { error, data };
}

export async function deleteAssemblyById(assemblyId, userId) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', assemblyId)
    .eq('user_id', userId);
  return { error };
}
