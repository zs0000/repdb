import {supabase} from '@/lib/supabaseClient'
import { useQuery } from '@tanstack/react-query'

async function getPairingData(pairing_id){
const {data, error} = await supabase
.from("pairings")
.select(`
pairing_id,
female:animals!pairings_female_id_fkey (
    animal_id,
    animal_name,
    animal_gender,
    animal_gene_traits,
    photos("img_url")
),
male:animals!pairings_male_id_fkey (
    animal_id,
    animal_name,
    animal_gender,
    animal_gene_traits,
    photos("img_url")
),
kids:offspring (
    *,
    animal:animals(
        animal_id,
        animal_name,
        animal_gender,
        animal_gene_traits,
        photos("img_url")
    )
    )
`)
.eq("pairing_id", pairing_id)

if(error) throw error
return data[0]
}

export function usePairingData(pairing_id){
    return useQuery([`pairing_${pairing_id}-data`, pairing_id], () => getPairingData(pairing_id))
}