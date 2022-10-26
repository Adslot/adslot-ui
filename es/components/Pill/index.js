import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { expandDts } from '../../lib/utils';
const sizes = ['large', 'medium', 'small'];

const Pill = _ref => {
  let {
    className,
    children,
    onClick,
    size,
    dts
  } = _ref;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: classnames('aui--pill', `aui--pill-${size}`, {
      'aui--pill-clickable': onClick
    }, className),
    onClick: onClick
  }, expandDts(dts)), /*#__PURE__*/React.createElement("div", {
    className: "aui--pill-children"
  }, children));
};

Pill.defaultProps = {
  size: sizes[1]
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
  dts: PropTypes.string
};
export default Pill;