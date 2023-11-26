import React from 'react'
import s from "./EditProfileComponent.module.css"
import { useUserInfo } from '@/hooks/useUserInfo'
import EditProfileCard from '../EditProfileCard/EditProfileCard'
import EditProfileForm from '../EditProfileForm/EditProfileForm'
import Link from 'next/link'

export default function EditProfileComponent({session}) {

    const {data, status} = useUserInfo(session.user.id)

    if(status === "loading"){
        return <div>Loading...</div>
    }
    if(status === "error"){
        return <div>Error...</div>
    }
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>
          <div className={s.link}>
            <Link href='/profile' >
            Back to profile.
            </Link>
          </div>
                    <EditProfileCard userId={session.user.id} user={data[0]}/>
                    <EditProfileForm userId={session.user.id} user={data[0]}/>
        </div>
    </div>
  )
}
