import Layout from '@/components/Layout/Layout'
import s from './UserProfilePage.module.css'
import { useSessionData } from '@/hooks/useSessionData'
import Sidebar from '@/components/Sidebar/Sidebar';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useRouter } from 'next/router';
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
        
            <div className={s.content}>
                <div className={s.topcontainer}>
                    <ProfileCard session={data.session} username={username}/>
                </div>
                
            </div>
        
        <div className='md:hidden fixed  w-full flex flex-col justify-end bottom-0 '>
        <MobileBar />
        </div>
    </Layout>
  )
}
