// All requiring user ID

const TABLE = 'assemblies';

import { supabase } from '../lib/supabase';

// Create assembly
export async function createAssembly(assemblyEntry, userId) {
  // const data = {
  //   name: 'Assembly Name',
  //   description: 'Description of Assembly',
  //   user_id: userId,
  // };

  console.log('Create assembly:');
  const { error, data } = await supabase
    .from(TABLE)
    .insert(assemblyEntry)
    .select();
  return { error, data };
}

// Get all assemblies
export async function getAllAssemblies(userId) {
  const { error, data } = await supabase
    .from(TABLE)
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: 'true' });

  return { error, data };
}

// Get assembly by id
export async function getAssemblyById(assemblyId, userId) {
  const { error, data } = await supabase
    .from(TABLE)
    .select()
    .eq('id', assemblyId)
    .eq('user_id', userId)
    .single();

  return { error, data };
}

// Update assembly

// Delete assembly
