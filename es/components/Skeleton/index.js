import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _ from 'lodash';
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var Skeleton = function Skeleton(_ref) {
  var animated = _ref.animated,
      className = _ref.className,
      dts = _ref.dts,
      height = _ref.height,
      variant = _ref.variant,
      width = _ref.width;
  var baseClass = 'aui--skeleton';

  var variantClass = function variantClass() {
    return _.includes(['rect', 'circle', 'text'], variant) ? "".concat(baseClass, "-").concat(variant) : '';
  };

  return /*#__PURE__*/React.createElement("span", Object.assign({
    className: classnames(baseClass, variantClass(), _defineProperty({}, "".concat(baseClass, "-animated"), animated), className),
    style: {
      height: height,
      width: width
    }
  }, expandDts(dts)));
};

Skeleton.propTypes = {
  animated: PropTypes.bool,

  /**
   *  Custom classnames
   */
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),

  /**
   * 	Generate "data-test-selector"
   */
  dts: PropTypes.string,
  height: PropTypes.string,

  /**
   *  oneOf: 'rect', 'circle', 'text'
   */
  variant: PropTypes.oneOf(['rect', 'circle', 'text']),
  width: PropTypes.string
};
Skeleton.defaultProps = {
  animated: true,
  variant: 'text'
};
export default Skeleton;