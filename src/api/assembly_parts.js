import { supabase } from '../lib/supabase';

const TABLE = 'assembly_parts';

export async function createAssemblyPart(
  assemblyId,
  partId,
  partName,
  quantity
) {
  const part = {
    assembly_id: assemblyId,
    part_id: partId,
    quantity: quantity,
    part_name: partName,
  };
  const { error, data } = await supabase.from(TABLE).insert(part).select();
  return { error, data };
}

export async function getPartsByAssemblyId(assemblyId) {
  const { error, data } = await supabase
    .from(TABLE)
    .select()
    .eq('assembly_id', assemblyId)
    .order('created_at', { ascending: true });
  return { error, data };
}

export async function updateAssemblyPartQuantity(assemblyPartId, quantity) {
  const { error, data } = await supabase
    .from(TABLE)
    .update({ quantity: quantity })
    .eq('id', assemblyPartId);

  return { error, data };
}

export async function deleteAssemblyPartById(assemblyPartId) {
  const res = await supabase.from(TABLE).delete().eq('id', assemblyPartId);

  return res;
}
