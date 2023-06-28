import { useEffect, useReducer, useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'
import {BsCameraFill} from "react-icons/bs"
import { supabase } from '@/lib/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')

const EditAnimalForm = ({session, animal, testState, setTestState}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [animalName, setAnimalName] = useState('');
  const [animalId, setAnimalId] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalGender, setAnimalGender] = useState('unknown');
  const [animalGenes, setAnimalGenes] = useState([]);

  const [imageSelected, setImageSelected] = useState("");
  const [postingImage, setPostingImage] = useState("none");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedGenes, setSelectedGenes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [snakeGenes, setSnakeGenes] = useState([
    "Pinstripe",
    "Pastel",
    "Fire",
    "Spider",
    "Mojave",
    "Lesser",
    "Phantom",
    "Enchi",
    "Yellow Belly",
    "Cinnamon",
    "Black Pastel",
    "Spotnose",
    "Banana",
    "Axanthic",
    "Clown",
    "Piebald",
    "GHI",
    "Coral Glow",
    "Super Pastel",
    "Super Stripe",
    "Bumblebee",
    "Butter",
    "Mystic",
    "Vanilla",
    "Champagne",
    "Ghost",
    "Woma",
    "Blade",
    "Special",
    "Specter",
    "Candino",
    "Pin",
    "Cypress",
    "Sugar",
    "Sable",
    "Hidden Gene Woma",
    "Mojave Ghost",
    "Orange Dream",
    "Ivory",
    "Firefly",
    "Spark",
    "Yellowbelly",
    "Gravel",])
  const [crestedGenes, setCrestedGenes] = useState(["Axanthic",
   "Bi-Color",
    "Black",
     "Black Base",
      "Blonde",
       "Blushing",
        "Bold Stripe Tigers",
         "Brindle",
          "Buckskin",
           "Bullseye",
            "Cappuccino",
             "Chevron",
              "Cluster Spots",
               "Cold Fusion",
                "Cream",
                 "Creamsicle",
                  "Crowned",
                   "Dalmatian",
                    "Dark",
                     "Drippy",
                      "Empty Back",
                       "Extreme Harlequin",
                        "Flame",
                         "Fringing",
                          "Furred",
                           "Halloween",
                            "Harlequin",
                             "Hypo",
                              "Ink Spot",
                               "Kneecaps",
                                "Lavender",
                                 "Lilly White",
                                  "Mocha",
                                   "Monochrome",
                                    "Normal",
                                     "Oil Spot",
                                      "Olive",
                                       "Orange",
                                        "Orange Patterning",
                                         "Orange Tip",
                                          "Partial Pinstripe",
                                           "Patternless",
                                            "Peppered",
                                             "Pet Only",
                                              "Phantom",
                                               "Pin-Dashed",
                                                "Pinstripe",
                                                 "Portholes",
                                                  "Quad-Stripe",
                                                   "Red",
                                                    "Red Base",
                                                     "Red Spot",
                                                      "Reverse Pinstripe",
                                                       "Snowflake",
                                                        "Soft Scale",
                                                         "Solid Back",
                                                          "Super Dalmatian",
                                                           "Super Stripe",
                                                            "Tailless",
                                                             "Tangerine",
                                                              "Tiger",
                                                               "Tri-Color",
                                                                "White Out",
                                                                  "White Tip",
                                                                   "White Wall",
                                                                    "Yellow",
                                                                     "Yellow Base"])
  const [buttonEnabled, setButtonEnabled] = useState(false)
  const [addPairings, setAddPairings] = useState(false)
  const [fetchCount, setFetchCount] = useState(0)
  const [animals, setAnimals] = useState([])
  const [animalSearchTerm, setAnimalSearchTerm] = useState("")
  const [animalSearchResults, setAnimalSearchResults] = useState([])
  const [selectedPairings, setSelectedPairings] = useState([])


  const [addOffspring, setAddOffspring] = useState(false)
  const [offspring, setOffspring] = useState([])
  const [offspringSearchTerm, setOffspringSearchTerm] = useState("")
  const [offspringSearchResults, setOffspringSearchResults] = useState([])
  const [selectedOffspring, setSelectedOffspring] = useState([])
  const [selectedFather, setSelectedFather] = useState(null);

    const handleOffspringSelect = (animalObject) => {
      if (selectedOffspring.some(animal => animal.animal_id === animalObject.animal_id)) {
        setSelectedOffspring(selectedOffspring.filter((animal) => animal.animal_id !== animalObject.animal_id));
      } else {
        const newAnimal = {
          animal_id: animalObject.animal_id,
          animal_name: animalObject.animal_name,
          // you can add more properties if needed
        };
        setSelectedOffspring([...selectedOffspring, newAnimal]);
        console.log(selectedOffspring)
      }
    };
    const handleOffspringSearchChange = async(e) => {
      const newOffspringSearchTerm = e.target.value;
      setOffspringSearchTerm(newOffspringSearchTerm);

      const newOffspringSearchResults = animals.filter((animal) =>
        animal.animal_name.toLowerCase().includes(newOffspringSearchTerm.toLowerCase())

      );

      newOffspringSearchResults.forEach((animal, index) => {
        if(animal.animal_id === animalId){
          newOffspringSearchResults.splice(index, 1)
        }
        if(animal.animal_type !== animalType){
          newOffspringSearchResults.splice(index, 1)
        }
      

      })
      setOffspringSearchResults(newOffspringSearchResults)
    }



 

 

  const current = new Date();

  const genesMap = {
    'Crested Gecko': crestedGenes,
    'Ball Python': snakeGenes,
    // add other animal types and their genes here
  };
  
  // create a function that checks if any changes were made to the original values of the animal, and returns true if there were changes, and false if there were not.
  const checkForChanges = () => {
    // if the animal name is not equal to the original animal name, return true
    if (animalName !== animal.animal_name || animalType !== animal.animal_type ||animalGender !== animal.animal_gender||animalGenes !== animal.animal_gene_traits
      ||imageUrl !== animal.animal_photo_url) {
        console.log(animal.animal_name)
        console.log(animalName)
        setButtonEnabled(false)
    }else{
      setButtonEnabled(true)
    }
    
    
  };

  
  const handleSearchChange = async(e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  
    const genes = genesMap[animalType] || [];
    const newSearchResults = genes.filter((gene) =>
      gene.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
  
    setSearchResults(newSearchResults);
  };
  const handleAnimalSearchChange = async(e) => {
    const newAnimalSearchTerm = e.target.value;
    setAnimalSearchTerm(newAnimalSearchTerm);

    const newAnimalSearchResults = animals.filter((animal) =>
      animal.animal_name.toLowerCase().includes(newAnimalSearchTerm.toLowerCase())
   
    );
       
        newAnimalSearchResults.forEach((animal, index) => {
          if(animal.animal_id === animalId){
            newAnimalSearchResults.splice(index, 1)
          }
          if(animal.animal_type !== animalType){
            newAnimalSearchResults.splice(index, 1)
          }
          if(animal.animal_gender === animalGender){
            newAnimalSearchResults.splice(index, 1)
          }
        })
       


    setAnimalSearchResults(newAnimalSearchResults)
    console.log(animalSearchResults)
  }


  const handleParingsSelect = (animalObject) => {
    if (selectedPairings.some(animal => animal.animal_id === animalObject.animal_id)) {
      setSelectedPairings(selectedPairings.filter((animal) => animal.animal_id !== animalObject.animal_id));
    } else {
      const newAnimal = {
        animal_id: animalObject.animal_id, 
        animal_name: animalObject.animal_name,
        // you can add more properties if needed
      };
      setSelectedPairings([...selectedPairings, newAnimal]);
      console.log(selectedPairings)
    }
  };
  


    const handleGeneSelect = (gene) => {
      if (animalGenes.includes(gene)) {
        setAnimalGenes(animalGenes.filter((g) => g !== gene));
      } else {
        setAnimalGenes([...animalGenes, gene]);
      }
    };
  let inputs={
    animal_id:animalId,
    animal_name:animalName,
    animal_type:animalType,  
    animal_added_by_user_id:session.user.id,
    animal_owned_by_user_id:session.user.id,
    animal_photo_url:imageUrl,
    animal_gene_traits:animalGenes,
    animal_gender:animalGender,
    created_at:current,


  }
 
  const queryClient = useQueryClient()
  const formData = new FormData()
  formData.append("upload_preset", "jrkwcuxy")
  const handleImageSelect = (e) => {
      e.stopPropagation()
      document.getElementById('file_input')?.click();
      
  }
  const handleImageUpload = async(e) =>{
    e.preventDefault()
     try {
     
     
      axios.post("https://api.cloudinary.com/v1_1/repdb/image/upload",formData).then(function (response) {
          setImageUrl(response.data.url)
          setPostingImage("uploaded")
          checkForChanges()
        })
     } catch (err) {
      console.error(err.message)
     }
    } 
  

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setAnimalName('')
    setAnimalType('')
    setAnimalGender('unknown')
    setImageSelected('')
    setPostingImage("none")
    setImageUrl(null)
    setTestState(false)
    setIsOpen(false);
  
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      
        const {data,error} = await supabase.from('animals').update([inputs]).eq('animal_id',animalId)
       if(selectedPairings.length > 0){
        //check if animal is a female to determine whether it is a mother for database
        if(animalGender == "Female"){
          selectedPairings.forEach(async(animal)=>{
            const createPairing = await supabase.from('pairings').insert([{mother:animalId, father:animal.animal_id}])
            if(error){
              console.log(error)
            }
          })
        } else if(animalGender == "Male"){
          selectedPairings.forEach(async(animal)=>{
            const createPairing = await supabase.from('pairings').insert([{mother:animal.animal_id, father:animalId}])
            if(error){
              console.log(error)
            }
          })
        }
      }
      if(error){
        alert(error)
        console.log(error)
      }
    setAnimalName('')
    setAnimalType('')
    setAnimalGender('unknown')
    setImageSelected('')
    setPostingImage("none")
    setImageUrl(null)
    queryClient.invalidateQueries("animals")
      closeModal()
      

    } catch (err) {
      console.error(err.message)
    }
}

const handleFetchAnimals = async() => {
  try {
   if(fetchCount==0){
    const {data,error} = await supabase.from('animals').select('*').eq('animal_owned_by_user_id',session.user.id)
    if(data){
      setAnimals(data)

      setFetchCount(1)
    }
    if(error){
      console.log(error)
    }


   }
  } catch (err) {
    console.error(err.message)
  }

}


useEffect(() => {
  if (testState) {
    openModal();
   
  }
}, [testState]);

useEffect(()=>{
  if(animal){
    setAnimalName(animal.animal_name)
    setAnimalId(animal.animal_id)
    setAnimalType(animal.animal_type)
    setAnimalGender(animal.animal_gender)
    setImageUrl(animal.animal_photo_url)
    if(animal.animal_gene_traits){
      setAnimalGenes(animal.animal_gene_traits)
    }
    if(animal.animal_pairings){
      setSelectedPairings(animal.animal_pairings)
    }

    setLoading(false)
  }
},[animal, session])
if(!animal){
  return <>error</>
}
  return (
    <div onClick={e=>e.stopPropagation()} >
     
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Animal Form"
        className="absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg h-90% md:w-[60%] "
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
       
      >
        {loading ? <></>
        :
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='w-full flex flex-row justify-evenly'>
          <label className="block w-[33%] mb-1 ">
            Animal Name:
            <input className="block w-full mt-1 bg-gray-100 rounded px-1 py-1 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0" type="text" value={animalName} 
            onChange={(e) => {setAnimalName(e.target.value)
            }}  />
          </label>
          <label className="block w-[33%] mb-1 ">
            Animal Gender:
            <select  className="block w-full mt-1 bg-gray-100 rounded px-1 py-1 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0"  value={animalGender} onChange={(e) => {setAnimalGender(e.target.value)
            }}  >
              <option value="Unknown">Unknown</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              </select>
          </label>
          <label className="block w-[33%] mb-0">
            Animal Type:*
            <select className="block w-full mt-1 hover:cursor-pointer  bg-gray-100 rounded px-1 py-1 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0" onChange={(e) => {
              setAnimalType(e.target.value)
              setAnimalGenes([])
              setSearchTerm("")
              setSearchResults([])
              
            }}
            value={animalType}
            required>
            <option  disabled hidden>Choose reptile</option>
              <option value="Crested Gecko">Crested Gecko</option>
              <option value="Ball Python">Ball Python</option>
            </select>
          </label>
          </div>
          <div className=' w-full flex flex-col'>
          <div className="w-full flex flex-col items-start min-h-[5vh] mb-1 border rounded p-1">
  <label className="pl-1 pb-1">{animalGenes.length > 0 ? 'Selected genes:' : 'Select genes:'}</label>{animalGenes.length > 0 && (
    <div className="flex flex-row flex-wrap w-full">
      {animalGenes.map((gene) => (
        <span 
          key={gene}
          onClick={() =>{ handleGeneSelect(gene)
            }} 
          className="bg-sky-100 px-2 py-1 mx-[2px] mb-2 border border-slate-300 rounded hover:cursor-pointer hover:bg-sky-200 hover:transition-colors duration-200"
        >
          {gene}
        </span>
      ))}
    </div>
  )}
  <input
    type="text"
    className="block rounded rounded-b-none shadow-sm w-full px-2 py-1 hover:bg-gray-50 border border-b-0 focus:bg-white transition-colors duration-200 hover:border-gray-200 focus:outline-none"
    placeholder={
      animalType === 'Crested Gecko'
        ? 'Search to add Genes for your Crested Gecko...'
        : 'Search to add Genes for your Ball Python...'
    }
    value={searchTerm}
    onChange={(e)=>handleSearchChange(e)}
  />
  <div className="flex flex-col bg-zinc-200 overflow-y-scroll max-h-32 w-[100%] mt-2">
    {searchTerm.length > 0 && searchResults.map((gene) => (
      <div 
        key={gene} 
        className={`cursor-pointer p-1 ${animalGenes.includes(gene) ? "bg-sky-100 m-[2px] border border-slate-300 rounded hover:bg-sky-50" : " bg-zinc-50 m-[2px] border rounded hover:bg-white"}`}
        onClick={() => {handleGeneSelect(gene)
         }}
      >
        {gene}
      </div>
    ))}
  </div>
  
</div>
<div className='w-full py-1 pb-2'>
<div className="w-full bg-gray-100 rounded shadow p-1">
              <div className='w-full flex flex-row justify-center '>
              <span className='tracking-tight p-1'>
                Pairings:
              </span>
              <div className='w-full flex justify-end'>
              <label className="inline-flex items-center font-semibold text-sm tracking-tight">
          Add Pairings?
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 ml-1 text-sky-600"
            value={addPairings}
           
            onChange={(e) => {
              setAddPairings(!addPairings)
              setAnimalSearchTerm("")
              handleFetchAnimals()
              console.log(addPairings)
            }}

/>
            </label>
              </div>
              </div>
              <div className="flex flex-row flex-wrap w-full h-full">
              {selectedPairings.map((animal) => (
  <span
    key={animal.animal_id}
    onClick={() =>{ handleParingsSelect(animal)}}
    className="bg-sky-100 px-2 py-1 mx-[2px] mb-2 border border-slate-300 rounded hover:cursor-pointer hover:bg-sky-200 hover:transition-colors duration-200"
  >
    {animal.animal_name}
  </span>
))}

      </div>
      <div  className='w-full flex items-center justify-center my-1'>
              <input
              type="text"
              className={addPairings ? "block rounded rounded-b-none shadow-sm w-full px-2 py-1 hover:bg-gray-50 border border-b-0 focus:bg-white transition-colors duration-200 hover:border-gray-200 focus:outline-none" : "hidden"}
              placeholder={
                animalType === 'Crested Gecko'
                  ? 'Search to add Pairings for your Crested Gecko...'
                  : 'Search to add Pairings for your Ball Python...'
              }
              value={animalSearchTerm}
              onChange={(e)=>handleAnimalSearchChange(e)}
            />


            </div>
            
            <div className="flex flex-col bg-zinc-200 overflow-y-scroll h-full min-h-5vh w-[100%] mt-2">
            {animalSearchTerm.length > 0 && animalSearchResults.map((animal) => (
  <div 
    key={animal.animal_id} 
    className={`cursor-pointer p-1 ${selectedPairings.some(selectedAnimal => selectedAnimal.animal_id === animal.animal_id) ? "bg-sky-100 m-[2px] border border-slate-300 rounded hover:bg-sky-50" : " bg-zinc-50 m-[2px] border rounded hover:bg-white"}`}
    onClick={() => {handleParingsSelect(animal)}}
  >
  {animal.animal_name}
  </div>
))}

  </div>
            </div>
      
       
            
            
  <div className="w-full bg-gray-100 rounded shadow p-1 mt-2">
              <div className='w-full flex flex-row items-center'>
              <span className='tracking-tight p-1 w-full'>
                Children:
              </span>
              <div className='w-full flex justify-end'>
              <label className="inline-flex items-center font-semibold text-sm tracking-tight">
          Add Offspring?
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 ml-1 text-sky-600"
            value={addOffspring}
           
            onChange={(e) => {
              setAddOffspring(!addOffspring)
              setOffspringSearchTerm("")
              handleFetchAnimals()
              
            }}

/>
            </label>
              </div>
              </div>
              <div className="flex flex-row flex-wrap w-full h-full">
              {selectedOffspring.map((animal) => (
  <span
    key={animal.animal_id}
    onClick={() =>{ handleOffspringSelect(animal)}}
    className="bg-sky-100 px-2 py-1 mx-[2px] mb-2 border border-slate-300 rounded hover:cursor-pointer hover:bg-sky-200 hover:transition-colors duration-200"
  >
    {animal.animal_name}
  </span>
))}

      </div>
      <div  className='w-full flex items-center justify-center my-1'>
              <input
              type="text"
              className={addOffspring ? "block rounded rounded-b-none shadow-sm w-full px-2 py-1 hover:bg-gray-50 border border-b-0 focus:bg-white transition-colors duration-200 hover:border-gray-200 focus:outline-none" : "hidden"}
              placeholder={
                animalType === 'Crested Gecko'
                  ? 'Search to add Offspring for your Crested Gecko...'
                  : 'Search to add Offspring for your Ball Python...'
              }
              value={offspringSearchTerm}
              onChange={(e)=>handleOffspringSearchChange(e)}
            />


            </div>
            <div className="flex flex-col bg-zinc-200 overflow-y-scroll h-full min-h-5vh w-[100%] mt-2">
            {offspringSearchTerm.length > 0 && offspringSearchResults.map((animal) => (
  <div 
    key={animal.animal_id+ "offspring"} 
    className={`cursor-pointer p-1 ${selectedOffspring.some(selectedAnimal => selectedAnimal.animal_id === animal.animal_id) ? "bg-sky-100 m-[2px] border border-slate-300 rounded hover:bg-sky-50" : " bg-zinc-50 m-[2px] border rounded hover:bg-white"}`}
    onClick={() => {handleOffspringSelect(animal)}}
  >
  {animal.animal_name}
  </div>
))}

  </div>
            </div>
  
 
</div>
          </div>
          <div className=" w-full h-[40vh] flex flex-col items-center bg-zinc-100">
                    <div className={"w-[50%] h-full flex justify-center items-center"}>
                    { animal.animal_photo_url ? <Image src={animal.animal_photo_url ? animal.animal_photo_url : ""} alt="listing photo" width={200} height={200} className={"w-[100%] h-[100%] object-cover object-center"} /> :<BsCameraFill className={"w-[20vw] h-[20vh] text-zinc-300 hover:cursor-pointer"} onClick={(e)=> handleImageSelect(e)}/>}
                    </div>
                </div>
          <div className="w-[90%]">
                    <div className="text-sm  tracking-tight my-2">
                        <span className="font-bold text-xs">
                        {"Status: "}
                        </span>
                        <span className={"text-sm underline"}>{postingImage ==  "none" ? "Please select a photo by clicking the camera above." : postingImage=="uploading" ? "Uploading..." : "Photo has been selected. Please note this is just a preview. "}</span>
                        {postingImage == "uploaded" ? 
                        <button
                        onClick={(e)=> {

                            handleImageSelect(e)
                        }}
                         className="font-bold tracking-tight">
                            (click here to change selection.)
                        </button> : <></> }
                    </div>
                    
                    <input
                    type="file"
                    id="file_input"
                    onChange={(e)=> {
                        if(e.target.files?.[0]){
                            setPostingImage("uploading")
                        formData.append("file", e.target.files[0])
                        handleImageUpload(e)
                        }
                    }
                        
                     
                 }
                    
                    className={"hidden"}

                    />
                </div>
          <button type="submit"  className="block w-full mt-4 p-2 text-white bg-blue-500 rounded" >Save</button>
        </form>  
      }
      </Modal>
    </div>
  );
}

export default EditAnimalForm;
