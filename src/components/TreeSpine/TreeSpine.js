import React from 'react';
import PropTypes from 'prop-types';
import s from "./TreeSpine.module.css";
import TreeBranch from '../TreeBranch/TreeBranch';

export default function TreeSpine({ generations }) {
  return (
    <div className={s.container}>
      <span className={s.horizontalconnector}></span>
      <div className={s.content}>
        {generations.map((generation, index) => (
          <div className={s.branch} key={generation.id || index}>
            <TreeBranch generation={generation} />
          </div>
        ))}
      </div>
    </div>
  );
}

TreeSpine.propTypes = {
  generations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string, // assuming each generation has an id
      // Other properties of generation can be added here
    })
  ).isRequired,
};
