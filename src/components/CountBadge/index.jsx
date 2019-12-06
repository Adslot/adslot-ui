import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const CountBadge = ({ value, status, dts }) => {
  const fontSize = value > 99 ? 'small' : 'normal';
  const classNames = `count-badge status-${status} count-badge-font-size-${fontSize}`;
  return (
    <div className={classNames} {...expandDts(dts)}>
      {value}
    </div>
  );
};

CountBadge.propTypes = {
  value: PropTypes.number.isRequired,
  status: PropTypes.string,
  dts: PropTypes.string,
};

CountBadge.defaultProps = {
  status: 'default',
};

export default CountBadge;
