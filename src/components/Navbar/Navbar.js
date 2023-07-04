import Link from "next/link"
import s from "./Navbar.module.css"
import SignInModal from "../SignInModal/SignInModal"
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar({session}) {
    const [isOpen, setIsOpen] = useState(false);
    const signInRef = useRef(null);
    const router = useRouter();
    const handleSignInOpen = () => {
      if (isOpen){
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }
    //Create an onClick function that closes the modal is the svg is clicked
    const handleClickSvg = (e) => {
        setIsOpen(false)
    }
   
  return (
    <div className={s.container}>
        
        <div className={s.leftcontainer}>
            <Link href='/'>
                <img className={s.logo} src="/logo.png" alt="logo" />
            </Link>
        </div>
        <div className={s.middlecontainer}>

        </div>
        <div className={s.rightcontainer}>
            {session ? <div className={s.signedincontainer}>
              <Link href='/dashboard'>Dashboard</Link>
            </div> : <div className={s.signincontainer}>
            {isOpen === false ? <button className={s.button} onClick={()=> setIsOpen(true)}>Sign in</button> : <div className={s.signinopen}><svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      className={s.svg}
        onClick={handleClickSvg}
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M15.707 4.293a1 1 0 010 1.414L9.414 12l6.293 6.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg><SignInModal onClick={handleSignInOpen} /></div>}
            </div>}
            {}
                {isOpen === false ? <button className={session ? "hidden":s.button} onClick={()=> setIsOpen(true)}>Sign up</button> : <></>}
      
        </div>
    </div>
  )
}
