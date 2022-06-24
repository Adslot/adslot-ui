import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
import './styles.css';

const sizes = ['large', 'medium', 'small'];

const Pill = ({ className, children, onClick, size, dts }) => (
  <div
    className={classnames('aui--pill', `aui--pill-${size}`, { 'aui--pill-clickable': onClick }, className)}
    onClick={onClick}
    {...expandDts(dts)}
  >
    <div className="aui--pill-children">{children}</div>
  </div>
);

Pill.defaultProps = {
  size: sizes[1],
};

Pill.propTypes = {
  /**
   * 	Content inside pill
   */
  children: PropTypes.node.isRequired,
  /**
   *  	Custom classnames
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  /**
   *  	Custome onClick event
   */
  onClick: PropTypes.func,
  /**
   * one of ["large",  "medium", "small"]
   */
  size: PropTypes.oneOf(sizes),
  /**
   * 	Generate "data-test-selector" on the pill
   */
  dts: PropTypes.string,
};

export default Pill;
