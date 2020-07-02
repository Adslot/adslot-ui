import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
import './styles.scss';

const Pill = ({ className, children, onClick, dts }) => (
  <div
    className={classnames('aui--pill', { 'aui--pill-clickable': onClick }, className)}
    onClick={onClick}
    {...expandDts(dts)}
  >
    <div className="aui--pill-children">{children}</div>
  </div>
);

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
   * 	Generate "data-test-selector" on the pill
   */
  dts: PropTypes.string,
};

export default Pill;
