import s from "./AnimalCard.module.css"
import f from "../../../public/geckooo.jpg"
import Image from "next/image"
export default function AnimalCard(props) {
  return (
    <div onClick={props.onClick} className={s.container}>
        <div className={s.imagecontainer}>
            <Image src={f} alt="Picture of the animal" className="w-[100%] h-[100%] relative" />
        </div>
        <div className={s.infocontainer}>
            <div className={s.titlecontainer}>
              <span className={s.label}>
                <span className={s.name}>
                    Gecko
                </span>
                <span className={s.gender}>
                    R
                </span>
              </span>
            </div>
            <div className={s.pairingconatiner  }>
                1,2,3,4,5
            </div>
        </div>
    </div>
  )
}
