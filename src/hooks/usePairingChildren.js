import { supabase } from "@/lib/supabaseClient";
import  {useQuery} from "@tanstack/react-query";

async function sortPairingsByGeneration(data) {
    const generations = []

    data.forEach((animal) => {
        if(!generations[animal.generation]){
            generations[animal.generation] = []
        }
        generations[animal.generation].push(animal.animal_id)
    })

    return generations
}

async function getPairingsChildren({id}){
    const {data, error} = await supabase
    .from('offspring')
    .select('*')
    .eq('pairing_id', id)

    if(error) throw error
    const sortedData = await sortPairingsByGeneration(data)
    return sortedData
}

export function usePairingsChildren(id){
    return useQuery([`${id}-pairings-children`, id], () => getPairingsChildren(id), {
        enabled: !!id
    })
}