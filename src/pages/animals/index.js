import React, { useState } from 'react'
import s from "./MyAnimalsPage.module.css"
import { useSessionData } from '@/hooks/useSessionData'
import Layout from '@/components/Layout/Layout'
import DashboardSidebar from '@/components/DashboardSidebar/DashboardSidebar'
import DashboardAnimalsComponent from '@/components/DashboardAnimalsComponent/DashboardAnimalsComponent'
import Sidebar from '@/components/Sidebar/Sidebar'
export default function MyAnimalsPage() {
 
    const [search, setSearch] = useState("")
    const {data, status} = useSessionData()

    if (status === 'loading') return <div>Loading...</div>
    if (status === 'error') return <div>Error</div>

  return (
    <Layout session={data.session}>
        <div className={s.container}>
            <div className={s.sidebar}>
                <Sidebar/>
            </div>
            <div className={s.content}>
            
                <DashboardAnimalsComponent  session={data.session} />
            </div>
        </div>
    </Layout>
  )
}
