import s from "./DashboardAnimals.module.css"
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import AnimalCard from "../AnimalCard/AnimalCard";
import AnimalFormModal from "../AnimalFormModal/AnimalFormModal";

const DashboardAnimals = ({session}) => {
  const [animals, setAnimals] = useState([]);
  const [isDragActive, setDragActive] = useState(false);
  // Fetch initial data on component mount
 console.log(session)

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET'); 

      
      axios.post('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', formData)
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url // we get the secure_url from cloudinary response
          console.log(fileURL);
        })
        .catch((err) => console.error(err));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  });
  if(!session){
  return <></>
  }
  return (
    <div {...getRootProps()} className={`p-6 border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}>
      <input {...getInputProps()} />
      <p className='text-center text-gray-500'>Drag and drop some files here, or click to select files</p>
      <ul className='grid lg:grid-cols-3 grid-cols-2 gap-1'>
        <AnimalCard onClick={(e)=>{e.stopPropagation()
        console.log("I was clicked")}}/>
        <AnimalCard onClick={(e)=>{e.stopPropagation()}} />
        <AnimalCard onClick={(e)=>{e.stopPropagation()}}/>
        <AnimalCard onClick={(e)=>{e.stopPropagation()}}/>
      </ul>
      
    </div>
  );
};

export default DashboardAnimals;
