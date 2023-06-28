import { useEffect, useReducer, useState } from 'react';
import { getImageData, useS3Upload } from "next-s3-upload";
import Modal from 'react-modal';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image'
import {BsCameraFill} from "react-icons/bs"
import { supabase } from '@/lib/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';

export default function UploadAnimalForm({session}) {
  const [preview, setPreview] = useState()
  const [fileForPreview, setFileForPreview] = useState(null)
  const [uploadMethod, setUploadMethod] = useState("none")
    const [imageUrl, setImageUrl] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [animalName, setAnimalName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalGenes, setAnimalGenes] = useState([]);
  const [animalGender, setAnimalGender] = useState('unknown');
  const [imageSelected, setImageSelected] = useState("");
  const [holdFile, setHoldFile] = useState(null);
  const [postingImage, setPostingImage] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenes, setSelectedGenes] = useState([]);
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

const genesMap = {
  'Crested Gecko': crestedGenes,
  'Ball Python': snakeGenes,
  // add other animal types and their genes here
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
  const router = useRouter()
  const current = new Date();

  const handleGeneSelect = (gene) => {
    if (animalGenes.includes(gene)) {
      setAnimalGenes(animalGenes.filter((g) => g !== gene));
    } else {
      setAnimalGenes([...animalGenes, gene]);
    }
  };

  const queryClient = useQueryClient()
  
  const handleImageSelect = (e) => {
      e.stopPropagation()
      document.getElementById('file_input')?.click();
      
  }
  let inputs={
    animal_name:animalName,
    animal_type:animalType,  
    animal_owned_by_user_id:session.user.id,
    animal_gender:animalGender,
    animal_gene_traits:animalGenes,
    created_at:current,


  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const {data,error} = await supabase.from('animals').insert([inputs]).select()
      console.log(data)
      if(error){
        alert(error)
        console.log(error)
      }
      if(data[0]?.animal_id){
        let getS3ImageURL = await handleUploadToS3()
        if(getS3ImageURL){
          const uploadPhotoURLtoDatabase = await supabase.from('photos').insert([{user_id:data[0].animal_owned_by_user_id, animal_id:data[0].animal_id, img_url:getS3ImageURL}]).select()
          if(uploadPhotoURLtoDatabase && uploadPhotoURLtoDatabase.status == 201){
            alert("Successfully uploaded!")
            router.push(`/dashboard`)
        }
      }
    }
    } catch (err) {
      console.error(err.message)
    }
}

const handleImageChange = e => {
  const file = e.target.files[0];
  setFileForPreview(e.target.files[0]);
  previewFile(file);
};

const previewFile = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setPreview(reader.result);
  };
};

  let { uploadToS3, files } = useS3Upload();

  async function handleUploadToS3(){
    try {
    let { url } = await uploadToS3(fileForPreview);
    let { height, width } = await getImageData(fileForPreview);
    setWidth(width);
    setHeight(height);

    setImageUrl(url);
    
    console.log("Successfully uploaded to S3!", url);
    return url
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <form className='flex flex-row justify-center w-full h-full md:w-[90%] lg:w-[65%] xl:w-[55%]' onSubmit={handleSubmit}>
          <div className='flex flex-col items-center w-full'>
          <div className='w-full flex flex-row justify-evenly md:mb-2'>
          <label className="block w-[33%]  ">
            Animal Name:
            <input className="block w-full  bg-gray-100 rounded px-1 py-1 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0" type="text" value={animalName} onChange={(e) => setAnimalName(e.target.value)}  />
          </label>
          <label className="block w-[33%]  ">
            Animal Gender:
            <select className="block w-full  bg-gray-100 rounded px-1 pt-1 pb-2 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0"  value={animalGender} onChange={(e) => setAnimalGender(e.target.value)}  >
              <option value="Unknown">Unknown</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              </select>
          </label>
          <label className="block w-[33%] ">
            Animal Type:*
            <select className="block w-full  hover:cursor-pointer  bg-gray-100 rounded px-1 pt-1 pb-2 hover:bg-gray-50 focus:bg-white border-white border transition-colors duration-200 hover:border-gray-200 focus:outline-0" onChange={(e) => {
              setAnimalType(e.target.value)
              setAnimalGenes([])
              setSearchTerm("")
              setSearchResults([])
            }} required>
            <option  selected disabled hidden>Choose reptile</option>
              <option value="Crested Gecko">Crested Gecko</option>
              <option value="Ball Python">Ball Python</option>
            </select>
          </label>
          </div>
          <div className="w-full flex flex-col items-start min-h-[5vh] md:mb-4 mb-1 border rounded p-1">
  <label className="pl-1 pb-1">{animalGenes.length > 0 ? 'Selected genes:' : 'Select genes:'}</label>{animalGenes.length > 0 && (
    <div className="flex flex-row flex-wrap w-full">
      {animalGenes.map((gene) => (
        <span 
          key={gene}
          onClick={() => handleGeneSelect(gene)} 
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
        onClick={() => handleGeneSelect(gene)}
      >
        {gene}
      </div>
    ))}
  </div>
  
</div>


          <div className=" w-full h-[40vh] md:h-[50vh] flex flex-col items-center bg-zinc-100">
                    <div className={"w-[50%] h-full flex justify-center items-center"}>
                    
                    { preview ? <Image src={preview} alt="listing photo" width={width} height={height} className={"w-[100%] h-[100%] object-cover object-center"} /> : <BsCameraFill className={"w-[20vw] h-[20vh] text-zinc-300 hover:cursor-pointer"} onClick={(e)=> handleImageSelect(e)}/>}
                    </div>
                    <>{height}x{width}</>
                </div>
          <div className="w-[100%]">
          <div>
          {uploadMethod == "none" ?
          <div className="flex flex-row w-full justify-evenly">
            <button type='button' onClick={(e)=> {
              setUploadMethod("pre-uploaded")
            }}
            className="block w-[50%] mx-2 mt-4 p-2 border border-blue-500 text-white bg-blue-500 rounded" >
              Your photos
              </button>
              <button type='button' onClick={(e)=> {
              setUploadMethod("new-upload")
            }}
            className="block w-[50%] mx-2 mt-4 p-2 border border-blue-200 bg-blue-100 text-blue-600  rounded" >
              New photo
              </button>
          </div>
          : uploadMethod == "pre-uploaded" ?
          <div className='w-full flex flex-row justify-evenly'>
            <span>
            this is where the pre-uploaded photos will go
          </span>
          <button type='button' onClick={(e)=> {
              setUploadMethod("none")
            }}
            className="block w-[30%] mx-2  mt-2 p-2 border border-blue-300 text-blue-700 bg-blue-200 rounded" >
              Go Back
              </button>

          </div>
          : uploadMethod == "new-upload" ?
          <div className='w-full flex flex-row justify-evenly items-center'>
            <input type="file" name="image" onChange={handleImageChange} />
            <button type='button' onClick={(e)=> {
              setUploadMethod("none")
              setPreview(null)
            }}
            className="block w-[30%] mx-2  mt-2 p-2 border border-blue-300 text-blue-700 bg-blue-200 rounded" >
              Go Back
              </button>

          </div>
          : <></>
          }
        {files.map((file, index) => (
          <div key={index}>
            Upload progress: {file.progress}%
          </div>
        ))}
      </div>
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
                    onChange={
                        
                            handleUploadToS3
                        
                    }
                        
                     
                 
                    
                    className={"hidden"}

                    />
                </div>
          <button type="submit" className="block w-full mt-4 p-2 text-white bg-blue-500 rounded" >Submit</button>
          </div>
          
        </form>
  )
}
