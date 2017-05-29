import React, { PropTypes } from 'react';
import './styles.scss';

const BorderedWellComponent = ({ children }) => (
  <div className="borderedwell-component">
    {children}
  </div>
);

BorderedWellComponent.displayName = 'AlexandriaBorderedWellComponent';

BorderedWellComponent.propTypes = {
  children: PropTypes.node,
};

export default BorderedWellComponent;
