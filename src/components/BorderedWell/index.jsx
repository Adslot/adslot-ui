import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const BorderedWell = ({ children }) => (
  <div data-testid="borderedwell-wrapper" className="borderedwell-component">
    {children}
  </div>
);

BorderedWell.propTypes = {
  children: PropTypes.node,
};

export default BorderedWell;
