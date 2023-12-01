import Image from 'next/image';
import s from './LandingInfo.module.css';

export default function LandingInfo() {
  return (
    <div className={s.container}>
        <div className={s.bigmessage}>
                <span className={s.message}>
                    Upload once. 
                </span>
                <span className={s.message}>
                    Then just link.
                </span>
                <span className={s.message}>
                    {"That's it!"}
                </span>
        </div>
        <div className={s.content}>
            <div className={s.textcontainer}>
                <span className={s.title}>No more hassle.</span>
                <p className={s.description}>
                    Providing lineage to your customers has never been easier.
                </p>
            </div>
            <div className={s.photocontainer}>
                
                <Image src={'https://utfs.io/f/cc7468db-0fff-4881-8fcc-4c0f59517479-2487m.png'} width={500} height={500} alt="a screenshot" className={s.photo}/>
            </div>
            
        </div>
    </div>
  )
}
