import s from "./DashboardAnimals.module.css"
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const DashboardAnimals = () => {
  const [animals, setAnimals] = useState([]);

  // Fetch initial data on component mount
 

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET'); // replace with your upload preset

      // replace 'your-cloud-name' with your cloud name
      axios.post('https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', formData)
        .then((response) => {
          const data = response.data;
          const fileURL = data.secure_url // we get the secure_url from cloudinary response
          console.log(fileURL);
        })
        .catch((err) => console.error(err));
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag and drop some files here, or click to select files</p>
      <ul>
        {animals.map((animal, index) => (
          <li key={index}>{animal}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardAnimals;
