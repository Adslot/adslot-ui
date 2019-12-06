import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BorderedWell = ({ children }) => <div className="borderedwell-component">{children}</div>;

BorderedWell.displayName = 'BorderedWellComponent';

BorderedWell.propTypes = {
  children: PropTypes.node,
};

export default BorderedWell;
