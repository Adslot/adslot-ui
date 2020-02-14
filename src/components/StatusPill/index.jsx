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
  /**
   * 	Text inside status pill
   */
  status: PropTypes.string.isRequired,
  /**
   * one of ["primary", "success", "warning", "error", "light"]
   */
  displayStyle: PropTypes.oneOf(styles),
  /**
   * Status pill with inverse style
   */
  inverse: PropTypes.bool,
  /**
   * 	Generate "data-test-selector" on the status pill
   */
  dts: PropTypes.string,
};

export default StatusPill;
