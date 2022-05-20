import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './styles.css';

const Spinner = ({ className, size }) => (
  <div data-testid="spinner-wrapper" className={classnames(['spinner-component', className])}>
    <div data-testid="spinner" className={classnames(['spinner', `spinner-${size}`])} />
  </div>
);

Spinner.propTypes = {
  className: PropTypes.string,
  /**
   * Size of the spinner should be one of: 'large' (40x40px), 'medium' (30x30px), 'small' (16x16px)
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Spinner.defaultProps = {
  size: 'large',
};

export default Spinner;
