import React, { PropTypes } from 'react';

require('styles/alexandria/BorderedWell.scss');

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
