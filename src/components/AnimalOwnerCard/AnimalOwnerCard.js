import Image from 'next/image';
import s from './AnimalOwnerCard.module.css';
import Link from 'next/link';
import Loader from '../Loader/Loader';
import { useUserInfo } from '@/hooks/useUserInfo';

export default function AnimalOwnerCard({id}) {
    const { data, status } = useUserInfo(id);
    if(status === "loading") return <Loader/>
    if(status === "error") return <div>error</div>
    console.log(data)
  return (
    <div className={s.container}>
        <div className={s.content}>
            <div className={s.topcontainer}>
                <div className={s.imagecontainer}>
                    {data ? <Image className={s.image}  src={data[0].avatar_url} width={300} height={300} alt={`photo of ${data.username}`}/> : <></>}
                </div>
                <div className={s.textcontainer}>
                    <Link href={`/profile/${data[0].username}`} className={s.name}>
                        @{data[0].username}
                    </Link>
                    <span className={s.location}>
                       Sample, Location
                    </span>
                    
            </div>
            </div>
            <div className={s.biocontainer}>
                    <span className={s.bio}>
                        
                        {data[0].bio}
                    </span>
                    </div>
            <div className={s.bottomcontainer}>
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
            </div>
        
    </div>
</div>
  )
}
