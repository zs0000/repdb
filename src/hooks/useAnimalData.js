
import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getAnimalData(id) {
  const { data, error } = await supabase
    .from('animals')
    .select(`
      *,
      photos (
        img_url
      )
    `)
    .eq('animal_id', id);

  if (error) throw error;
  return data;
}

export function useAnimalData(id) {
    return useQuery(['animalData', id], () => getAnimalData(id), {
      enabled: !!id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }