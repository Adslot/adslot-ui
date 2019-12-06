import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const styles = ['primary', 'success', 'warning', 'error', 'light'];

const StatusPill = ({ displayStyle, status, inverse, dts }) => (
  <div
    className={classnames([
      'aui--status-pill',
      `aui--status-pill-${displayStyle}`,
      { 'aui--status-pill-inverse': inverse },
    ])}
    {...expandDts(dts)}
  >
    {status}
  </div>
);

StatusPill.defaultProps = {
  displayStyle: styles[0],
  inverse: false,
};

StatusPill.propTypes = {
  status: PropTypes.string.isRequired,
  displayStyle: PropTypes.oneOf(styles),
  inverse: PropTypes.bool,
  dts: PropTypes.string,
};

export default StatusPill;
