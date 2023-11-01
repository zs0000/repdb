import { useCallback, useEffect, useState } from 'react';
import { getImageData, useS3Upload } from "next-s3-upload";
import getCroppedImg from '@/utils/cropImage'
import { useRouter } from 'next/router';
import Image from 'next/image'
import {BsCameraFill} from "react-icons/bs"
import { supabase } from '@/lib/supabaseClient';
import { useQueryClient } from '@tanstack/react-query';
import Cropper from 'react-easy-crop';

export default function UploadAnimalForm({session}) {
  {/*States: Upload & Crop Image */}
  const [preview, setPreview] = useState()
  const [fileForPreview, setFileForPreview] = useState(null)
  const [croppingImage, setCroppingImage] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadMethod, setUploadMethod] = useState("none")
  const [usePreuploaded, setUsePreuploaded] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  {/*States: Animal Form Values */}
  const [formCanSubmit, setFormCanSubmit] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(0);
  const [animalName, setAnimalName] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [animalGenes, setAnimalGenes] = useState([]);
  const [animalGender, setAnimalGender] = useState('Unknown');
  const [postingImage, setPostingImage] = useState("none");
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

const genesMap = {
  'Crested Gecko': crestedGenes,
  'Ball Python': snakeGenes,
  // add other animal types and their genes here
};

const router = useRouter()
const current = new Date();

{/*Functions: Search, Filter, and Select genes*/}
const handleSearchChange = async(e) => {
  const newSearchTerm = e.target.value;
  setSearchTerm(newSearchTerm);

  const genes = genesMap[animalType] || [];
  const newSearchResults = genes.filter((gene) =>
    gene.toLowerCase().includes(newSearchTerm.toLowerCase())
  );

  setSearchResults(newSearchResults);
};


  const handleGeneSelect = (gene) => {
    if (animalGenes.includes(gene)) {
      setAnimalGenes(animalGenes.filter((g) => g !== gene));
    } else {
      setAnimalGenes([...animalGenes, gene]);
    }
  };

{/*Functions: Image Select, Crop, Upload*/}
const handleImageSelect = (e) => {
  e.stopPropagation()
  document.getElementById('file_input')?.click(); 
}
const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  setCroppedAreaPixels(croppedAreaPixels)
}, [])

const showCroppedImage = useCallback(async () => {
  try {
    const croppedImage = await getCroppedImg(
      preview,
      croppedAreaPixels,
      rotation
    )
    console.log('donee', { croppedImage })
    
    const file = await fetch(croppedImage).then(r => r.blob())
    //convert the blob file to a file object
    file.name = fileForPreview.name
    file.lastModified = fileForPreview.lastModified
    file.lastModifiedDate = fileForPreview.lastModifiedDate
    file.webkitRelativePath = fileForPreview.webkitRelativePath

    console.log(file)
    setFileForPreview(file)
    setCroppedImage(croppedImage)
   
  } catch (e) {
    console.error(e)
  }
}, [croppedAreaPixels, rotation, preview])

const onClose = useCallback(() => {
  setCroppedImage(null)
}, [])

const handleHideUploadControls = (e) => {
  e.stopPropagation()
  document.getElementById('upload-controls')?.classList.add('hidden')
}


const handleImageChange = e => {
  
  const file = e.target.files[0];
  setFileForPreview(e.target.files[0]);
  console.log(file)
  previewFile(file);
};

const previewFile = (file) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setPreview(reader.result);
      setCroppingImage(true)
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
  
{/*Functions:Form Submission, Image upload first, then database*/}

const checkFormCanSubmit = () => {
  if (
    animalName.length > 0 &&
    animalType.length > 0 &&
    animalGender.length > 0 &&
    croppedImage || usePreuploaded
  ) {
    setFormCanSubmit(true);
  } else {
    setFormCanSubmit(false);
  }
};

//useEffect to check if form can submit on every change
useEffect(() => {
  checkFormCanSubmit();
}, [animalName, animalType, animalGenes, animalGender, croppedImage]); // dependencies
  

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if(formCanSubmit){
        setFormSubmitted(formSubmitted + 1)
        let inputs={
          animal_name:animalName,
          animal_type:animalType,  
          animal_owned_by_user_id:session.user.id,
          animal_gender:animalGender,
          animal_gene_traits:animalGenes,
          created_at:current,
        }

        if(animalGenes.length == 0){
          inputs.animal_gene_traits = ["None"]
        }
        
        const {data,error} = await supabase.from('animals').insert([inputs]).select()
        console.log(data)
        if(error){
          alert(error)
          console.log(error)
        }
        if(data[0]?.animal_id){
          let getS3ImageURL = await handleUploadToS3()
          if(getS3ImageURL){
            setPostingImage("uploading")
            const uploadPhotoURLtoDatabase = await supabase.from('photos').insert([{user_id:data[0].animal_owned_by_user_id, animal_id:data[0].animal_id, img_url:getS3ImageURL}]).select()
            if(uploadPhotoURLtoDatabase && uploadPhotoURLtoDatabase.status == 201){
              setPostingImage("uploaded")
              alert("Successfully uploaded!")
              router.push(`/dashboard`)
          }
        }
      }
      } else{
        alert("Please fill out all required fields.")
      }
    } catch (err) {
      console.error(err.message)
    }
}
  return (
    <form className='flex flex-row justify-center w-full h-full ' onSubmit={handleSubmit}>
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
                    <div className={"w-full h-full flex justify-center items-center"}>
                    
                    { preview ?
                    croppedImage ? 
                    <Image src={croppedImage} alt="listing photo" width={500} height={500} className={"w-[100%] h-[100%] object-cover object-center"} />
                    :
                    <div className="relative w-full h-full">
                      <Cropper
                    image={preview || ''}
                    crop={crop}
                    zoom={zoom}
                    aspect={4/3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                    </div>
                     : <BsCameraFill className={"w-[20vw] h-[20vh] text-gray-300 "} />}
                    </div>
                    <span>
                      {height == 0 && width == 0 ? "" : `${width} x ${height}`}
                    </span>
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
          <div id='upload-controls' className='w-full flex flex-col justify-evenly items-center'>
            {croppingImage ? 
            <div className='w-full py-1 flex flex-row justify-evenly'>
            <button type="button" onClick={(e)=>{
              setCroppingImage(false)
              showCroppedImage()
              handleHideUploadControls(e)
             
            }} className='w-full py-1 bg-gray-100'>
              Confirm Crop
            </button>
          </div>
          :
          <></>}
          <div className='w-full flex flex-row justify-evenly items-center'>
            
            <input type="file" name="image" onChange={handleImageChange} />
            <button type='button' onClick={(e)=> {
              setUploadMethod("none")
              setPreview(null)
              setCroppingImage(false)
            }}
            className="block w-[30%] mx-2  mt-2 p-2 border border-blue-300 text-blue-700 bg-blue-200 rounded" >
              Go Back
              </button>

          </div>
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
                        <span className={"text-sm underline"}>{postingImage ==  "none" ? "Please finish filling out the form, then click submit." : postingImage=="uploading" ? "Uploading Image..." : "Image Uploaded "}</span>
                        
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
          <button type="submit" disabled={formSubmitted == 0 || !formCanSubmit ? false : true} className={formCanSubmit ? "block w-full mt-4 p-2 text-white bg-blue-500 rounded" : "block w-full mt-4 p-2 text-white bg-gray-500 rounded"} >Submit</button>
          </div>
          
        </form>
  )
}
