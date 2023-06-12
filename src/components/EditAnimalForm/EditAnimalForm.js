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
  console.log(animal)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalGender, setAnimalGender] = useState('unknown');
  const [imageSelected, setImageSelected] = useState("");
  const [postingImage, setPostingImage] = useState("none");
  const [imageUrl, setImageUrl] = useState(null);
  
  useEffect(() => {
    if (testState) {
      openModal();
    }
  }, [testState]);


  const router = useRouter()

  console.log(session)

  const current = new Date();

  
  let inputs={
    animal_name:animalName,
    animal_type:animalType,  
    animal_added_by_user_id:session,
    animal_owned_by_user_id:session,
    animal_photo_url:imageUrl,
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
      const {data,error} = await supabase.from('animals').insert([inputs])
      console.log(data)
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
if(!animal){
  return <>error</>
}
  return (
    <div onClick={e=>e.stopPropagation()} >
     
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Animal Form"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg h-90% md:w-[50%] w-[80%]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
       
      >
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
          <div className='w-full flex flex-row justify-evenly'>
          <label className="block mb-2 w-[50%] mx-1">
            Animal Name:
            <input className="block w-full mt-1 bg-gray-100 rounded px-1 py-1 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0" type="text" value={animal.animal_name} onChange={(e) => setAnimalName(e.target.value)} required />
          </label>

          <label className="block mb-2 w-[50%] mx-1">
            Animal Type:
            <select className="block w-full mt-1 hover:cursor-pointer  bg-gray-100 rounded px-1 py-1 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0" onChange={(e) => setAnimalType(e.target.value)} value={animal.animal_type} required>
            <option  selected disabled hidden>Choose reptile</option>
              <option value="Crested Gecko">Crested Gecko</option>
              <option value="Ball Python">Ball Python</option>
            </select>
          </label>
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
                    <div className={"w-full  flex justify-center"}>
                        <button type="submit" onClick={()=> {console.log("test")}} disabled={postingImage == "uploaded" ? "w-full py-4 rounded  font-bold text-zinc-200 transition-colors duration-200  bg-[#8e3551]" : " w-full py-4 rounded  font-bold text-zinc-200  bg-[#8d767d]"}>
                            Create
                        </button>
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
          <button type="submit" className="block w-full mt-4 p-2 text-white bg-blue-500 rounded" >Submit</button>
        </form>
      </Modal>
    </div>
  );
}

export default EditAnimalForm;
