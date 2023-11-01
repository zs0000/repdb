import React from 'react';
import styles from './Test.module.css';

export default function LineageTree({ data }) {
    console.log(data)
    const totalGenerations = data.length;
    return (
      <div className={styles.lineageTree}>
        <div className={styles.spine}></div>
        {data.map((generation, genIdx) => (
          <Generation 
            generation={generation.nodes} 
            key={genIdx} 
            position={`${(genIdx / (totalGenerations - 1)) * 100}%`} 
          />
        ))}
      </div>
    );
  }
  
  function Generation({ generation, position }) {

    const totalNodes = generation.length;
    return (
      <div className={styles.generation} style={{ top: position }}>
        {generation.map((node, nodeIdx) => (
          <div 
          key={nodeIdx}
            className={styles.branch} 
            style={{ left: `${(nodeIdx / (totalNodes - 1)) * 100}%` }}
          >
            <div className={styles.nodeConnector}></div>
            <Node node={node} />
          </div>
        ))}
      </div>
    );
  }
  
  // ... rest of the code remains the same
  
  
  function Branch({ branch, totalNodes, position }) {
    return (
      <div className={styles.branch} style={{ left: `${(position / (totalNodes - 1)) * 100}%` }}>
        <div className={styles.nodeConnector}></div>
        <Node node={branch.nodes[0]} />
        {branch.nodes[1] && <Node node={branch.nodes[1]} />}
      </div>
    );
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
