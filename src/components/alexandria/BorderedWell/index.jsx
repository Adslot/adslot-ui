import React, { PropTypes } from 'react';
import './styles.scss';

const BorderedWell = ({ children }) => (
  <div className="borderedwell-component">
    {children}
  </div>
);

BorderedWell.displayName = 'AlexandriaBorderedWellComponent';

BorderedWell.propTypes = {
  children: PropTypes.node,
};

export default BorderedWell;
