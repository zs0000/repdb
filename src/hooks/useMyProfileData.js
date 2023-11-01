import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getMyProfileData(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      full_name,
      username,
      website,
      avatar_url,
      bio,
      id
    `)
    .eq('id', id)


  if (error) throw error;
  else{
    
  }
  return data;
}

export function useMyProfileData(id) {
    return useQuery([`${id}-profile-data`, id], () => getMyProfileData(id), {
      enabled: !!id, // Only run the query if the `id` is not `null` or `undefined`
    });
  }