import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { colors } from '../Button';
import { expandDts } from '../../utils';
import './styles.css';

const sizes = ['large', 'medium', 'small'];

const Pill = ({ children, color = colors[0], size = sizes[1], inverse = false, onClick, dts, className, ...rest }) => (
  <div
    {...rest}
    className={cx(
      'aui--pill',
      size !== sizes[1] && `aui-${size}`,
      color !== colors[0] && `aui-${color}`,
      inverse && 'aui-inverse',
      onClick && 'aui-clickable',
      className
    )}
    onClick={onClick}
    {...expandDts(dts)}
  >
    {children}
  </div>
);

Pill.propTypes = {
  /**
   * Content inside pill
   */
  children: PropTypes.node,
  /**
   * The main color for the pill
   */
  color: PropTypes.oneOf(colors),
  /**
   * one of ["large",  "medium", "small"]
   */
  size: PropTypes.oneOf(sizes),
  /**
   * Inverse the background and content color
   */
  inverse: PropTypes.bool,
  /**
   * Custom onClick event
   */
  onClick: PropTypes.func,
  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: PropTypes.string,
  /**
   * Custom classnames
   */
  className: PropTypes.string,
};

export default Pill;
