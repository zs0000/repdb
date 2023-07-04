import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getUserInfo(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      full_name,
      username,
      website,
      avatar_url,
      bio
    `)
    .eq('id', id)


  if (error) throw error;
  else{
    
  }
  return data;
}

export function useUserInfo(id) {
    return useQuery([`${id}-user-card-data`, id], () => getUserInfo(id), {
      enabled: !!id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }