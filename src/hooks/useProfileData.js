import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getProfileData(username) {
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
    .eq('username', username)


  if (error) throw error;
  else{
    
  }
  return data;
}

export function useProfileData(username) {
    return useQuery([`${username}-profile-data`, username], () => getProfileData(username), {
      enabled: !!username, // Only run the query if the `id` is not `null` or `undefined`
    });
  }