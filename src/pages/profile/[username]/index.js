import Layout from '@/components/Layout/Layout'
import s from './UserProfilePage.module.css'
import { useSessionData } from '@/hooks/useSessionData'
import Sidebar from '@/components/Sidebar/Sidebar';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useRouter } from 'next/router';
import DashboardAnimalsComponent from '@/components/DashboardAnimalsComponent/DashboardAnimalsComponent';
import MobileBar from '@/components/MobileBar/MobileBar';

export default function UserProfilePage() {
    const router = useRouter();
    const {username} = router.query;
    let session={}

    const {data, status} = useSessionData();
    if(status === "loading") return <></>
    if(status === "error") return <></>
   
  return (
    <Layout session={data.session}>
        <div className={s.container}>
            <div className={s.sidebar}>
                <Sidebar />
            </div>
            <div className={s.content}>
                <div className={s.topcontainer}>
                    <ProfileCard username={username}/>
                </div>
                <div className={s.bottomcontainer}>
                    
                </div>
            </div>
        </div>
        <div className='md:hidden fixed  w-full flex flex-col justify-end bottom-0 '>
        <MobileBar />
        </div>
    </Layout>
  )
}