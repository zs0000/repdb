import React from 'react';
import PropTypes from 'prop-types';
import s from "./TreeBranch.module.css";

export default function TreeBranch({ generation }) {
  return (
    <div className={s.container}>
      <div className={s.verticalconnector}></div>
      <div className={s.content}>
        {generation.map((child, index) => (
          <React.Fragment key={child.id || index}>
            <div className={s.child}>
              {child.name}
            </div>
            {index !== generation.length - 1 && (
              <div className={s.connector}>
                <div className={s.horizontalconnector}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

TreeBranch.propTypes = {
  generation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string, // assuming each child has an id
      name: PropTypes.string.isRequired,
      // Other properties of child can be added here
    })
  ).isRequired,
};
