import { supabase } from '../lib/supabase';

const TABLE = 'parts';

// Add a part
export async function addPart(part) {
  const { error } = await supabase.from(TABLE).insert([part]).select();
  return { error };
}

// Get all parts
export async function getAllParts() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('name', { ascending: true });
  return { data, error };
}

// Get a part
export async function getPartById(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id);
  return { data, error };
}

// Update a part
export async function updatePartById(id, data) {
  const { error } = await supabase
    .from(TABLE)
    .update({ ...data })
    .eq('id', id);

  return { error };
}

// Delete parts
export async function deleteParts(ids = []) {
  const res = await supabase.from(TABLE).delete().in('id', ids);
  return res;
}
