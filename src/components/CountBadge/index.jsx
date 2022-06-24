import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.css';

const CountBadge = ({ value, status, dts }) => {
  const fontSize = value > 99 ? 'small' : 'normal';
  const classNames = `count-badge status-${status} count-badge-font-size-${fontSize}`;
  return (
    <div data-testid="count-badge-wrapper" className={classNames} {...expandDts(dts)}>
      {value}
    </div>
  );
};

CountBadge.propTypes = {
  /**
   * determines the number that is rendered inside the counter badge
   */
  value: PropTypes.number.isRequired,
  /**
   * determines the appearance of the counter badge: oneOf(['info', 'warning', 'danger', 'light'])
   */
  status: PropTypes.string,
  /**
   * data-test-selector for the counter badge component
   */
  dts: PropTypes.string,
};

CountBadge.defaultProps = {
  status: 'default',
};

export default CountBadge;
