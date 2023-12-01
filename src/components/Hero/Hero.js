import Image from 'next/image';
import s from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className={s.container}>
        <div className={s.content}>
        <span className={s.text}>
            The easiest way to create and share reptile lineages.
        </span>
        <div className={s.buttonscontainer}>
        <Link href="/login" className={s.signin}>
        Sign in
        </Link>
        <Link href="/login"  className={s.signup}>
        Sign up
        </Link>
        </div>
        
        </div>
        <div className={s.photocontainer}>
            <Image src={'https://utfs.io/f/d9542620-3a8f-46ec-a95a-5b64dd4b36e0-2ivgzg.png'} alt="photo of a snake" fill style={{objectFit:'cover', objectPosition:'center'}} />
        </div>
    </div>
  )
}
