import React from 'react';

import s from "./TreeSpine.module.css";
import TreeBranch from '../TreeBranch/TreeBranch';

export default function TreeSpine({ generations }) {

  return (
    <div className={s.container}>
      <span className={s.horizontalconnector}></span>
      <div className={s.content}>
        {generations.map((generation, index) => (
          <div className={index + 1 == generations.length ? s.finalbranchcontainer : s.branchcontainer} key={generation.id || index}>
            <div className={s.horizontalconnector}>
            </div>
  
           <TreeBranch generation={generation} />
       
            
          </div>
        ))}
      </div>
    </div>
  );
}

