import React from 'react';
import PropTypes from 'prop-types';
import { expandDts } from '../../lib/utils';

var Grid = function Grid(_ref) {
  var children = _ref.children,
      dts = _ref.dts;
  return /*#__PURE__*/React.createElement("div", Object.assign({
    className: "grid-component"
  }, expandDts(dts)), children);
};

Grid.propTypes = {
  /**
   * the children to be rendered
   */
  children: PropTypes.node,

  /**
   * data-test-selector of the grid
   */
  dts: PropTypes.string
};
export default Grid;