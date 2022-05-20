import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import classnames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { expandDts, classSuffixHelper } from '../../../lib/utils';

var GridCell = function GridCell(_ref) {
  var children = _ref.children,
      classSuffixes = _ref.classSuffixes,
      onClick = _ref.onClick,
      stretch = _ref.stretch,
      dts = _ref.dts,
      addonClassNames = _ref.addonClassNames;
  var componentClass = 'grid-component-cell';
  var classesList = classSuffixHelper({
    classSuffixes: classSuffixes,
    suffixOptions: {
      stretch: stretch,
      clickable: onClick
    },
    componentClass: componentClass
  });
  var className = classnames.apply(void 0, ["".concat(componentClass).concat(classesList)].concat(_toConsumableArray(addonClassNames)));
  var extraProps = onClick ? {
    onClick: onClick
  } : {};
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: className
  }, extraProps, expandDts(dts)), children);
};

GridCell.propTypes = {
  /**
   * list of addOn classNames as array of strings
   */
  addonClassNames: PropTypes.arrayOf(PropTypes.string),

  /**
   * the children to be rendered
   */
  children: PropTypes.node,
  classSuffixes: PropTypes.arrayOf(PropTypes.string),

  /**
   * data-test-selector of the gridCell
   */
  dts: PropTypes.string,

  /**
   * function that will be called when gridCell is clicked
   */
  onClick: PropTypes.func,

  /**
   * determines if gridCell should be stretched
   */
  stretch: PropTypes.bool
};
GridCell.defaultProps = {
  addonClassNames: [],
  classSuffixes: [],
  stretch: false
};
export default GridCell;