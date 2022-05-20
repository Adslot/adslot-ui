import React from 'react';
import PropTypes from 'prop-types';
import { classSuffixHelper, expandDts } from '../../../lib/utils';

var GridRow = function GridRow(_ref) {
  var horizontalBorder = _ref.horizontalBorder,
      short = _ref.short,
      type = _ref.type,
      verticalCellBorder = _ref.verticalCellBorder,
      children = _ref.children,
      dts = _ref.dts;
  var componentClass = 'grid-component-row';
  var classesList = classSuffixHelper({
    classSuffixes: [type],
    suffixOptions: {
      horizontalBorder: horizontalBorder,
      short: short,
      verticalCellBorder: verticalCellBorder
    },
    componentClass: componentClass
  });
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: "".concat(componentClass).concat(classesList)
  }, expandDts(dts)), children);
};

GridRow.propTypes = {
  /**
   * the children to be rendered
   */
  children: PropTypes.node,

  /**
   * determines if horizontalBorder is to be rendered
   */
  horizontalBorder: PropTypes.bool,

  /**
   * determines if the row is short or long
   */
  short: PropTypes.bool,

  /**
   * determines the type of griRow: oneOf(['body', 'header', 'subfooter', 'footer'])
   */
  type: PropTypes.oneOf(['body', 'header', 'subfooter', 'footer']),

  /**
   * determines if verticalCellBorder should be displayed
   */
  verticalCellBorder: PropTypes.bool,

  /**
   * data-test-selector of the grid
   */
  dts: PropTypes.string
};
GridRow.defaultProps = {
  horizontalBorder: true,
  short: false,
  type: 'body',
  verticalCellBorder: false
};
export default GridRow;