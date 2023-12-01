import React, { useRef, useState } from 'react'
import s from './EditProfileCard.module.css'
import Image from 'next/image'

import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import { UploadButton } from '@/utils/uploadthing';
export default function EditProfileCard({user,userId, username}) {
  const router = useRouter()
  const [preview, setPreview] = useState(null)

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
        router.push(`/profile/${username}`)
      }
   
         
    } catch (error) {
      alert(error.message);
    }
    finally {
      setIsLoading(false);
     
    }
  };
  return (
    <div className={s.container}>
        <div className={s.content}>
        <div className={s.photocontainer}>
        {user.avatar_url ==="" ? 
        <Image 
          alt='Users photo' 
          src="https://utfs.io/f/1f182e2a-3d7a-4a54-a6d8-303720dd82c5-yc0glm.jpg" 
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
          className={s.photo}
          />
        :
        <Image 
          alt='Users photo' 
          src={preview ? preview : user.avatar_url} 
          fill 
          style={{ objectFit: 'cover', objectPosition: 'center' }} 
          className={s.photo} 
        />  
      }
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
            {bio ==="" ? "No bio added." : bio}
            </span>
          </div>
        </div>
        </div>
    </div>
  )
}
