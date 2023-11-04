import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

async function fetchPairingAnimalIds(pairing_id) {
    const {data, error} = await supabase
    .from('pairings')
    .select('*')
    .eq('pairing_id', pairing_id)

    if(error) throw error

    return data
}

export function usePairingAnimalIds(pairing_id) {
    return useQuery([`${pairing_id}-pairing-animal-ids`, pairing_id], () => fetchPairingAnimalIds(pairing_id), {
        enabled: !!pairing_id
    })
}