import { useEffect, useMemo, useRef, useState } from "react";
import { useUserAnimalData } from "@/hooks/useUserAnimals";
import Loader from "../Loader/Loader";
import s from "./DashboardAnimalsComponent.module.css";
import AnimalCard from "../AnimalCard/AnimalCard";
import { supabase } from "@/lib/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import AuthAnimalCard from "../AuthAnimalCard/AuthAnimalCard";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

const DropdownItem = ({ children, onClick }) => (
  <div className={s.dropdownItem}>
    <button onClick={onClick} className={s.dropdownButton}>
      {children}
    </button>
  </div>
);

export default function DashboardAnimalsComponent({ session }) {
  const [animalType, setAnimalType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [actionState, setActionState] = useState(null);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [action, setAction] = useState(null);
  const [actionItems, setActionItems] = useState(null);
  const { data, status } = useUserAnimalData(session.user.id);

  const dropdownRef = useRef();
  const queryClient = useQueryClient()
  
  const filteredAnimals = useMemo(() => {
    let result = data;

    if(animalType !== "all"){
      result = result.filter(animal => animal.animal_type === animalType);
    }

    if(searchTerm !== ""){
      result = result.filter(animal => animal.animal_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return result;
  }, [data, animalType, searchTerm]);

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const handleSelectAnimal = (animal_id) => {
    console.log("test")
    //check if the animal is already selected
    if(selectedAnimals.includes(animal_id)){
      //if it is, remove it from the array
      setSelectedAnimals(selectedAnimals.filter(animal => animal !== animal_id));
      
    } else {
      //if it isn't, add it to the array
  
      setSelectedAnimals([...selectedAnimals, animal_id]);
     
    }
    console.log(selectedAnimals)
  }

  const handleAction = (action) => {
    //set the action state to the selected action
    setActionState(action);
    //close the dropdown
    setDropdownOpen(false);
  }

 

  
 //create a function to create pairings and groups. Each pairings will have one female and one male
 const handleCreatePairings = async () => {
  try {
    // Extract males and females
    const males = selectedAnimals.filter(animal => animal.animal_gender === "Male");
    const females = selectedAnimals.filter(animal => animal.animal_gender === "Female");

    // Check if there are males and females selected
    if (males.length === 0 || females.length === 0) {
      alert("No males or females selected.");
      return;
    }

    // If there are multiple males selected, warn the user
    if (males.length > 1) {
      alert("Multiple males selected. Using the first one for pairing.");
    }

    const maleId = males[0].animal_id;

    // Create pairs with one male and multiple females
    const pairs = females.map(female => ({
      female_id: female.animal_id,
      male_id: maleId,
      user_id: session.user.id,
    }));

    // Insert pairs into the database
    const { error } = await supabase.from("pairings").insert(pairs);

    if (error) {
      throw error;
    }
    
    // Reset state
    setActionState(null);
    setSelectedAnimals([]);
  } catch (error) {
    console.error("Error creating pairings: ", error.message);
  }
};

  const handleDeleteAnimals = async () => {
    //delete all animals in the array
    console.log("yoooo")
    //create an array to hold the ids of the animals to delete
    const idsToDelete = [];
    //loop through the selected animals
    for(let i = 0; i < selectedAnimals.length; i++){
      //add the id to the array
      idsToDelete.push(selectedAnimals[i].animal_id);
    }
    //update the marked_for_deletion column to true, in both the photos and animals table, based on the animal_ids in the array
    const { data, error } = await supabase
    .from("animals")
    .update({ marked_for_deletion: true })
    .in("animal_id", idsToDelete);
    //delete the photos from the photos table
    const { data: photosData, error: photosError } = await supabase
    .from("photos")
    .update({ marked_for_deletion: true })
    .in("animal_id", idsToDelete);
  
    //if there is an error, log it
    if(error || photosError){
      console.log(error);
      console.log(photosError);
    }
    //if there is no error, log the data
    if(data || photosData){
      console.log(data);
      console.log(photosData);
    }
    //set the action state back to null
    setActionState(null);
    //clear the selected animals array
    setSelectedAnimals([]);
    //refetch the data
    queryClient.invalidateQueries(`${session.user.id}-animal-data`);
  }
  const actions = [{
    action:"Add",
    onClick: () => console.log("add")
  },
  {
    action:"Pair",
    onClick: () => setActionState("Pair"),
    onComplete:() => handleCreatePairings()
  },
  {
    action:"Delete",
    onClick: () => setActionState("Delete"),
    onComplete:() => handleDeleteAnimals()
},
];

  useEffect(() => {
    function handleClickOutside(event) {
      //add an additional check to see if the click was the dropdown button
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && event.target.id !== "dropdown-button") {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if(status === "loading"){
    return <Loader/>
  }

  if(status === "error"){
    return <div>error</div>
  }

  return (
    <div className={s.container}>
      <ConfirmDeleteModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} action={action} actionItems={actionItems}/>
      <div className={s.actionscontainer}>
        
        <div className={s.searchbar}>
          <input 
            className={s.searchinput} 
            type="text" 
            placeholder="Search Animals" 
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
        </div>
        <div className={s.moreActionContainer}>
    {actionState == null ? 
  <button id="dropdown-button" onClick={handleDropdown} className={s.actionButton}>
  More Actions
</button>
:
<button onClick={()=>{
  actions.find(action => action.action === actionState).onComplete();
}}>
  {actionState} Selected
</button>
  }
    <div ref={dropdownRef} id="dropdown" className={s.dropdownContainer}>
      <div id="dropdown-items" className={dropdownOpen ? s.dropdownItems : s.dropdownHidden}>
        {actions.map((action, i) => 
          <DropdownItem key={i} onClick={() => handleAction(action.action)}>
            {action.action}
          </DropdownItem>
        )}
      </div>
    </div>
  </div>
        <div className={s.actioncontainer}>
          <div className={s.filtercontainer}>
            <select 
              defaultValue={"all"} 
              className={s.filter} 
              onChange={(e)=>setAnimalType(e.target.value)}
            >
              <option  value="all">All</option>
              <option value="Crested Gecko">Crested Geckos</option>
              <option value="Ball Python">Ball Pythons</option>
            </select>
          </div>
        </div>
      </div>
      <div className={s.content}>
        {filteredAnimals.map((animal) => (
          <AuthAnimalCard
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            action={action}
            setAction={setAction}
            actionItems={actionItems}
            setActionItems={setActionItems}
            handleSelectAnimal={handleSelectAnimal}
            selectedAnimals={selectedAnimals}
            actionState={actionState}
            key={animal.animal_id} 
            animal={animal} 
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
