import React, { useState } from 'react'
import s from './ProfileCard.module.css'
import { useProfileData } from '@/hooks/useProfileData'
import Loader from '../Loader/Loader'
import Image from 'next/image'
import Link from 'next/link'
import DashboardAnimalsComponent from '../DashboardAnimalsComponent/DashboardAnimalsComponent'
import ProfileAnimals from '../ProfileAnimals/ProfileAnimals'

export default function ProfileCard({username, session}) {
console.log(session)
  let userData = {}
  const [isUser, setIsUser] = useState(false)
  const {data, status} = useProfileData(username)
  if(status === "loading") return <Loader/>
  if(status === "error") return <>error</>
  console.log(data)
  if(status === "success"){
    userData.user = {}
    userData.user.id = data[0].id
  }
  const handleIsUser = () => {
    if(session?.user?.id === data[0].id){
      return true
    }

    return false
  }
  return (
    <div className={s.container}>
    <div className={s.bannercontainer}>
      <Image className={s.banner} src={"https://res.cloudinary.com/repdb/image/upload/v1628106005/a92e26db0c422c38436dacfd1aacfad7_zhbvez.png"} alt="banner" layout="fill" />
    </div>
    <div className={s.content}>
      <div className={s.topcontainer}>
        <div className={s.imagecontainer}>
          <Image className={s.image} src={data[0].avatar_url} alt="profile picture" fill style={{objectPosition:'center', objectFit:'cover'}} />
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
        <div className={s.bio}>{data[0].bio}</div>
      </div>
    </div>
    <div className={s.animalscontainer}>
      <ProfileAnimals id={data[0].id}/>
    </div>
  </div>
  
  )
}
