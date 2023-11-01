import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getAnimalFavorites(animal_id) {
    const { data, error, count } = await supabase
      .from('likes')
      .select('id', { count: 'exact' }) // select 'id' can be any column, it's just for counting
      .eq('liked_animal_id', animal_id);
  
    if (error) throw error;
  
    return count;  // This will contain the count of records that match the condition
  }
  
  export function useAnimalFavorites(animal_id) {
    return useQuery([`${animal_id}-favorites`, animal_id], () => getAnimalFavorites(animal_id), {
      enabled: !!animal_id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }