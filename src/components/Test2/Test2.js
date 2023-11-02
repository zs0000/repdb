import React from 'react';
import styles from './Test2.module.css';

export default function LineageTree({ data }) {
  const totalGenerations = data.length;
  return (
    <div className={styles.lineageTree}>
      <div className={styles.spine}></div>
      {data.map((generation, genIdx) => (
        <>
          <div 
            className={styles.verticalConnector} 
            style={{ left: `${(genIdx / (totalGenerations - 1)) * 100}%` }} 
          />
          <Generation 
            generation={generation} 
            key={genIdx} 
            position={`${(genIdx / (totalGenerations - 1)) * 100}%`} 
          />
        </>
      ))}
    </div>
  );
}

function Generation({ generation, position }) {
console.log('generation', generation)
    return (
    <div className={styles.generation} style={{ left: position }}>
      {generation.nodes.map((branch, branchIdx) => (
        <Branch branch={branch} key={branchIdx} />
      ))}
    </div>
  );
}

function Branch({ branch }) {
    
  return (
    <div className={styles.branch}>
      <div className={styles.nodeConnector}></div>
      <Node node={branch} />
    </div>
      )
}

function Node({ node }) {
  return (
    <div className={styles.node}>
      <div
        className={`${styles.individual} ${styles[node.gender]}`}
        style={{ backgroundColor: node.color }}
      />
      {node.mate && (
        <>
          <div className={styles.mateConnector} />
          <div
            className={`${styles.individual} ${styles[node.mate.gender]}`}
            style={{ backgroundColor: node.mate.color }}
          />
        </>
      )}
    </div>
  );
}
