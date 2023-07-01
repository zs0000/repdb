import Link from 'next/link';
import s from './DashboardSidebar.module.css';
import Image from 'next/image';


export default function DashboardSidebar() {
  return (
    <div className={s.container}>
            <div className={s.topcontainer}>
            <svg className='w-24 h-24 rounded-lg mb-2 flex justify-center items-center'
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      fill="none"
      viewBox="0 0 100 100"
    >
      <mask id="viewboxMask">
        <rect width="100" height="100" fill="#fff" rx="0" ry="0"></rect>
      </mask>
      <g mask="url(#viewboxMask)">
        <path fill="#f88c49" d="M0 0H100V100H0z"></path>
        <path
          fill="#0a5b83"
          d="M95 53.33C95 29.4 74.85 10 50 10S5 29.4 5 53.33V140h90V53.33z"
          transform="rotate(12 31.471 76.757)"
        ></path>
        <path
          fill="#fff"
          d="M13 8c0 1.66-1.12 3-2.5 3S8 9.66 8 8s1.12-3 2.5-3S13 6.34 13 8zm21 0c0 1.66-1.12 3-2.5 3S29 9.66 29 8s1.12-3 2.5-3S34 6.34 34 8z"
          transform="rotate(12 31.471 76.757) translate(29 33) rotate(20 46.692 -15.692) translate(0 4)"
        ></path>
        <path
          fill="#fff"
          d="M15 11C4.52 11 2.42 2.82 3.12 2.14 3.82 1.46 8.02 3.5 15 3.5c6.99 0 11.18-2.04 11.88-1.36.7.68-1.4 8.86-11.88 8.86z"
          transform="rotate(12 31.471 76.757) translate(29 33) rotate(20 46.692 -15.692) translate(6 24)"
        ></path>
      </g>
    </svg>
            </div>
            <div className={s.items}>
                <div className={s.item}>
                    <Link href="/dashboard" className={s.itemlink}>
                    Dashboard
                    </Link>
                </div>
                <div className={s.spacer}>
                  
                </div>
                <div className={s.item}>
                    <Link href="/dashboard" className={s.itemlink}>
                    My Profile
                    </Link>
                </div>
                <div className={s.item}>
                    <Link href="/animals" className={s.itemlink}>
                    My Reptiles
                    </Link>
                </div>
                <div className={s.item}>
                    <Link href="/animals/pairings" className={s.itemlink}>
                    My Pairings
                    </Link>
                </div>
                <div className={s.spacer}>
                  
                </div>
                <div className={s.item}>
                    <Link href="/animals/upload" className={s.itemlink}>
                    New Reptile
                    </Link>
                </div>
            </div>
   
    </div>
  )
}
