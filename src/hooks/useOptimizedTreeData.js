import { supabase } from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';

const selectFields = {
  pairings: 'pairing_id, female_id, male_id',
  offspring: 'animal_id, generation, pairing_id',
  animals: 'animal_id, animal_name,animal_gene_traits, photos(img_url)',
};

async function grabPairingData(pairing_id) {
  const { data, error } = await supabase
    .from('pairings')
    .select(selectFields.pairings)
    .eq('pairing_id', pairing_id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

function organizeOffspringByGen(offspring) {
  const organizedOffspring = offspring.reduce((acc, child) => {
    const gen = child.generation;
    if (!acc[gen]) acc[gen] = [];
    acc[gen].push(child);
    return acc;
  }, []);
  return organizedOffspring.filter(group => group.length > 0);
}

async function grabPairingOffspring(pairing_id) {
  const { data, error } = await supabase
    .from('offspring')
    .select(selectFields.offspring)
    .eq('pairing_id', pairing_id);

  if (error) throw new Error(error.message);
  return organizeOffspringByGen(data);
}

function createIdArray(pairingData, pairingOffspring) {
  const idArray = [];
  const idObj = {
    parents: {
      mom: pairingData.female_id,
      dad: pairingData.male_id,
    },
    generations: [],
  };

  pairingOffspring.forEach(generation => {
    const genArr = generation.map(offspring => offspring.animal_id);
    idObj.generations.push(genArr);
    idArray.push(...genArr);
  });

  idArray.push(idObj.parents.mom, idObj.parents.dad);
  return [idArray, idObj];
}

async function shapeData(animals, idObj) {
  const findAnimalById = id => animals.find(animal => animal.animal_id === id);

  const shapedData = {
    parents: {
      mom: findAnimalById(idObj.parents.mom),
      dad: findAnimalById(idObj.parents.dad),
    },
    generations: idObj.generations.map(gen =>
      gen.map(findAnimalById),
    ),
  };

  return shapedData;
}

async function fetchTreeData(pairing_id) {
  const pairingData = await grabPairingData(pairing_id);
  const pairingOffspring = await grabPairingOffspring(pairing_id);
  const [idArray, idObj] = createIdArray(pairingData, pairingOffspring);

  const { data, error } = await supabase
    .from('animals')
    .select(selectFields.animals)
    .in('animal_id', idArray);

  if (error) throw new Error(error.message);
  return shapeData(data, idObj);
}

export function useTreeData(pairing_id) {
  return useQuery(
    [`${pairing_id}-tree-data`, pairing_id],
    () => fetchTreeData(pairing_id),
    { enabled: !!pairing_id }
  );
}
