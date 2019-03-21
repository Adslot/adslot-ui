import React from 'react';
import PropTypes from 'prop-types';

const BorderedWell = ({ children }) => <div className="borderedwell-component">{children}</div>;

BorderedWell.displayName = 'AlexandriaBorderedWellComponent';

BorderedWell.propTypes = {
  children: PropTypes.node,
};

export default BorderedWell;
