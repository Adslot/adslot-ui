import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Spinner = ({ size, colourStyle }) => (
  <div className="spinner-component">
    <div className={`spinner spinner-${size} spinner-colour-style-${colourStyle}`} />
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
