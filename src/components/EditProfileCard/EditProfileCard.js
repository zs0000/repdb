import React, { useRef, useState } from 'react'
import s from './EditProfileCard.module.css'
import Image from 'next/image'
import { getImageData, useS3Upload } from "next-s3-upload";
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { UploadButton } from '@/utils/uploadthing';
export default function EditProfileCard({user,userId}) {
  const router = useRouter()
  const [imageUrl, setImageUrl] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [fileForPreview, setFileForPreview] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  


  
const handleImageChange = e => {
  const file = e.target.files[0];
  if (!file) return;
  setFileForPreview(e.target.files[0]);
  console.log(file)
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
    console.log(url, height, width)
    return url

    } catch (err) {
      console.error(err.message)
    }
    
  }

  const handleButtonClick =()=> {
    document.getElementById('upload_input').click();
  }

  const handleSaveProfilePicture = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      let uplObj={
        avatar_url: preview,
      }

      if(preview === null || preview === undefined){
        alert('something went wrong, please refresh the page and try again.')
      }
      if(uplObj.avatar_url === "" || uplObj.avatar_url === null || uplObj.avatar_url === undefined){
      return alert('Please upload a profile picture')
      }
      
      
      const { data, error, status } = await supabase.from('profiles')
        .update(uplObj)
        .eq('id', userId)
        .select();

      if (error) {
        console.log(error)
        throw new Error(error.message);
      }
      if(data){
        alert('Profile picture updated successfully');
        router.push('/dashboard')
      }
   
         
    } catch (error) {
      setError(error.message);
    }
    finally {
      setIsLoading(false);
     
    }
  };
  return (
    <div className={s.container}>
        <div className={s.content}>
        <div className={s.photocontainer}>
        <Image 
          alt='Users photo' 
          src={preview ? preview : user.avatar_url} 
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
          className={s.photo} 
        />
      </div>
      <div className={s.inputcontainer}>
        {preview ? <button onClick={(e)=>handleSaveProfilePicture(e)}>Save profile picture</button> : <UploadButton endpoint="imageUploader"
        onClientUploadComplete={(res) =>{
          setPreview(res[0].url)
        }}/>
      }
      </div>
        <div className={s.infocontainer}>
          <div className={s.name}>
            {user.full_name ? user.full_name : "No name added."}
          </div>
          <div className={s.username}>
            @{user.username}
          </div>
          <div className={s.bio}>
            <span className={s.biotext}>
            {user.bio}
            </span>
          </div>
        </div>
        </div>
    </div>
  )
}
