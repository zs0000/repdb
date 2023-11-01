import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getUserRecentlyAdded(id) {
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
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) throw error;
  else{
    
  }
  return data;
}

export function useUserRecentlyAdded(id) {
    return useQuery([`${id}-recently-added`, id], () => getUserRecentlyAdded(id), {
      enabled: !!id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }