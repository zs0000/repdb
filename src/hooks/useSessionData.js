
import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getSessionData() {
    const {data, error} = await supabase.auth.getSession()
    const username  = await supabase.auth.getUser()
   

    return data
}

export function useSessionData() {
    return useQuery(['session-data'], () => getSessionData(), {
       
  })
}


