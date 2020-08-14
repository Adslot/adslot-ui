import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Spinner = ({ size, colourStyle }) => (
  <div data-testid="spinner-wrapper" className="spinner-component">
    <div data-testid="spinner" className={`spinner spinner-${size} spinner-colour-style-${colourStyle}`} />
  </div>
);

Spinner.propTypes = {
  /**
   * oneOf: 'large', medium', 'small'
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  colourStyle: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
  colourStyle: 'default',
};

export default Spinner;
