import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";



async function getUserPairings(id){
    const{data, error} = await supabase
    .from('pairings')
    .select('*')
    .eq('user_id', id)
    const animalIds = compileAnimalIDs(data)
    if(error) throw error;
    return animalIds
}
async function compileAnimalIDs(pairings){
    const animalIDs = []
    const pairs = []
    pairings.map((pairing) => {
        animalIDs.push(pairing.male_id)
        animalIDs.push(pairing.female_id)
        let pair = {
                "pair_id":pairing.pairing_id,
                "male_id":pairing.male_id,
                "female_id":pairing.female_id
            }
        pairs.push(pair)
})
        

    return [animalIDs, pairs]
}
async function getUserAnimalPairings(id) {
   const pairings = await getUserPairings(id)
   console.log(pairings)
   
    const { data, error } = await supabase
    .from('animals')
    .select(`*,
    photos (
        img_url
        )`)
    .in('animal_id', pairings[0])


    if (error) throw error;
    else {
    }
    return [data, pairings[1]];
    }

export function useUserAnimalPairings(id) {
    return useQuery([`${id}-animal-pairings`, id], () => getUserAnimalPairings(id), {
        enabled: !!id, // Only run the query if the `id` is not `null` or `undefined`
    });
}