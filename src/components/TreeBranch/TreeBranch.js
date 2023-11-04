import React from 'react';

import s from "./TreeBranch.module.css";
import Image from 'next/image';
import TreeLeaf from '../TreeLeaf/TreeLeaf';

export default function TreeBranch({ generation }) {

console.log(generation)

  return (
    <div className={s.container}>
      <div className={s.verticalconnector}></div>
      
      <div className={s.content}>
        {generation.map((child, index) => (
          <div className="flex flex-col items-center w-full" key={child.id || index}>
          <div className={index + 1 != generation.length ? s.connectorcontainer : s.finalconnectorcontainer}>
          <div className={(index == 0 ||  index +1 == generation.length) && generation.length > 1? s.horizontalconnector : "hidden"}></div>
          <div className={index != 0 && index + 1 != generation.length ? s.middlehorizontalconnector : "hidden"}></div>
          <span className={generation.length ==1 ? "flex justify-center w-full" : "hidden"}>
            <span className="bg-gray-300 p-[1px]" >
            </span>
          </span>
          </div>
          <div className={s.verticalconnector}>

          </div>
          <div className={s.child}>
           
            <TreeLeaf animal={child} />
          </div>
          
        </div>
        ))}
      </div>
    </div>
  );
}

