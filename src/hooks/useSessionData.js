
import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

async function getUsername(id){

    const {data, error} = await supabase
    .from('profiles')
    .select('username')
    .eq('id', id)
    .single()
    if(error) console.log(error)

    return data

}

async function getSessionData() {
    const {data, error} = await supabase.auth.getSession()

    if(error){
        console.log(error)
        return error
    }
    if(data === null || data === undefined)
    {
        return data
    }
    
    if(data?.session){
        const {username} = await getUsername(data.session.user.id)
    data.session.user.username = username
    }
    return data
}

export function useSessionData() {
    return useQuery(['session-data'], () => getSessionData(), {
       
  })
}


