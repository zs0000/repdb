import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getUserAnimalData(id) {
  const { data, error } = await supabase
    .from('animals')
    .select(`
      *,
      photos (
        img_url
      )
    `)
    .eq('animal_owned_by_user_id', id)
    .eq('marked_for_deletion', false)

  if (error) throw error;
  else{
    
  }
  return data;
}

export function useUserAnimalData(id) {
    return useQuery([`${id}-animal-data`, id], () => getUserAnimalData(id), {
      enabled: !!id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }