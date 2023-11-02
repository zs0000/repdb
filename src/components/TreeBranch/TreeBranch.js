import React from 'react';

import s from "./TreeBranch.module.css";

export default function TreeBranch({ generation }) {



  return (
    <div className={s.container}>
      <div className={s.verticalconnector}></div>
      
      <div className={s.content}>
        {generation.map((child, index) => (
          <div className="flex flex-col items-center w-full" key={child.id || index}>
            <div className={index + 1 != generation.length ? s.connectorcontainer : s.finalconnectorcontainer}>
            <div className={index == 0 || index +1 == generation.length? s.horizontalconnector : "hidden"}></div>
            <div className={index != 0 && index + 1 != generation.length ? s.middlehorizontalconnector : "hidden"}>
            
            </div>
            </div>
            <div className={s.verticalconnector}>

            </div>
            <div className={s.child}>
              {child.name}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

