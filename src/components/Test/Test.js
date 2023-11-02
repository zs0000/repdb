import React from 'react';
import PropTypes from 'prop-types';
import styles from './Test.module.css';

export default function LineageTree({ data }) {
  return (
      <div className={styles.lineageTree}>
          <div className={styles.spine}></div>
          {data.map((generation, genIdx) => (
              <Generation
                  generation={generation}
                  key={genIdx}
                  position={`${(genIdx / (data.length - 1)) * 100}%`}
              />
          ))}
      </div>
  );
}

function Generation({ generation, position }) {
  return (
      <div className={styles.generation} style={{ top: position }}>
          {generation.branches?.map((branch, branchIdx) => (
              <Branch
                  branch={branch}
                  key={branchIdx}
                  position={`${(branchIdx / (generation.branches.length - 1)) * 100}%`}
              />
          ))}
          <div className={styles.verticalConnector}></div>
          <div className={styles.horizontalConnector}></div>  {/* New horizontal connector */}
      </div>
  );
}

Generation.propTypes = {
  generation: PropTypes.object.isRequired,
  position: PropTypes.string.isRequired,
};

function Branch({ branch, position }) {
  return (
      <div className={styles.branch} style={{ left: position }}>
          <div className={styles.nodeConnector}></div>
          {branch.nodes?.map((node, nodeIdx) => (
              <Node node={node} key={nodeIdx} />
          ))}
          <div className={styles.branchSpine}></div>
      </div>
  );
}

function Node({ node }) {
  return (
    <div className={styles.node}>
      <div
        className={`${styles.individual} ${styles[node.gender]}`}
        style={{ backgroundColor: node.color }}
        role="presentation"
      />
      {node.mate && (
        <>
          <div className={styles.mateConnector} />
          <div
            className={`${styles.individual} ${styles[node.mate.gender]}`}
            style={{ backgroundColor: node.mate.color }}
            role="presentation"
          />
        </>
      )}
    </div>
  );
}

Node.propTypes = {
  node: PropTypes.object.isRequired,
};

