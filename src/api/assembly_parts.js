import { supabase } from '../lib/supabase';

const TABLE = 'assembly_parts';

export async function createAssemblyPart(assemblyId, partId, quantity) {
  const part = {
    assembly_id: assemblyId,
    part_id: partId,
    quantity: 4,
  };

  const { error, data } = await supabase.from(TABLE).insert(part).select();
  console.log(data);
  return { error, data };
}

export async function getPartsByAssemblyId(assemblyId) {
  const { error, data } = await supabase
    .from(TABLE)
    .select()
    .eq('assembly_id', assemblyId);
  console.log('getting parts by assembly id');
  console.log(error, data);
  return { error, data };
}
