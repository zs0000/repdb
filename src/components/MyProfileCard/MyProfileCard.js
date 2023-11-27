import React from 'react'
import s from './MyProfileCard.module.css'
import { useMyProfileData } from '@/hooks/useMyProfileData'
import Loader from '../Loader/Loader'
import Image from 'next/image'
import Link from 'next/link'
import DashboardAnimalsComponent from '../DashboardAnimalsComponent/DashboardAnimalsComponent'

export default function MyProfileCard({id}) {
  console.log(id)
  let userData = {}
  const {data, status} = useMyProfileData(id)

  if(status === "loading") return <Loader/>
  if(status === "error") return <>error</>
  if(status === "success"){
    userData.user = {}
    userData.user.id = data[0].id
  }
 
  return (
    <div className={s.container}>
    <div className={s.bannercontainer}>
      <Image className={s.banner} src={"https://res.cloudinary.com/repdb/image/upload/v1628106005/a92e26db0c422c38436dacfd1aacfad7_zhbvez.png"} alt="banner" layout="fill" />
    </div>
    <div className={s.content}>
      <div className={s.topcontainer}>
        <div className={s.imagecontainer}>
          <Image className={s.image} src={data[0].avatar_url} alt="profile picture" width={200} height={200} />
        </div>
        <div className={s.namecontainer}>
          <div className={s.name}>{data[0].full_name}</div>
          <div className={s.username}>@{data[0].username}</div>
        </div>
        <div className={s.itemscontainer}>
        <div className={s.itemcontainer}>
                    <Link rel='no-follow' className={s.item} href='https://instagram.com/'>
                        Instagram
                    </Link>
                </div>
                <div className={s.itemcontainer}>
                    <Link rel='no-follow' className={s.item} href='https://facebook.com/'>
                        Facebook
                    </Link>
                </div>
                <div className={s.itemcontainer}>
                    <Link rel='no-follow' className={s.item} href='https://twitter.com/'>
                        Personal Website
                    </Link>
                </div>
                <div className={s.itemcontainer}>
                    <Link rel='no-follow' className={s.item} href="https://morphmarket.com/">
                        MorphMarket
                    </Link>
                </div>
                <div className={s.edititemcontainer}>
                    <Link rel='no-follow' className={s.edititem} href="/edit/profile">
                        Edit Profile
                    </Link>
                </div>
        </div>
      </div>
      <div className={s.bottomcontainer}>
        <div className={s.bio}>{data[0].bio}</div>
      </div>
    </div>
    <div className={s.animalscontainer}>
      <DashboardAnimalsComponent session={userData}/>
    </div>
  </div>
  
  )
}
