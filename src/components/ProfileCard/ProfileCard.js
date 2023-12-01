import React, { useState } from 'react'
import s from './ProfileCard.module.css'
import { useProfileData } from '@/hooks/useProfileData'
import Loader from '../Loader/Loader'
import Image from 'next/image'
import Link from 'next/link'

import ProfileAnimals from '../ProfileAnimals/ProfileAnimals'

export default function ProfileCard({username, session}) {

  const {data, status} = useProfileData(username)
  if(status === "loading") return <Loader/>
  if(status === "error") return <>error</>
  if(data.length === 0) {
    
    return(
    <div className={s.container}>
      Ooops. Nothing here
  </div>
  )}
  
  return (
    <div className={s.container}>
    <div className={s.bannercontainer}>
      <Image className={s.banner} src={"https://utfs.io/f/0314cb10-b034-43f7-9eee-910d43b2bf4d-fxr4f5.svg"} alt="banner" layout="fill" />
    </div>
    <div className={s.content}>
      <div className={s.topcontainer}>
        <div className={s.imagecontainer}>
        <Image className={s.image} src={data[0].avatar_url ===null ? "https://utfs.io/f/e44ab1a3-4f58-4d15-84f9-efd0defb385f-a4drjd.jpg" : data[0].avatar_url} alt="profile picture" fill style={{objectPosition:'center', objectFit:'cover'}} />
        </div>
        <div className={s.namecontainer}>
          <div className={s.name}>{data[0].full_name}</div>
          <div className={s.username}>@{data[0].username}</div>
        </div>
        
      </div>
      {session?.user?.id === data[0].id ? 
      <div className={s.buttoncontainer}>
      <Link className={s.button} href="/edit/profile">
      Edit Profile
      </Link>
    </div>
    : <></>}
      <div className={s.bottomcontainer}>
        <div className={s.bio}>{data[0].bio.length ===0 ? "This user has not set their bio yet." : data[0].bio}</div>
      </div>
    </div>
    <div className={s.animalscontainer}>
      <ProfileAnimals id={data[0].id}/>
    </div>
  </div>
  
  )
}
