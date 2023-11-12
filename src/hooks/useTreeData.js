import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query'

async function grabPairingData(pairing_id){
    const {data, error} = await supabase
    .from('pairings')
    .select('*')
    .eq('pairing_id', pairing_id)
    if(error) console.log(error.message)
    return data
}

async function organizeOffspringByGen(offspring){
    const organizedOffspring=[]
    let highestGen=0
    for(const child of offspring){
        if(child.generation > highestGen){
            highestGen = child.generation
        }
    }
    for(let i=0; i<=highestGen; i++){
        organizedOffspring.push([])
    }
    for(const child of offspring){
        organizedOffspring[child.generation].push(child)
    }
    //remove empty arrays
    for(let i=organizedOffspring.length-1; i>=0; i--){
        if(organizedOffspring[i].length === 0){
            organizedOffspring.splice(i, 1)
        }
    }
    
    console.log(organizedOffspring, " organized offspring")

    return organizedOffspring
    

}

async function grabPairingOffspring(pairing_id){
    const {data, error} = await supabase
    .from('offspring')
    .select('*')
    .eq('pairing_id', pairing_id)
    if(error) console.log(error.message)

    const organizedOffspring = await organizeOffspringByGen(data)


    return organizedOffspring
}
      {/*
        idArray.push(offspring.animal_id)
        idObj.children.push(offspring.animal_id)
        */}

async function createIdArray(pairingData, pairingOffspring){
    console.log(pairingOffspring, " pairing offspring")
    const genIdx=1
    const idArray = []
    const idObj={
        parents:{
            mom:pairingData[0].female_id,
            dad:pairingData[0].male_id
        },
        generations:[]
    }

      
        for(const generation of pairingOffspring){
            const genArr=[]
            for(const offspring of generation){
                idArray.push(offspring.animal_id)
                genArr.push(offspring.animal_id)
            }
            idObj.generations.push(genArr)
        }
    
        idArray.push(pairingData[0].male_id)
        idArray.push(pairingData[0].female_id)

    return [idArray, idObj]
}

async function shapeData(data, idObj){
    const shapedData = {
        parents:{
            mom:data.filter(animal => animal.animal_id === idObj.parents.mom)[0],
            dad:data.filter(animal => animal.animal_id === idObj.parents.dad)[0]
        },
        generations:[]
    }
    for(const gen of idObj.generations){
        const genArr=[]
        for(const animal of gen){
            genArr.push(data.filter(animalData => animalData.animal_id === animal)[0])
        }
        shapedData.generations.push(genArr)
    }
    return shapedData
}

async function fetchTreeData(pairing_id){
    const pairingData = await grabPairingData(pairing_id)
    const pairingOffspring = await grabPairingOffspring(pairing_id)
    const idArray = await createIdArray(pairingData, pairingOffspring)
    console.log(idArray, " id array")
    const {data, error} = await supabase
    .from('animals')
    .select(`*,
    photos(
        *
    )`)
    .in('animal_id', idArray[0])

    if(error) console.log(error.message)


    const shapedData = await shapeData(data, idArray[1])
    return shapedData
}

export function useTreeData(pairing_id){
    return useQuery([`${pairing_id}-tree-data`, pairing_id], () => fetchTreeData(pairing_id), {
        enabled: !!pairing_id
    })
}