import { supabase } from '../lib/supabase';

const TABLE = 'parts';

export async function addPart(part) {
  const { error } = await supabase.from(TABLE).insert([part]).select();
  return { error };
}

export async function getAllParts() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('name', { ascending: true });
  return { data, error };
}

export async function getPartById(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id);
  return { data, error };
}

export async function updatePartById(id, data) {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data })
    .eq('id', id);

  return { error };
}

export async function deleteParts(ids = []) {
  const res = await supabase.from(TABLE).delete().in('id', ids);
  return res;
}
