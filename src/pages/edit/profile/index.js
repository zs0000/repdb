import React from 'react'
import s from "./EdtiProfilePage.module.css"
import Sidebar from '@/components/Sidebar/Sidebar'
import EditProfileComponent from '@/components/EditProfileComponent/EditProfileComponent'
import { useRouter } from 'next/router'

import { useSessionData } from '@/hooks/useSessionData'
import Layout from '@/components/Layout/Layout'
export default function EditProfilePage() {
  const router = useRouter()

  const {data, status} = useSessionData()
  if(status === "loading") return <div>Loading...</div>
  if(status === "error") return <div>Error...</div>
  if(data === undefined) {
    router.push('/login')
    return(
     <div>Undefined...</div>
    )
  }

  return (
    <Layout session={data.session}>
      <div className={s.container}>
        <div className={s.sidebar}>
            <Sidebar/>
        </div>
        <div className={s.content}>
                <EditProfileComponent session={data.session}/>
        </div>
    </div>
    </Layout>
  )
}
